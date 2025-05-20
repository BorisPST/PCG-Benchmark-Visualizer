from pydantic import BaseModel
from typing import List
from .generator import ENV
import pprint

class Content(BaseModel):
    player_pokemon: int
    rival_pokemon: int
    player_level: int
    rival_level: int
    rng_seed: int

class Control(BaseModel):
    min_turns: int
    max_turns: int
    winner: int
    rival_pokemon_type: int
    min_player_move_effectiveness: int
    min_rival_move_effectiveness: int

class Pair(BaseModel):
    content: Content
    control: Control

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
        "player_pokemon": info["player_pokemon"].to_dict(),
        "rival_pokemon": info["rival_pokemon"].to_dict(),
        "rival_pokemon_types": [t.name if t is not None else None for t in info["rival_pokemon_types"]],
        "surviving_pokemon_hp": info["surviving_pokemon_hp"],
        "first_move": info["first_move"],
        "player_move_effectiveness": info["player_move_effectiveness"].item(),
        "rival_move_effectiveness": info["rival_move_effectiveness"].item()
    }

def get_info(contents: List[Content]):
    infos = []
    for content in contents:
        info = ENV.info(content)
        info = convert_info_to_dict(info)   
        infos.append(info)
    return infos        