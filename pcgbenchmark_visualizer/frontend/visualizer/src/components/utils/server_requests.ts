import { parseGenerationData, parseGeneratorScoreData, parseMeasurementInfo } from "./function_utils";
import { type Content, type BattleSimulationData, type GeneratorConfig, type GeneratorResponseParsedData, type GeneratorServerResponse, type Individual, type ProblemConfig, type Control, type LogEntry } from "./type_utils";

export const runGeneratorOnProblem = async (generatorConfig: GeneratorConfig, problemConfig: ProblemConfig) => {
    try {
        const params = {
            generator_config: generatorConfig,
            problem_config: problemConfig,
        }

        const response = await fetch('http://localhost:8000/run_generator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        });

        const data = await response.json();
        const raw_scores = data["final_score"];
        const raw_generations = data["generations"];

        const responseData: GeneratorServerResponse = {
        scores: raw_scores,
        generations: raw_generations
        }

        const generations = parseGenerationData(responseData);
        const scores = parseGeneratorScoreData(responseData);
        const res: GeneratorResponseParsedData = {
            generator: generatorConfig.generator ?? 0,
            generations: generations,
            scores: scores
        }
        return res
        } catch (error) {
        console.error("Error running generator:", error);
        }
}

export const generateBattles = async () => {
    const response = await fetch(`http://localhost:8000/simulate?sample_size=${5}&sample_with_control=${true}`);
    const data = await response.json();

    return parseMeasurementInfo(data["details"]);
}

export const getIndividualsForGeneration = async (generator: number, generation: number) => {
    const response = await fetch(`http://localhost:8000/generation?generator=${generator}&generation=${generation}`);
    const data = await response.json();

    const individuals: Individual[] = data["individuals"];
    return individuals;
}

export const getBattleSimulation = async (variant: string, content: Content, control: Control) => {
    const params = {
            variant: variant,
            content: content,
            control: control,
        }

        const response = await fetch('http://localhost:8000/simulate_battle', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
        });

        const data = await response.json();

        const logs: LogEntry[] = [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data["info"]["log"].forEach((element: any[]) => {
            logs.push({
                turn: element[0],
                attacker_trainer: element[1],
                attacker_name: element[2],
                defender_trainer: element[3],
                defender_name: element[4],
                move_name: element[5],
                damage: element[6],
                hp: element[7],
                effectiveness: element[8]
            });
        });

        const battleData: BattleSimulationData = {
            data: data["info"],
            render: data["render"],
            log: logs
        }
        return battleData;
}

export const getAllProblemConfigs = async () => {
    const response = await fetch('http://localhost:8000/problem_variants');
    const data = await response.json();

    const problemConfigs: ProblemConfig[] = data;
    return problemConfigs;
}