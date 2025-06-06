import type { Generation, GeneratorServerResponse, PokemonData, Scores, Generator, MeasurementInfo, ProblemConfig, BattleSimulationData, Outcome } from "./type_utils";

function pokemonEquals(pokemon1: PokemonData, pokemon2: PokemonData): boolean {
    if (pokemon1.name !== pokemon2.name) return false;
    if (pokemon1.level !== pokemon2.level) return false;
    if (pokemon1.types.length !== pokemon2.types.length) return false;
    for (let i = 0; i < pokemon1.types.length; i++) {
        if (pokemon1.types[i] !== pokemon2.types[i]) return false;
    }
    if (pokemon1.stats.hp !== pokemon2.stats.hp) return false;
    if (pokemon1.stats.attack !== pokemon2.stats.attack) return false;
    if (pokemon1.stats.defense !== pokemon2.stats.defense) return false;
    if (pokemon1.stats.specialAttack !== pokemon2.stats.specialAttack) return false;
    if (pokemon1.stats.specialDefense !== pokemon2.stats.specialDefense) return false;
    if (pokemon1.stats.speed !== pokemon2.stats.speed) return false;
    if (pokemon1.moves.length !== pokemon2.moves.length) return false;
    for (let i = 0; i < pokemon1.moves.length; i++) {
        if (pokemon1.moves[i].name !== pokemon2.moves[i].name) return false;
        if (pokemon1.moves[i].type !== pokemon2.moves[i].type) return false;
        if (pokemon1.moves[i].category !== pokemon2.moves[i].category) return false;
        if (pokemon1.moves[i].power !== pokemon2.moves[i].power) return false;
        if (pokemon1.moves[i].accuracy !== pokemon2.moves[i].accuracy) return false;
    }
    return true;
}

function parseGeneratorScoreData(data: GeneratorServerResponse): Scores {
    return {
        q_score: data.scores.q_score,
        c_score: data.scores.c_score,
        d_score: data.scores.d_score
    };
}

function parseGenerationData(data: GeneratorServerResponse): Generation[] {
    return data.generations.map((gen, i) => ({
        id: i,
        individuals: [],
        scores: {
            q_score: gen.q_score,
            c_score: gen.c_score,
            d_score: gen.d_score
        },
    }));
}

const getGeneratorId = (generator: Generator): number => {
    let id = 0

    switch (generator.name) {
      case 'Random':
        id = 0;
        break;
      case 'Evolutionary Strategy':
        id = 1;
        break;
      case 'Genetic Algorithm':
        id = 2;
        break;
      default:
        throw new Error("Unknown generator type");
    }

    return id;
}

const parseMeasurementInfo = (data: {quality: number[], controlability: number[], diversity: number[]}) => {
    const measurementInfo: MeasurementInfo[] = [];
    for (let i = 0; i < data.quality.length; i++) {

      measurementInfo.push({
        quality: Number(data.quality[i].toFixed(2)),
        controllability: Number(data.controlability[i].toFixed(2)),
        diversity: Number(data.diversity[i].toFixed(2)),
      });
    }
    return measurementInfo;
  }

// Adapted TS variant of this function from the original PCG Benchmark repository
function getRangeReward(
    value: number,
    minValue: number,
    platLow: number,
    platHigh?: number,
    maxValue?: number
  ): number {
    if (platHigh === undefined) {
        platHigh = platLow;
        maxValue = platLow;
    }
    if (maxValue === undefined) {
        maxValue = platHigh;
    }

    if (value >= platLow && value <= platHigh) {
        return 1.0;
    }
    if (value <= minValue || value >= (maxValue as number)) {
        return 0.0;
    }
    if (value < platLow) {
        return Math.max(0.0, Math.min(1.0, (value - minValue) / ((platLow - minValue) + 1e-8)));
    }
    if (value > platHigh) {
        return Math.max(0.0, Math.min(1.0, ((maxValue as number) - value) / (((maxValue as number) - platHigh) + 1e-8)));
    }
    return 0.0;
}

function fillDefaultValuesForProblemConfig(problem: ProblemConfig): ProblemConfig {
    return {
        variant: problem.variant || "",
        min_level: problem.min_level || 1,
        max_level: problem.max_level || 100,
        min_turns: problem.min_turns || 1,
        max_turns: problem.max_turns || (problem.min_turns ? problem.min_turns + 5 : 6),
        winner: problem.winner || 0,
        surviving_hp_percentage: problem.surviving_hp_percentage || 0,
        diversity: problem.diversity || 0.4,
    };
}

function getOutcomeData(results: BattleSimulationData): Outcome{
    const winner = results.data.winner == 0 ? "Player" : "Rival";
    const turns = results.data.turns || 0;
    const surviving_pokemon_hp_percentage =
        results.data.surviving_pokemon_hp_percentage !== undefined
            ? (results.data.surviving_pokemon_hp_percentage * 100).toFixed() + "%"
            : "";
    const first_move_trainer = results.data.first_move === 0 ? "Player" : "Rival";
    const rival_battle_strategy = results.data.rival_battle_strategy == 0 ? "Random" : "Greedy";

    return {
        turns: turns.toString(),
        first_move_trainer: first_move_trainer,
        winner: winner,
        surviving_pokemon_hp_percentage: surviving_pokemon_hp_percentage,
        rival_battle_strategy: rival_battle_strategy,
    };
}

export { pokemonEquals, parseGenerationData, parseGeneratorScoreData, getGeneratorId, parseMeasurementInfo, getRangeReward, fillDefaultValuesForProblemConfig, getOutcomeData };