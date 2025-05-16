interface PokemonData {
    name: string;
    types: string[];
    level: number;
    stats: PokemonStats;
    moves: MoveData[];
    curentHP: number;
}

interface BattleData {
    playerPokemon: PokemonData;
    rivalPokemon: PokemonData;
}

interface Info {
    player_pokemon: PokemonData;
    rival_pokemon: PokemonData;
}

interface PokemonStats {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
}

interface MoveData {
    name: string;
    type: string;
    category: string;
    power: number;
    accuracy: number;
}

export type { PokemonData, BattleData, PokemonStats, MoveData, Info };