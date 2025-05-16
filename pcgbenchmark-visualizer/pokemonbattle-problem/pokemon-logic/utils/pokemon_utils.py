
from collections import namedtuple

# Note: move_pool is a dictionary that maps levels to moves
PokemonBlueprint = namedtuple('PokemonBlueprint', ['name', 'type1', 'type2', 'base_stats', 'move_pool'])

class Pokemon():
    def __init__(self, blueprint, level):
        self.name = blueprint.name
        self.types = (blueprint.type1, blueprint.type2)
        self.base_stats = blueprint.base_stats
        self.move_pool = blueprint.move_pool
        self.level = level
    
    def set_moves(self, move_pool):
        ''''
        Sets the Pokemon's moves based on its movepool and level.
        @param move_pool: A dictionary mapping levels to moves.

        This method is consistent with how Pokemon moves are determined for wild Pokemon in the games.
        It keeps the 4 most recent moves for the Pokemon based on its level.
        '''
        moves = []
        for level, move in move_pool.items():
            if level <= self.level:
                moves.append(move)
            
            if len(moves) > 4:
                moves.pop(0)
        self.moves = moves

    