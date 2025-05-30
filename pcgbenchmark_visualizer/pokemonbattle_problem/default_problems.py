
DEFAULT_VARIANT = {"winner": 0, "min_level": 5}
LONG_BATTLE_VARIANT = {"min_level": 5, "max_level": 50, "min_turns": 7}
SHORT_BATTLE_VARIANT = {"min_level": 5, "max_level": 50, "max_turns": 3}
RIVAL_WIN_VARIANT = {"winner": 1, "min_level": 5}
TO_THE_WIRE_VARIANT = {"min_level": 5, "max_level": 50, "surviving_hp_percentage": 0.1}
SWEEP_VARIANT = {"min_level": 5, "max_level": 50, "surviving_hp_percentage": 0.8}

ALL_VARIANTS = [
    ("pokemonbattle-v0", DEFAULT_VARIANT),
    ("pokemonbattle-long-v0", LONG_BATTLE_VARIANT),
    ("pokemonbattle-short-v0", SHORT_BATTLE_VARIANT),
    ("pokemonbattle-rivalwin-v0", RIVAL_WIN_VARIANT),
    ("pokemonbattle-tothewire-v0", TO_THE_WIRE_VARIANT),
    ("pokemonbattle-sweep-v0", SWEEP_VARIANT)
]