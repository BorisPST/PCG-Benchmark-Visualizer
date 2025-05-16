import pcg_benchmark
from .problem import PokemonBattleProblem

pcg_benchmark.register('pokemonbattle-v0', PokemonBattleProblem, {"winner": 0, "min_level": 5})