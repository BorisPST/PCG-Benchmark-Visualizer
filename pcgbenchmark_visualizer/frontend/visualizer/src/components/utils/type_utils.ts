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
    id: number;
    playerPokemon: string;
    rivalPokemon: string;
    player_level: number;
    rival_level: number;
    winner: number;
    turns: number;
    surviving_hp_percentage: number;
    quality: number;
    controlability: number;
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

interface Content {
    player_pokemon: number;
    rival_pokemon: number;
    player_level: number;
    rival_level: number;
    rival_battle_strategy: number;
    rng_seed: number;
};

interface Control {
    turns: number;
    rival_pokemon_type: number;
    first_move_trainer: number;
}

interface Individual {
    content: Content;
    control: Control;
    winner: number;
    surviving_hp_percentage: number;
    turns: number;
    quality: number;
    controlability: number;
    diversity: number;
}

interface Scores { 
    q_score: number; 
    c_score: number; 
    d_score: number 
};

interface Generation { 
    id: number; 
    individuals: Individual[]; 
    scores: Scores 
};

interface GeneratorParameter {
    name: string;
    value: number;
}

interface Generator { 
    id: number; 
    name: string; 
    generations: Generation[], 
    parameters: GeneratorParameter[],
    scores?: Scores 
};

interface GeneratorServerResponse {
    scores: Scores;
    generations: Scores[];
}

interface GeneratorResponseParsedData {
    generator: number;
    generations: Generation[];
    scores: Scores;
}

export type { 
    PokemonData, 
    BattleData, 
    PokemonStats,
    MoveData, 
    Info, 
    MeasurementInfo, 
    PokemonSprites, 
    LogEntry, 
    GeneratorConfig, 
    ProblemConfig, 
    Individual, 
    Scores,
    Generation, 
    Generator, 
    GeneratorServerResponse,
    GeneratorResponseParsedData
};

const emptyRandomGenerator: Generator = {
    id: 0,
    name: 'Random',
    generations: [],
    parameters: [
        { name: 'Population Size', value: 100 },
    ],
    scores: {
        q_score: 0,
        c_score: 0,
        d_score: 0
    }
};

const emptyESGenerator: Generator = {
    id: 1,
    name: 'Evolutionary Strategy',
    generations: [],
    parameters: [
        { name: 'Mu Size', value: 100 },
        { name: 'Lambda Size', value: 100 },
        { name: "Mutation Rate", value: 0.05 },
    ],
    scores: {
        q_score: 0,
        c_score: 0,
        d_score: 0
    }
};

const emptyGAGenerator: Generator = {
    id: 2,
    name: 'Genetic Algorithm',
    generations: [],
    parameters: [
        { name: 'Population Size', value: 100 },
        { name: 'Tournament Size', value: 7 },
        { name: 'Cross Rate', value: 0.5 },
        { name: 'Mutation Rate', value: 0.05 },
        { name: 'Elitism %', value: 10 }
    ],
    scores: {
        q_score: 0,
        c_score: 0,
        d_score: 0
    }
};

const defaultProblem: ProblemConfig = {
    variant: "pokemonbattle-v0",
}

const longProblem: ProblemConfig = {
    variant: "pokemonbattle-long-v0",
};

const shortProblem: ProblemConfig = {
    variant: "pokemonbattle-short-v0",
}

const rivalWinProblem: ProblemConfig = {
    variant: "pokemonbattle-rivalwin-v0",
}

const toTheWireProblem: ProblemConfig = {
    variant: "pokemonbattle-tothewire-v0",
}

const sweepProblem: ProblemConfig = {
    variant: "pokemonbattle-sweep-v0",
}

export { 
    emptyPokemonData, 
    emptyRandomGenerator, 
    emptyESGenerator, 
    emptyGAGenerator,
    defaultProblem,
    longProblem,
    shortProblem,
    rivalWinProblem,
    toTheWireProblem,
    sweepProblem
};