from ..utils.move_utils import PokemonMove, MoveCategory
from ..utils.type_utils import PokemonType

# Here we define the moves available in the simulation.

Tackle = PokemonMove(
    name="Tackle",
    power=40,
    accuracy=100,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.NORMAL
)

Scratch = PokemonMove(
    name="Scratch",
    power=40,
    accuracy=100,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.NORMAL
)

VineWhip = PokemonMove(
    name="Vine Whip",
    power=45,
    accuracy=100,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.GRASS
)

Ember = PokemonMove(
    name="Ember",
    power=40,
    accuracy=100,
    category=MoveCategory.SPECIAL,
    type=PokemonType.FIRE
)

WaterGun = PokemonMove(
    name="Water Gun",
    power=40,
    accuracy=100,
    category=MoveCategory.SPECIAL,
    type=PokemonType.WATER
)

# For convenience, we make a dictionary of all moves, for easy access baed on name
MOVES = {
    "Tackle": Tackle,
    "Scratch": Scratch,
    "Vine Whip": VineWhip,
    "Ember": Ember,
    "Water Gun": WaterGun
}