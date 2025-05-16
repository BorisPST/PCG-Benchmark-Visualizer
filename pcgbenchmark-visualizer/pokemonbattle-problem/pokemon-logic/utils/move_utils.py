from collections import namedtuple
from enum import Enum

class MoveCategory(Enum):
    PHYSICAL = 0
    SPECIAL = 1
    STATUS = 2

PokemonMove = namedtuple('PokemonMove', ['name', 'power', 'accuracy', 'category', 'type'])