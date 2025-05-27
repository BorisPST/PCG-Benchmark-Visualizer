from ..utils.pokemon_utils import PokemonBlueprint
from ..utils.type_utils import PokemonType
from .moves import MOVES
from ..utils.stats_utils import PokemonStats

# Here we define the Pokemon (blueprints) available in the simulation.

Bulbasaur = PokemonBlueprint(
    name="Bulbasaur",
    type1=PokemonType.GRASS,
    type2=PokemonType.POISON,
    base_stats=PokemonStats(
        hp=45,
        attack=49,
        defense=49,
        special_attack=65,
        special_defense=65,
        speed=45
    ),
    move_pool={
        1: MOVES["Tackle"],
        3: MOVES["Vine Whip"],
        10: MOVES["Razor Leaf"],
        17: MOVES["Seed Bomb"],
    }
)

Charmander = PokemonBlueprint(
    name="Charmander",
    type1=PokemonType.FIRE,
    type2=None,
    base_stats=PokemonStats(
        hp=39,
        attack=52,
        defense=43,
        special_attack=60,
        special_defense=50,
        speed=65
    ),
    move_pool={
        1: MOVES["Scratch"],
        3: MOVES["Ember"],
        10: MOVES["Fire Fang"],
        17: MOVES["Slash"],
    }
)

Squirtle = PokemonBlueprint(
    name="Squirtle",
    type1=PokemonType.WATER,
    type2=None,
    base_stats=PokemonStats(
        hp=44,
        attack=48,
        defense=65,
        special_attack=50,
        special_defense=64,
        speed=43
    ),
    move_pool={
        1: MOVES["Tackle"],
        3: MOVES["Water Gun"],
        12: MOVES["Bite"],
        15: MOVES["Water Pulse"],
    }
)

Pikachu = PokemonBlueprint(
    name="Pikachu",
    type1=PokemonType.ELECTRIC,
    type2=None,
    base_stats=PokemonStats(
        hp=35,
        attack=55,
        defense=40,
        special_attack=50,
        special_defense=50,
        speed=90
    ),
    move_pool={
        1: MOVES["Thunder Shock"],
        3: MOVES["Tackle"],
        15: MOVES["Slam"],
        20: MOVES["Spark"],
    }
)

# For convenience, we make a dictionary of all Pokemon (blueprints), for easy access based on name
POKEMON = {
    "Bulbasaur": Bulbasaur,
    "Charmander": Charmander,
    "Squirtle": Squirtle,
    "Pikachu": Pikachu,
}

POKEMON_COUNT = len(POKEMON)