import pcg_benchmark
from .problem import PokemonBattleProblem

pcg_benchmark.register('pokemonbattle-v0', PokemonBattleProblem, {"winner": 0, "min_level": 5})
pcg_benchmark.register('pokemonbattle-long-v0', PokemonBattleProblem, {"min_level": 5, "max_level": 10, "min_turns": 5})
pcg_benchmark.register('pokemonbattle-short-v0', PokemonBattleProblem, {"min_level": 5, "max_level": 10, "max_turns": 3})
pcg_benchmark.register('pokemonbattle-rival-win-v0', PokemonBattleProblem, {"winner": 1, "min_level": 5})
pcg_benchmark.register('pokemonbattle-to-the-wire-v0', PokemonBattleProblem, {"min_level": 5, "max_level": 50, "surviving_hp_percentage": 0.1})
pcg_benchmark.register('pokemonbattle-sweep-v0', PokemonBattleProblem, {"min_level": 5, "max_level": 50, "surviving_hp_percentage": 0.8})