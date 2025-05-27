from enum import Enum

# Simplified Types and TypeChart to only match the ones we use
class  PokemonType(Enum):
    NORMAL = 0
    GRASS = 1
    FIRE = 2
    WATER = 3
    ELECTRIC = 4
    POISON = 5
    DARK = 6

TYPES_COUNT = len(PokemonType)

# Format is (attacker, defender): damage multiplier
# E.g. (PokemonType.FIRE, PokemonType.GRASS): 2.0 indicates Fire is super effective against Grass (double damage)
TYPE_CHART = {
    (PokemonType.NORMAL, PokemonType.NORMAL): 1.0,
    (PokemonType.NORMAL, PokemonType.GRASS): 1.0,
    (PokemonType.NORMAL, PokemonType.FIRE): 1.0,
    (PokemonType.NORMAL, PokemonType.WATER): 1.0,
    (PokemonType.NORMAL, PokemonType.POISON): 1.0,
    (PokemonType.NORMAL, PokemonType.DARK): 1.0,
    (PokemonType.NORMAL, PokemonType.ELECTRIC): 1.0,

    (PokemonType.GRASS, PokemonType.NORMAL): 1.0,
    (PokemonType.GRASS, PokemonType.GRASS): 0.5,
    (PokemonType.GRASS, PokemonType.FIRE): 0.5,
    (PokemonType.GRASS, PokemonType.WATER): 2.0,
    (PokemonType.GRASS, PokemonType.POISON): 0.5,
    (PokemonType.GRASS, PokemonType.DARK): 1.0,
    (PokemonType.GRASS, PokemonType.ELECTRIC): 1.0,

    (PokemonType.FIRE, PokemonType.NORMAL): 1.0,
    (PokemonType.FIRE, PokemonType.GRASS): 2.0,
    (PokemonType.FIRE, PokemonType.FIRE): 0.5,
    (PokemonType.FIRE, PokemonType.WATER): 0.5,
    (PokemonType.FIRE, PokemonType.POISON): 1.0,
    (PokemonType.FIRE, PokemonType.DARK): 1.0,
    (PokemonType.FIRE, PokemonType.ELECTRIC): 1.0,

    (PokemonType.WATER, PokemonType.NORMAL): 1.0,
    (PokemonType.WATER, PokemonType.GRASS): 0.5,
    (PokemonType.WATER, PokemonType.FIRE): 2.0,
    (PokemonType.WATER, PokemonType.WATER): 0.5,
    (PokemonType.WATER, PokemonType.POISON): 1.0,
    (PokemonType.WATER, PokemonType.DARK): 1.0,
    (PokemonType.WATER, PokemonType.ELECTRIC): 1.0,

    (PokemonType.POISON, PokemonType.NORMAL): 1.0,
    (PokemonType.POISON, PokemonType.GRASS): 2.0,
    (PokemonType.POISON, PokemonType.FIRE): 1.0,
    (PokemonType.POISON, PokemonType.WATER): 1.0,
    (PokemonType.POISON, PokemonType.POISON): 0.5,
    (PokemonType.POISON, PokemonType.DARK): 1.0,
    (PokemonType.POISON, PokemonType.ELECTRIC): 1.0,

    (PokemonType.DARK, PokemonType.NORMAL): 1.0,
    (PokemonType.DARK, PokemonType.GRASS): 1.0,
    (PokemonType.DARK, PokemonType.FIRE): 1.0,
    (PokemonType.DARK, PokemonType.WATER): 1.0,
    (PokemonType.DARK, PokemonType.POISON): 1.0,
    (PokemonType.DARK, PokemonType.DARK): 0.5,
    (PokemonType.DARK, PokemonType.ELECTRIC): 1.0,

    (PokemonType.ELECTRIC, PokemonType.NORMAL): 1.0,
    (PokemonType.ELECTRIC, PokemonType.GRASS): 0.5,
    (PokemonType.ELECTRIC, PokemonType.FIRE): 1.0,
    (PokemonType.ELECTRIC, PokemonType.WATER): 2.0,
    (PokemonType.ELECTRIC, PokemonType.POISON): 1.0,
    (PokemonType.ELECTRIC, PokemonType.DARK): 1.0,
    (PokemonType.ELECTRIC, PokemonType.ELECTRIC): 0.5,
}