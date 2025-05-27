import random
from .utils.battle_utils import get_attacker_and_defender, calculate_damage, get_move_effectiveness_multiplier

def execute_move(attacker, defender, strategy, rng):
    rng_factor = rng.uniform(0.85, 1.0)

    # Greedy strategy: Do most damage possible
    if strategy == 0:
        move = attacker.get_strongest_move(defender, rng_factor)
    
    # Random strategy: Pick random move
    else:
        
        move = attacker.moves[rng.randint(0, len(attacker.moves) - 1)]

    damage = min(calculate_damage(attacker, defender, move, rng_factor), defender.current_hp)
    defender.take_damage(damage)

    return move, int(damage)

def get_effectiveness_text(multiplier, defender):
    if multiplier == 0:
        return f" {defender} is immune!"
    elif multiplier == 0.5:
        return " It's not very effective..."
    elif multiplier == 2.0:
        return " It's super effective!"
    else:
        return ""

def simulate_battle(p1, p2, battle_strategy, rng_seed):
    rng = random.Random(int(rng_seed))
    turn = 1
    log = []

    while not p1.is_fainted() and not p2.is_fainted():
        # Get faster Pokemon to attack first (or random if speed tie)
        attacker, defender = get_attacker_and_defender(p1, p2, rng)
        move_strategy = 1 if attacker == p1 else battle_strategy # Player always greedy (optimal)
        move, damage = execute_move(attacker, defender, move_strategy, rng)
        effectiveness = get_move_effectiveness_multiplier(move, defender)
        attacker_trainer = 0 if attacker == p1 else 1
        defender_trainer = 0 if defender == p1 else 1

        log.append((turn, attacker_trainer, attacker.name, defender_trainer, defender.name, move.name, damage, int(defender.current_hp), effectiveness))
        
        # Check if initial move fainted the Pokemon
        if defender.is_fainted():
            break
        
        # If not, switch roles, slower Pokemon attacks
        attacker, defender = defender, attacker
        move_strategy = 1 if attacker == p1 else battle_strategy # Player always greedy (optimal)
        move, damage = execute_move(attacker, defender, move_strategy, rng)
        effectiveness = get_move_effectiveness_multiplier(move, defender)
        attacker_trainer = 0 if attacker == p1 else 1
        defender_trainer = 0 if defender == p1 else 1

        log.append((turn, attacker_trainer, attacker.name, defender_trainer, defender.name, move.name, damage, int(defender.current_hp), effectiveness))

        # If both Pokemon are still alive, increment the turn
        if not defender.is_fainted():
            turn += 1

    return log

def get_print_battle_log(log):
    last_defender = None
    print_log = []
    for entry in log:
        turn, attacker_trainer, attacker_name, defender_trainer, defender_name, move_name, damage, hp, effectiveness = entry
        last_defender = defender_name
        print_log.append(f"{attacker_name} used {move_name}." + get_effectiveness_text(effectiveness, defender_name))
    
    print_log.append(f"{last_defender} fainted!")
    return print_log