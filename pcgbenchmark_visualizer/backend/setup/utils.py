from pydantic import BaseModel
from typing import List, Optional
import pprint

class Content(BaseModel):
    player_pokemon: int
    player_level: int
    rival_pokemon: int
    rival_level: int
    rival_battle_strategy: int
    rng_seed: int
class Control(BaseModel):
    turns: int
    rival_pokemon_type: int
    first_move_trainer: int

class Pair(BaseModel):
    content: Content
    control: Control


class GeneratorConfig(BaseModel):
    generations: Optional[int] = 100
    population_size: Optional[int] = 50
    generator: Optional[int] = 0
    fitness: Optional[str] = "fitness_quality"

class ProblemConfig(BaseModel):
    variant: str
    min_level: Optional[int] = None
    max_level: Optional[int] = None
    min_turns: Optional[int] = None
    max_turns: Optional[int] = None
    winner: Optional[int] = None
    surviving_hp_percentage: Optional[float] = None
    diversity: Optional[float] = None

class SimulateBattleParams(BaseModel):
    variant: str
    content: Content
    control: Control 

class RequestParams(BaseModel):
    generator_config: GeneratorConfig
    problem_config: ProblemConfig

def get_generator_name(generator: int) -> str:
    """
    Get the name of the generator based on its index.
    """
    match generator:
        case 0:
            return "random"
        case 1:
            return "es"
        case 2:
            return "ga"
        case _:
            return "random"

def serialize_pokemon(pokemon):
    """
    Serialize the pokemon object.
    """
    serialized = {
        "name": pokemon.name,
        "level": int(pokemon.level),
        "current_hp": int(pokemon.current_hp),
        "max_hp": int(pokemon.stats.hp),
        "types": [int(t.value) for t in pokemon.types if t is not None],
        "moves": [move.name for move in pokemon.moves]
    }
    return serialized

def serialize_log(log):
    """
    Serialize the log to a more readable format.
    """
    return [
        {
            "turn": entry[0],
            "attacker_trainer": entry[1],
            "attacker_name": entry[2],
            "defender_trainer": entry[3],
            "defender_name": entry[4],
            "move_name": entry[5],
            "damage": entry[6],
            "hp": entry[7],
            "effectiveness": entry[8]
        }
        for entry in log
    ]

def convert_info_to_dict(info):
    """
    Convert the info dictionary to a more readable format.
    """
    return {
        "log": serialize_log(info["log"]),
        "winner": info["winner"],
        "turns": info["turns"],
        "player_pokemon": serialize_pokemon(info["player_pokemon"]),
        "rival_pokemon": serialize_pokemon(info["rival_pokemon"]),
        "rival_pokemon_types": [int (x) for x in info["rival_pokemon_types"]],
        "surviving_pokemon_hp": info["surviving_pokemon_hp"],
        "first_move": info["first_move"],
        "player_move_effectiveness": info["player_move_effectiveness"],
        "rival_move_effectiveness": info["rival_move_effectiveness"]
    }

def get_info(contents: List[Content]):
    infos = []
    for content in contents:
        info = ENV.info(content)
        info = convert_info_to_dict(info)   
        infos.append(info)
    return infos        