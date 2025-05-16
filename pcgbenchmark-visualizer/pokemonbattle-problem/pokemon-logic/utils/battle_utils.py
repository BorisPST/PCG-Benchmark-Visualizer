from .move_utils import MoveCategory
from .type_utils import TYPE_CHART

def get_offensive_stat_value(attacker, move):
    """
    Gets the offensive (attacking) stat value of the attacking Pokemon using a given move.
    If the used move is physical, the attack stat is used.
    If the used move is special, the special attack stat is used.

    @param attacker: The attacking Pokemon object.
    @param move: The move being used by the attacker.

    return: The offensive stat value of the attacking Pokemon.
    """
    if move.category == MoveCategory.PHYSICAL:
        return attacker.stats.attack
    elif move.category == MoveCategory.SPECIAL:
        return attacker.stats.special_attack
    else:
        raise ValueError("Cannot determine offensive stat for status moves.")

def get_move_effectiveness_multiplier(move, defender):
    """
    Gets the effectiveness multipler of a move against a defending Pokemon.
        0 => immune
        0.5 => not very effective
        1.0 => neutral
        2.0 => super effective

    In case of dual types, the total effectiveness is the product of the effectiveness against each type.
    The full explanation can be found here: https://bulbapedia.bulbagarden.net/wiki/Type#Type_effectiveness.

    @param move: The move being used by the attacker.
    @param defender: The defending Pokemon object.

    return: The effectiveness multiplier of the move against the defending Pokemon.
    """

    type1 = defender.types[0]
    type2 = defender.types[1]

    type1_multiplier = TYPE_CHART.get((move.type, type1), 1.0)

    if type2 is not None:
        type2_multiplier = TYPE_CHART.get((move.type, type2), 1.0)
        return type1_multiplier * type2_multiplier
    else:
        return type1_multiplier

def get_stab_multiplier(move, attacker):
    """
    Gets the STAB (Same Type Attack Bonus) multiplier for a move used by a Pokemon.
    The STAB multiplier is 1.5 if the move type matches one of the Pokemon's types, otherwise it is 1.0.

    The full explanation can be found here: https://bulbapedia.bulbagarden.net/wiki/Same-type_attack_bonus

    @param move: The move being used by the attacker.
    @param attacker: The attacking Pokemon object.

    return: The STAB multiplier for the move.
    """
    if move.type in attacker.types:
        return 1.5
    else:
        return 1.0

def calculate_damage(attacker, defender, move, random_factor=1.0):
    """
    Calculate the damage dealt by the attacking Pokemon to the defending Pokémon.

    The full formula is available here: https://bulbapedia.bulbagarden.net/wiki/Damage#Damage_calculation
    We follow the Geenration V onward version of the formula. 
    Note the many additional multipliers in the formula on the page. These include many
    mechanics, most of which are not relevant for our simulation. We include only the following multipliers:
    - random: the random factor between 0.85 and 1.00, which adds some variability to the damage calculation.
    - Type effectiveness: 0.0 if the target is immune, 0.5 if the move is not very effective, 1.0 if it is neutral, and 2.0 if it is super effective.
    - STAB (Same Type Attack Bonus): 1.5 if the move type matches one of the Pokemon's types (e.g. Charmander using a Fire type move).

    @param attacker: The attacking Pokemon object.
    @param defender: The defending Pokemon object.
    @param move: The move being used by the attacker.
    
    return: The calculated damage value.
    """
    level_factor = 2 * attacker.level / 5 + 2
    offensive_stat_value = get_offensive_stat_value(attacker, move)
    attack_defense_ratio = offensive_stat_value / defender.stats.defense

    base_damage = level_factor * move.power * attack_defense_ratio / 50 + 2

    total_damage = base_damage * random_factor * get_move_effectiveness_multiplier(move, defender) * get_stab_multiplier(move, attacker)
    return int(total_damage)