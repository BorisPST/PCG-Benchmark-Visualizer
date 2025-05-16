import random
from .utils.battle_utils import get_attacker_and_defender, calculate_damage, get_move_effectiveness_multiplier

def execute_move(attacker, defender, rng):
    rng_factor = rng.uniform(0.85, 1.0)
    move = attacker.get_strongest_move(defender, rng_factor)
    damage = min(calculate_damage(attacker, defender, move, rng_factor), defender.current_hp)
    defender.take_damage(damage)

    return move, damage

def get_effectiveness_text(move, defender):
    multiplier = get_move_effectiveness_multiplier(move, defender)
    if multiplier == 0:
        return f"{defender.name} is immune!"
    elif multiplier == 0.5:
        return "It's not very effective..."
    elif multiplier == 2.0:
        return "It's super effective!"
    else:
        return ""

def simulate_battle(p1, p2, rng_seed):
    rng = random.Random(rng_seed)
    turn = 0
    log = []

    while not p1.is_fainted() and not p2.is_fainted():
        # Get faster Pokemon to attack first (or random if speed tie)
        attacker, defender = get_attacker_and_defender(p1, p2, rng)
        move, damage = execute_move(attacker, defender, rng)
        effectiveness = get_effectiveness_text(move, defender)
        log.append((turn, attacker, defender, move.name, damage, defender.current_hp, effectiveness))
        
        # Check if initial move fainted the Pokemon
        if defender.is_fainted():
            break
        
        # If not, switch roles, slower Pokemon attacks
        attacker, defender = defender, attacker
        move, damage = execute_move(attacker, defender, rng)
        effectiveness = get_effectiveness_text(move, defender)
        log.append((turn, attacker, defender, move.name, damage, defender.current_hp, effectiveness))

        # If both Pokemon are still alive, increment the turn
        if not defender.is_fainted():
            turn += 1
    
    return log

def print_battle_log(log):
    last_defender = None

    for entry in log:
        turn, attacker, defender, move_name, damage, hp, effectiveness = entry
        last_defender = defender.name
        print(f"Turn {turn + 1}: {attacker.name} used {move_name}. " + effectiveness)
        print(f"({defender.name} HP: {hp + damage} ----> {hp})")
    
    print(f"{last_defender} fainted!")