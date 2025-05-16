import random
from .data.pokemon import POKEMON
from .utils.battle_utils import calculate_damage
from .utils.pokemon_utils import Pokemon
from pprint import pprint
from .pokemon_battle_logic import simulate_battle, print_battle_log

p1 = Pokemon(POKEMON["Bulbasaur"], 5)
p2 = Pokemon(POKEMON["Charmander"], 5)

# print(f"{p1.name}'s stats:")
# pprint(p1.stats)

# pprint(f"{p2.name}'s stats:")
# pprint(p2.stats)

# print("---------------------------------------------------------------\n")
# damage = calculate_damage(p1, p2, p1.moves[0])
# print(f"Damage from {p1.name}'s {p1.moves[0].name} to {p2.name}: {damage}")
# damage = calculate_damage(p2, p1, p2.moves[0])
# print(f"Damage from {p2.name}'s {p2.moves[0].name} to {p1.name}: {damage}")
# damage = calculate_damage(p1, p2, p1.moves[1])
# print(f"Damage from {p1.name}'s {p1.moves[1].name} to {p2.name}: {damage}")
# damage = calculate_damage(p2, p1, p2.moves[1])
# print(f"Damage from {p2.name}'s {p2.moves[1].name} to {p1.name}: {damage}")

rng_seed = random.seed()
logs = simulate_battle(p1, p2, rng_seed=rng_seed)
print_battle_log(logs)