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

interface MeasurementInfo {
    quality: number;
    controllability: number;
    diversity: number;
}

interface Info {
    log: string[];
    player_pokemon: PokemonData;
    rival_pokemon: PokemonData;
    player_move_effectiveness: number;
    rival_move_effectiveness: number;
    surviving_pokemon_hp: number;
    turns: number;
    winner: number;
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

const emptyPokemonData: PokemonData = {
    name: "",
    types: [],
    level: 0,
    stats: {
        hp: 0,
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
    },
    moves: [],
    curentHP: 0,
};

export type { PokemonData, BattleData, PokemonStats, MoveData, Info, MeasurementInfo };
export { emptyPokemonData };