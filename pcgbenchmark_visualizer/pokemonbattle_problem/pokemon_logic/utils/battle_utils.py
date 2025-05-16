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
    

def get_defensive_stat_value(defender, move):
    """
    Gets the defensive (defense) stat value of the defending Pokemon taking a given move.
    If the used move is physical, the defense stat is used.
    If the used move is special, the special defense stat is used.

    @param defender: The defending Pokemon object.
    @param move: The move being used by the attacker.

    return: The defensive stat value of the defending Pokemon.
    """
    if move.category == MoveCategory.PHYSICAL:
        return defender.stats.defense
    elif move.category == MoveCategory.SPECIAL:
        return defender.stats.special_defense
    else:
        raise ValueError("Cannot determine defensive stat for status moves.")
    
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
    defensive_stat_value = get_defensive_stat_value(defender, move)
    attack_defense_ratio = offensive_stat_value / defensive_stat_value

    base_damage = int(level_factor * move.power * attack_defense_ratio / 50 + 2)

    total_damage = round(base_damage * random_factor)  
    total_damage = round(total_damage * get_move_effectiveness_multiplier(move, defender))
    total_damage = round(total_damage * get_stab_multiplier(move, attacker))

    return max(1, total_damage)

def get_attacker_and_defender(p1, p2, rng):
    """
    Determines the attacker and defender Pokemon based on their speed stat.
    If their speeds are equal, a random choice is made.
    This follows the game rules.

    @param p1: The first Pokemon object.
    @param p2: The second Pokemon object.
    @param rng: A random number generator.
    @return: A tuple containing the attacker and defender Pokemon objects.
    """
    if p1.stats.speed > p2.stats.speed:
        return p1, p2
    elif p2.stats.speed > p1.stats.speed:
        return p2, p1
    else:
        if rng.random() < 0.5:
            return p1, p2
        else:
            return p2, p1