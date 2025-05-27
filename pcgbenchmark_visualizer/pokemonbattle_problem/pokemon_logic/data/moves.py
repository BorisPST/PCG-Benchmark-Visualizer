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

FireFang = PokemonMove(
    name="Fire Fang",
    power=65,
    accuracy=95,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.FIRE
)

Slash = PokemonMove(
    name="Slash",
    power=70,
    accuracy=100,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.NORMAL
)

RazorLeaf = PokemonMove(
    name="Razor Leaf",
    power=55,
    accuracy=95,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.GRASS
)

SeedBomb = PokemonMove(
    name="Seed Bomb",
    power=80,
    accuracy=100,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.GRASS
)

Bite = PokemonMove(
    name="Bite",
    power=60,
    accuracy=100,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.DARK
)

WaterPulse = PokemonMove(
    name="Water Pulse",
    power=60,
    accuracy=100,
    category=MoveCategory.SPECIAL,
    type=PokemonType.WATER
)

ThunderShock = PokemonMove(
    name="Thunder Shock",
    power=40,
    accuracy=100,
    category=MoveCategory.SPECIAL,
    type=PokemonType.ELECTRIC
)

Spark = PokemonMove(
    name="Spark",
    power=65,
    accuracy=100,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.ELECTRIC
)

Slam = PokemonMove(
    name="Slam",
    power=80,
    accuracy=75,
    category=MoveCategory.PHYSICAL,
    type=PokemonType.NORMAL
)

# For convenience, we make a dictionary of all moves, for easy access baed on name
MOVES = {
    "Tackle": Tackle,
    "Scratch": Scratch,
    "Vine Whip": VineWhip,
    "Ember": Ember,
    "Water Gun": WaterGun,
    "Fire Fang": FireFang,
    "Slash": Slash,
    "Razor Leaf": RazorLeaf,
    "Seed Bomb": SeedBomb,
    "Bite": Bite,
    "Water Pulse": WaterPulse,
    "Thunder Shock": ThunderShock,
    "Spark": Spark,
    "Slam": Slam
}