import pcg_benchmark
from .problem import PokemonBattleProblem
from .default_problems import DEFAULT_VARIANT, LONG_BATTLE_VARIANT, SHORT_BATTLE_VARIANT, RIVAL_WIN_VARIANT, TO_THE_WIRE_VARIANT, SWEEP_VARIANT

pcg_benchmark.register('pokemonbattle-v0', PokemonBattleProblem, DEFAULT_VARIANT)
pcg_benchmark.register('pokemonbattle-long-v0', PokemonBattleProblem, LONG_BATTLE_VARIANT)
pcg_benchmark.register('pokemonbattle-short-v0', PokemonBattleProblem, SHORT_BATTLE_VARIANT)
pcg_benchmark.register('pokemonbattle-rivalwin-v0', PokemonBattleProblem, RIVAL_WIN_VARIANT)
pcg_benchmark.register('pokemonbattle-tothewire-v0', PokemonBattleProblem, TO_THE_WIRE_VARIANT)
pcg_benchmark.register('pokemonbattle-sweep-v0', PokemonBattleProblem, SWEEP_VARIANT)