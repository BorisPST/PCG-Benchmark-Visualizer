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
    }
)

# For convenience, we make a dictionary of all Pokemon (blueprints), for easy access based on name
POKEMON = {
    "Bulbasaur": Bulbasaur,
    "Charmander": Charmander,
    "Squirtle": Squirtle
}

POKEMON_COUNT = len(POKEMON)