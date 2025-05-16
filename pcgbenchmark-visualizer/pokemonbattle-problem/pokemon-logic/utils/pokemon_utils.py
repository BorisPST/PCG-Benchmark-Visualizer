
from collections import namedtuple
from .stats_utils import PokemonStats

# Note: move_pool is a dictionary that maps levels to moves
PokemonBlueprint = namedtuple('PokemonBlueprint', ['name', 'type1', 'type2', 'base_stats', 'move_pool'])

class Pokemon():
    def __init__(self, blueprint, level):
        self.name = blueprint.name
        self.types = (blueprint.type1, blueprint.type2)
        self.level = level

        self.set_moves(blueprint.move_pool)
        self.set_stats(blueprint.base_stats)
    
    def set_moves(self, move_pool):
        """
        Sets the Pokemon's moves based on its movepool and level.
        @param move_pool: A dictionary mapping levels to moves.

        This method is consistent with how Pokemon moves are determined for wild Pokemon in the games.
        It keeps the 4 most recent moves for the Pokemon based on its level.
        """
        moves = []
        for level, move in move_pool.items():
            if level <= self.level:
                moves.append(move)
            
            if len(moves) > 4:
                moves.pop(0)
        self.moves = moves

    def set_stats(self, base_stats):
        """
        Sets the Pokemon's stats based on its base stats and level.
        @param stats: A namedtuple containing the Pokemon's stats.

        This method applies the stat formula to determine the actual value of a particular stat based on the Pokemon's level and the base stat value.
        For the full formula, see the following (subsection "Generation III onward): https://bulbapedia.bulbagarden.net/wiki/Stat#Formula.

        Note: For simplicity, we exclude the IVs, EVs and Natures from the system and thus also the calculation. We thus simplify the formula to:
            HP = floor((2 * base * level) / 100) + level + 10
            other_stat = floor((2 * base * level) / 100) + 5
        """

        def calc_hp_stat(base_stat, level):
            return int((2 * base_stat * level) / 100) + level + 10

        def calc_other_stat(base_stat, level):
            return int((2 * base_stat * level) / 100) + 5
        
        self.stats = PokemonStats(
            hp=calc_hp_stat(base_stats.hp, self.level),
            attack=calc_other_stat(base_stats.attack, self.level),
            defense=calc_other_stat(base_stats.defense, self.level),
            special_attack=calc_other_stat(base_stats.special_attack, self.level),
            special_defense=calc_other_stat(base_stats.special_defense, self.level),
            speed=calc_other_stat(base_stats.speed, self.level)
        )

        self.current_hp = self.stats.hp