import pcg_benchmark
from .problem import PokemonBattleProblem

pcg_benchmark.register('pokemonbattle-v0', PokemonBattleProblem, {"winner": 0, "min_level": 5})
pcg_benchmark.register('pokemonbattle-v1', PokemonBattleProblem, {"winner": 0, "min_level": 5, "max_level": 20, "rival_pokemon_type": 1})