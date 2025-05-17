from pcg_benchmark.probs import Problem
from pcg_benchmark.spaces import IntegerSpace, DictionarySpace
from pcg_benchmark.probs.utils import get_range_reward

from .pokemon_logic.data.pokemon import POKEMON_COUNT, POKEMON
from .pokemon_logic.utils.type_utils import TYPES_COUNT
from .pokemon_logic.pokemon_battle_logic import simulate_battle, get_print_battle_log
from .pokemon_logic.utils.pokemon_utils import Pokemon

import pcg_benchmark
import numpy as np
import os

def get_pokemon_object(pokemon_index, level):
    """
    Given an index (for the POKEMON dictionary) and level, create and retunr the corresponding Pokemon object.
    
    @param pokemon_index: Index of the Pokemon in the POKEMON dictionary.
    @param level: Level of the Pokemon.

    return: Initialized Pokemon object.
    """
    if pokemon_index < 0 or pokemon_index >= POKEMON_COUNT:
        raise ValueError("Invalid Pokemon index")

    pokemon_blueprint = list(POKEMON.values())[pokemon_index]
    pokemon = Pokemon(pokemon_blueprint, level)
    return pokemon

class PokemonBattleProblem(Problem):
    def __init__(self, **kwargs):
        Problem.__init__(self, **kwargs)

        self._pokemon_count = POKEMON_COUNT
        self._types_count = TYPES_COUNT
        self._min_level = kwargs.get("min_level", 5)
        self._max_level = kwargs.get("max_level", 5)
        self._max_turns = kwargs.get("max_turns", 10)
        self._min_turns = kwargs.get("min_turns", 1)
        self._min_player_move_effectiveness = kwargs.get("min_player_move_effectiveness", 0)
        self._min_rival_move_effectiveness = kwargs.get("min_rival_move_effectiveness", 0)
        self.winner = kwargs.get("winner", 0)
        self._diversity = kwargs.get("diversity", 0.4)
        self._rival_pokemon_type = kwargs.get("rival_pokemon_type", -1)

        self._content_space = DictionarySpace({
            "player_pokemon": IntegerSpace(self._pokemon_count),
            "rival_pokemon": IntegerSpace(self._pokemon_count),
            "player_level": self._max_level if self._min_level == self._max_level else IntegerSpace(self._min_level, self._max_level),
            "rival_level": self._max_level if self._min_level == self._max_level else IntegerSpace(self._min_level, self._max_level),
            "rng_seed": IntegerSpace(2**32 - 1)
        })

        self._control_space = DictionarySpace({
            "min_turns": IntegerSpace(self._min_turns),
            "max_turns": IntegerSpace(self._max_turns),
            "winner": IntegerSpace(1),
            "rival_pokemon_type": IntegerSpace(self._types_count) if self._rival_pokemon_type >= 0 else -1,
            "min_player_move_effectiveness": 0 if self._min_player_move_effectiveness == 0 else IntegerSpace(self._min_player_move_effectiveness),
            "min_rival_move_effectiveness": 0 if self._min_rival_move_effectiveness == 0 else IntegerSpace(self._min_rival_move_effectiveness),
        })

    def info(self, content):
        player_pokemon = get_pokemon_object(content["player_pokemon"], content["player_level"])
        rival_pokemon = get_pokemon_object(content["rival_pokemon"], content["rival_level"])
        rng_seed = content["rng_seed"]

        log = simulate_battle(player_pokemon, rival_pokemon, rng_seed)
        winner = 0 if rival_pokemon.is_fainted() else 1
        turns = log[-1][0]
        rival_pokemon_types = rival_pokemon.types
        surviving_pokemon_hp = log[-2][1].current_hp if len(log) > 1 else log[0][1].current_hp
        first_move_pokemon = log[0][1]
    
        player_move_effectiveness = np.mean([item[6] for item in log if item[1] == player_pokemon])
        rival_move_effectiveness = np.mean([item[6] for item in log if item[1] == rival_pokemon])
        return {
            "log": log,
            "winner": winner,
            "turns": turns,
            "player_pokemon": player_pokemon,
            "rival_pokemon": rival_pokemon,
            "rival_pokemon_types": rival_pokemon_types,
            "surviving_pokemon_hp": surviving_pokemon_hp,
            "first_move_pokemon": first_move_pokemon,
            "player_move_effectiveness": player_move_effectiveness,
            "rival_move_effectiveness": rival_move_effectiveness
        }
    
    def quality(self, info):
        turn_reward = get_range_reward(info["turns"], 0, self._min_turns, self._max_turns)
        player_effectiveness_reward = get_range_reward(info["player_move_effectiveness"], 1.0, 2.0)
        player_win_reward = 1 if info["winner"] == self.winner else 0
        # print(f"Turn reward: {turn_reward}, Player effectiveness reward: {player_effectiveness_reward}, Player win reward: {player_win_reward}")
        return (turn_reward + player_effectiveness_reward + player_win_reward) / 3.0
    
    def diversity(self, info1, info2):
        player_diversity = 1 if info1["player_pokemon"].name != info2["player_pokemon"].name else 0
        rival_diversity = 1 if info1["rival_pokemon"].name != info2["rival_pokemon"].name else 0
        
        level_diversity = 1
        if self._min_level != self._max_level:
            player_level_diversity = 1 if info1["player_level"] != info2["player_level"] else 0
            rival_level_diversity = 1 if info1["rival_level"] != info2["rival_level"] else 0
            level_diversity = (player_level_diversity + rival_level_diversity) / 2.0

        ratio = (player_diversity + rival_diversity + level_diversity) / 3.0
        return get_range_reward(ratio, 0, self._diversity, 1.0)
    
    def controlability(self, info, control):
        turn_reward = get_range_reward(info["turns"], 0, control["min_turns"], control["max_turns"])
        rival_type_reward = 1 if self._rival_pokemon_type == -1 or control["rival_pokemon_type"] in info["rival_pokemon_types"] else 0
        winner_reward = 1 if info["winner"] == control["winner"] else 0
        player_effectiveness_reward = get_range_reward(info["player_move_effectiveness"], 0, control["min_player_move_effectiveness"] * 0.5, 2.0)
        rival_effectiveness_reward = get_range_reward(info["rival_move_effectiveness"], 0, control["min_rival_move_effectiveness"] * 0.5, 2.0)
        print(f"Turns: {info["turns"]}, min_turns: {control["min_turns"]}, max_turns: {control["max_turns"]}, winner: {info["winner"]}, rival_pokemon_type: {control["rival_pokemon_type"]}, player_move_effectiveness: {info["player_move_effectiveness"]}, rival_move_effectiveness: {info["rival_move_effectiveness"]}")       
        print(f"Turn reward: {turn_reward}, Rival type reward: {rival_type_reward}, Winner reward: {winner_reward}, Player effectiveness reward: {player_effectiveness_reward}, Rival effectiveness reward: {rival_effectiveness_reward}")
        return (turn_reward + rival_type_reward + winner_reward + player_effectiveness_reward + rival_effectiveness_reward) / 5.0
    
    def render(self, content):
        player_pokemon = get_pokemon_object(content["player_pokemon"], content["player_level"])
        rival_pokemon = get_pokemon_object(content["rival_pokemon"], content["rival_level"])
        rng_seed = content["rng_seed"]

        log = simulate_battle(player_pokemon, rival_pokemon, rng_seed)
        return get_print_battle_log(log)
    