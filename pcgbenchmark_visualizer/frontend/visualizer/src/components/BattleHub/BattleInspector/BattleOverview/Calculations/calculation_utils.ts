import type { Control, Outcome, ProblemConfig } from "../../../../utils/type_utils";

interface CalculationParameter {
    label: string;
    description: string;
    formula: string;
    calculation: string;
}

type CalculationParameterGenerator = (problem: ProblemConfig, control: Control, outcome: Outcome) => CalculationParameter;

const getWinnerReward: CalculationParameterGenerator = (problem, _control, outcome) => {
    const problem_winner = problem.winner == 0 ? "Player" : "Rival";
    const battle_winner = outcome.winner;
    const reward = problem_winner.toLowerCase() === battle_winner.toLowerCase() ? 1 : 0;

    return {
        label: "winner_reward",
        description: "Reward for winning the battle. The goal is for the outcome to match the winner specified by the problem.",
        formula: "if (problem_winner === battle_winner)\nthen winner_reward = 1\nelse winner_reward = 0",
        calculation: `${problem_winner} ${reward == 1 ? "==" : "!="} ${battle_winner} => winner_reward = ${reward}`,
    };
}

export {
    getWinnerReward,
}

export type { CalculationParameter };