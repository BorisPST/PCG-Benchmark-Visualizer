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
        self._max_level = kwargs.get("max_level", self._min_level)
        self._min_turns = kwargs.get("min_turns", 1)
        self._max_turns = kwargs.get("max_turns", self._min_turns + 10)
        self._diversity = kwargs.get("diversity", 0.4)

        self._content_space = DictionarySpace({
            "player_pokemon": IntegerSpace(self._pokemon_count),
            "rival_pokemon": IntegerSpace(self._pokemon_count),
            "player_level": self._max_level if self._min_level == self._max_level else IntegerSpace(self._min_level, self._max_level + 1),
            "rival_level": self._max_level if self._min_level == self._max_level else IntegerSpace(self._min_level, self._max_level + 1),
            "rival_battle_strategy": IntegerSpace(2), # 0 for random ai, 1 for greedy ai
            "rng_seed": IntegerSpace(2**32 - 1)
        })

        self._control_space = DictionarySpace({
            "turns": IntegerSpace(self._min_turns, self._max_turns + 1),
            "rival_pokemon_type": IntegerSpace(1, 6), # we do 1-5 since those are the only types for which we currently have a Pokemon of that type
        })

    def info(self, content):
        player_pokemon, rival_pokemon, log = self.get_battle_data(content)

        winner = 0 if rival_pokemon.is_fainted() else 1
        turns = int(log[-1][0])

        rival_pokemon_types = [int(t.value) for t in rival_pokemon.types if t is not None]

        surviving_pokemon_hp = int(max(player_pokemon.current_hp, rival_pokemon.current_hp))
        first_move = log[0][1]

        player_level = int(content["player_level"])
        rival_level = int(content["rival_level"])

        rival_battle_strategy = int(content["rival_battle_strategy"])

        return {
            "log": log,
            "winner": winner,
            "turns": turns,
            "player_pokemon": player_pokemon.to_dict(),
            "rival_pokemon": rival_pokemon.to_dict(),
            "rival_pokemon_types": rival_pokemon_types,
            "surviving_pokemon_hp": surviving_pokemon_hp,
            "first_move": first_move,
            "player_level": player_level,
            "rival_level": rival_level,
            "rival_battle_strategy": rival_battle_strategy
        }
    
    def quality(self, info):
        winner_reward = 1 if info["winner"] == 0 else 0

        player_level_reward = get_range_reward(info["player_level"], 0, self._min_level, self._max_level)
        rival_level_reward = get_range_reward(info["rival_level"], 0, self._min_level, self._max_level)
        level_reward = (player_level_reward + rival_level_reward) / 2.0

        level_balance_reward = get_range_reward(info["rival_level"], self._min_level, info["player_level"] - 2, info["player_level"] + 2)
        # print(f"Level reward ${level_reward}, Balance ${level_balance_reward}, Winner {winner_reward}, player ${info["player_level"]}, enemy: ${info["rival_level"]}")
        return (winner_reward + level_reward + level_balance_reward) / 3.0
    
    def diversity(self, info1, info2):
        pokemon = [info1["player_pokemon"]["name"], info2["player_pokemon"]["name"], info1["rival_pokemon"]["name"], info2["rival_pokemon"]["name"]]
        unique_pokemon = len(set(pokemon))
        pokemon_diversity = get_range_reward(unique_pokemon, 0, 2)
        
        level_diversity = 1
        if self._min_level != self._max_level:
            player_level_diversity = 1 if info1["player_level"] != info2["player_level"] else 0
            rival_level_diversity = 1 if info1["rival_level"] != info2["rival_level"] else 0
            level_diversity = (player_level_diversity + rival_level_diversity) / 2.0

        ratio = (pokemon_diversity + level_diversity) / 2.0
        return get_range_reward(ratio, 0, self._diversity, 1.0)
    
    def controlability(self, info, control):
        turn_reward = get_range_reward(info["turns"], 0, control["turns"] - 2, control["turns"] + 2)
        rival_type_reward = 1 if control["rival_pokemon_type"] in info["rival_pokemon_types"] else 0
        # print(f"Turns: {info['turns']}, min_turns: {control['min_turns']}, max_turns: {control['max_turns']}, Turn Reward: {turn_reward}")
        # print(f"Turns: {info["turns"]}, min_turns: {control["min_turns"]}, max_turns: {control["max_turns"]}, winner: {info["winner"]}, rival_pokemon_type: {control["rival_pokemon_type"]}, player_move_effectiveness: {info["player_move_effectiveness"]}, rival_move_effectiveness: {info["rival_move_effectiveness"]}")       
        return (turn_reward + rival_type_reward) / 2.0
    
    def render(self, content):
        _, _, log = self.get_battle_data(content)
        return get_print_battle_log(log)
    
    def get_battle_data(self, content):
        player_pokemon = get_pokemon_object(content["player_pokemon"], content["player_level"])
        rival_pokemon = get_pokemon_object(content["rival_pokemon"], content["rival_level"])
        battle_strategy = int(content["rival_battle_strategy"])
        rng_seed = content["rng_seed"]

        log = simulate_battle(player_pokemon, rival_pokemon, battle_strategy, rng_seed)
        return player_pokemon, rival_pokemon, log