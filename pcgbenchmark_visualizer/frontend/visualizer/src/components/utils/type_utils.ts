interface PokemonData {
    name: string;
    types: string[];
    level: number;
    stats: PokemonStats;
    moves: MoveData[];
    curentHP: number;
}

interface LogEntry {
    turn: number;
    attacker_trainer: number;
    attacker_name: string;
    defender_trainer: number;
    defender_name: string;
    move_name: string;
    damage: number;
    hp: number;
    effectiveness: number;
}

interface BattleData {
    log: LogEntry[];
    playerPokemon: PokemonData;
    rivalPokemon: PokemonData;
    winner: number;
    turns: number;
    player_move_effectiveness: number;
    rival_move_effectiveness: number;
    surviving_pokemon_hp: number;
    quality: number;
    controllability: number;
    diversity: number;
} 

interface MeasurementInfo {
    quality: number;
    controllability: number;
    diversity: number;
}

interface Info {
    log: LogEntry[];
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

interface PokemonSprites {
    name: string,
    front: string,
    back: string,
    icon: string,
    animated_icon: string,
}

interface GeneratorConfig {
    generations?: number
    population_size?: number
    generator?: number
    fitness?: string
}


interface ProblemConfig {
    variant: string
    min_level?: number
    max_level?: number
    min_turns?: number
    max_turns?: number
    winner?: number
    surviving_hp_percentage?: number
    diversity?: number
}

interface Individual {
    id: number;
};
interface Scores { 
    quality: number; 
    controlability: number; 
    diversity: number 
};

interface Generation { 
    id: number; 
    individuals: Individual[]; 
    scores: Scores 
};

interface Generator { 
    id: number; 
    name: string; 
    generations: Generation[], 
    parameters: string[], 
    scores?: Scores 
};


export type { PokemonData, BattleData, PokemonStats, MoveData, Info, MeasurementInfo, PokemonSprites, LogEntry, GeneratorConfig, ProblemConfig, Individual, Scores, Generation, Generator };
export { emptyPokemonData };