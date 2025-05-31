import { getRangeReward } from "../../../../utils/function_utils";
import type { BattleInspectorData, Control, Outcome, ProblemConfig } from "../../../../utils/type_utils";
import { getTypeFromId } from "../../../battle_utils";

interface CalculationParameter {
    label: string;
    description: string;
    formula: string;
    calculation: string;
}

type CalculationParameterGenerator = (problem: ProblemConfig, control: Control, outcome: Outcome, content: BattleInspectorData) => CalculationParameter;

const getWinerRewardValue = (problem: ProblemConfig, outcome: Outcome) => {
    const problem_winner = problem.winner == 0 ? "Player" : "Rival";
    const battle_winner = outcome.winner;
    const reward = problem_winner.toLowerCase() === battle_winner.toLowerCase() ? 1 : 0;
    return reward
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getWinnerReward: CalculationParameterGenerator = (problem, _control, outcome, _content) => {
    const problem_winner = problem.winner == 0 ? "Player" : "Rival";
    const battle_winner = outcome.winner;
    const reward = getWinerRewardValue(problem, outcome);

    return {
        label: "winner_reward",
        description: "Reward for winning the battle. The goal is for the outcome to match the winner specified by the problem.",
        formula: "if (problem_winner === battle_winner)\nthen winner_reward = 1\nelse winner_reward = 0",
        calculation: `${problem_winner} ${reward == 1 ? "==" : "!="} ${battle_winner} \n=> winner_reward = ${reward}`,
    };
}

const getPlayerLevelRewardValue = (problem: ProblemConfig, content: BattleInspectorData) => {
    const player_level = content.player_level;
    const min_level = problem.min_level || 1;
    const max_level = problem.max_level || 1;

    return getRangeReward(player_level, Math.max(min_level - 2, 0), min_level, max_level, Math.min(max_level + 2, 101));
}

const getPlayerLevelReward: CalculationParameterGenerator = (problem, _control, _outcome, content) => {
    const player_level = content.player_level;
    const min_level = problem.min_level || 1;
    const max_level = problem.max_level || 1;

    const player_level_reward = getPlayerLevelRewardValue(problem, content);

    return {
        label: "player_level_reward",
        description: "Reward for the generated Pokemon's level being within the problem variant's defined range.",
        formula: `player_level_reward = \ngetRangeReward(player_level, 0, min_level, max_level, 101)\nwhere \ngetRangeReward() returns:\n- 1 if value is within [min_level, max_level]\n- 0 if value is outside [min_level - 2, max_level + 2]\n- linear interpolation otherwise`,
        calculation: `Player Level (${player_level}) is ${player_level_reward == 1 ? "within" : "out of"} range [${min_level}, ${max_level}] \n=> player_level_reward = ${player_level_reward.toFixed(2)}`,
    };
}

const getRivalLevelRewardValue = (problem: ProblemConfig, content: BattleInspectorData) => {
    const rival_level = content.rival_level;
    const min_level = problem.min_level || 1;
    const max_level = problem.max_level || 1;
    return getRangeReward(rival_level, Math.min(min_level - 2, 0), min_level, max_level, Math.max(max_level + 2, 101));
}

const getRivalLevelReward: CalculationParameterGenerator = (problem, _control, _outcome, content) => {
    const rival_level = content.rival_level;
    const min_level = problem.min_level || 1;
    const max_level = problem.max_level || 1;

    const rival_level_reward = getRivalLevelRewardValue(problem, content);
    
    return {
        label: "rival_level_reward",
        description: "Reward for the rival Pokemon's level being within the problem variant's defined range.",
        formula: `rival_level_reward = \ngetRangeReward(rival_level, 0, min_level, max_level, 101)\nwhere \ngetRangeReward() returns:\n- 1 if value is within [min_level, max_level]\n- 0 if value is outside [min_level - 2, max_level + 2]\n- linear interpolation otherwise`,
        calculation: `Rival Level (${rival_level}) is ${rival_level_reward == 1 ? "within" : "out of"} range [${min_level}, ${max_level}] \n=> rival_level_reward = ${rival_level_reward.toFixed(2)}`,
    };
}

const getLevelBalanceRewardValue = (content: BattleInspectorData) => {
    const player_level = content.player_level;
    const rival_level = content.rival_level;
    return getRangeReward(rival_level, Math.max(player_level - 5, 0), player_level - 2, player_level + 2, Math.min(player_level + 5, 101));
}

const getLevelBalanceReward: CalculationParameterGenerator = (_problem, _control, _outcome, content) => {
    const player_level = content.player_level;
    const rival_level = content.rival_level;
    const level_balance_reward = getLevelBalanceRewardValue(content);

    return {
        label: "level_balance_reward",
        description: "Reward for the rival Pokemon's level being within a balanced range (+/-2) of the player Pokemon's level.",
        formula: `level_balance_reward = \ngetRangeReward(rival_level, \n               player_level - 5, \n               player_level - 2, \n               player_level + 2, \n               player_level + 5\n              )\nwhere \ngetRangeReward() returns:\n- 1 if value is within [player_level - 2, player_level + 2]\n- 0 if value is outside [player_level - 5, player_level + 5]\n- linear interpolation otherwise`,
        calculation: `Rival Level (${rival_level}) is ${level_balance_reward == 1 ? "within" : "out of"} range [${player_level - 2}, ${player_level + 2}] \n=> level_balance_reward = ${level_balance_reward.toFixed(2)}`,
    }
}

const getHpPercentageRewardValue = (problem: ProblemConfig, content: BattleInspectorData) => {
    const surviving_hp_percentage = content.surviving_pokemon_hp_percentage;
    const problem_hp_percentage = problem.surviving_hp_percentage || 0;
    let hp_percentage_reward = 1.0;
    if (problem_hp_percentage > 0) {
        hp_percentage_reward = getRangeReward(surviving_hp_percentage, 0, problem_hp_percentage - 0.1, problem_hp_percentage + 0.1, 1.0);
    }
    return hp_percentage_reward;
}

const getHpPercentageReward: CalculationParameterGenerator = (problem, _control, _outcome, content) => {
    const surviving_hp_percentage = content.surviving_pokemon_hp_percentage;
    const problem_hp_percentage = problem.surviving_hp_percentage || 0;
    const hp_percentage_reward = getHpPercentageRewardValue(problem, content);

    let finalCalculationText = `problem_hp_percentage = 0% (default) \n=> hp_percentage_reward = 1.0`;
    if (problem_hp_percentage > 0) {
        finalCalculationText = `Surviving HP Percentage (${(surviving_hp_percentage * 100)}%) is ${hp_percentage_reward == 1 ? "within" : "out of"} range [${(problem_hp_percentage - 0.1) * 100}%, ${(problem_hp_percentage + 0.1) * 100}%] \n=> hp_percentage_reward = ${hp_percentage_reward.toFixed(2)}`;
    }

    return {
        label: "hp_percentage_reward",
        description: "Reward for the surviving Pokemon's HP percentage being within a small range of the problem variant's defined HP percentage. If the problem doesn't specify an HP percentage (0), the reward is always 1.",
        formula: `hp_percentage_reward = \ngetRangeReward(surviving_hp_percentage, \n               0, \n               problem_hp_percentage - 0.1, \n               problem_hp_percentage + 0.1, \n               1.0\n              )\nwhere \ngetRangeReward() returns:\n- 1 if value is within [percentage - 0.1, percentage + 0.1]\n- 0 if value is outside [0, 1]\n- linear interpolation otherwise`,
        calculation: finalCalculationText,
    };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getPokemonDiversityReward = () => {
    return {
        label: "pokemon_diversity",
        description: "Reward for the diversity of the Pokemon used in the battle. We check that there are at least 2 different pokemon in 2 given battles.",
        formula: "pokemon_diversity = getRangeReward(unique_pokemon_count, 0, 2)\nwhere \ngetRangeReward() returns:\n- 1 if value is greater than or equal to 2\n- 0 if value is less than 2",
        calculation: "count the unique pokemon in 2 given battles \n=> check if it is greater than or equal to 2"
    }
}

const getLevelDiversityReward = (): CalculationParameter => {
    return {
        label: "level_diversity",
        description: "Reward for the diversity of the levels of the Pokemon used in the battle. We check that the player level and rival level differ between battles.",
        formula: "level_diversity = (player_level_diversity\n                   + rival_level_diversity) / 2\nwhere \n\nif battle_1_player_level != battle_2_player_level\nthen player_level_diversity = 1\nelse player_level_diversity = 0\n\nif battle_1_rival_level != battle_2_rival_level\nthen rival_level_diversity = 1\nelse rival_level_diversity = 0",
        calculation: "Compute the player and rival diversity for 2 given battles\n=> average them."
    }
}

const getDiversityRatio = (): CalculationParameter => {
    return {
        label: "diversity_ratio",
        description: "The final ratio used to compute diversity.",
        formula: "diversity_ratio = (pokemon_diversity + level_diversity) / 2",
        calculation: "Compute the pokemon_diversity and level_diversity\n=> average them."
    }
}

const getDScoreParameter = (value: number): CalculationParameter => {
    return {
        label: "d_score",
        description: "Diversity score of the generated battle. We check that the computed diversity ratio satisfies the problem variant's defined diversity threshold.",
        formula: "d_score = getRangeReward(diversity_ratio, \n                         0, \n                         problem_diversity, \n                         1.0)\nwhere getRangeReward() returns:\n- 1 if value is greater than or equal to problem_diversity\n- 0 if value is less than 0\n- linear interpolation otherwise",
        calculation: `d_score = ${value.toFixed(2)}`,
    }
}

const getQScoreParameter = (rewards: number[]): CalculationParameter => {
    return {
        label: "q_score",
        description: "Average of all defined quality rewards (rewards / 5).",
        formula: "q_score = (winner_reward \n           + player_level_reward \n           + rival_level_reward \n           + level_balance_reward \n           + hp_percentage_reward) / 5",
        calculation: `q_score = (${rewards.map(x => x.toFixed(2)).join(" + ")}) / 5 = ${(rewards.reduce((a, b) => a + b, 0) / 5).toFixed(2)}`,
    }
}

const getTurnsRewardValue = (control: Control, content: BattleInspectorData) => {
    const turns = content.turns;
    const control_turns = control.turns || 0;
    return getRangeReward(turns, Math.max(control_turns - 4, 0), control_turns - 2, control_turns + 2, control_turns + 4);
}

const getTurnsReward: CalculationParameterGenerator = (_problem, control, _outcome, content) => {
    const turns = content.turns;
    const control_turns = control.turns || 0;
    const turns_reward = getTurnsRewardValue(control, content);
    return {
        label: "turns_reward",
        description: "Reward for the number of turns taken in the battle being within a balanced range (+/-2) of the control sample's defined turns.",
        formula: `turns_reward = \ngetRangeReward(turns, \n               control_turns - 4, \n               control_turns - 2, \n               control_turns + 2, \n               control_turns + 4\n              )\nwhere \ngetRangeReward() returns:\n- 1 if value is within [control_turns - 2, control_turns + 2]\n- 0 if value is outside [control_turns - 4, control_turns + 4]\n- linear interpolation otherwise`,
        calculation: `Turns (${turns}) is ${turns_reward == 1 ? "within" : "out of"} range [${control_turns - 2}, ${control_turns + 2}] \n=> turns_reward = ${turns_reward.toFixed(2)}`,
    };
}

const getRivalTypeRewardValue = (content: BattleInspectorData, control: Control) => {
    const rival_pokemon_types = content.rival_pokemon_types || [];
    const control_rival_pokemon_type = control.rival_pokemon_type || 0;
    const reward = rival_pokemon_types.map(x => parseInt(x)).includes(control_rival_pokemon_type) ? 1 : 0;
    return reward;
}

const getRivalTypeReward: CalculationParameterGenerator = (_problem, control, _outcome, content) => {
    const rival_pokemon_types = content.rival_pokemon_types || 0;
    const control_rival_pokemon_type = control.rival_pokemon_type || 0;
    const rival_type_reward = getRivalTypeRewardValue(content, control);
    const control_type_string = getTypeFromId(control_rival_pokemon_type);
    return {
        label: "rival_type_reward",
        description: "Reward for the rival Pokemon's type matching the control sample's defined type.",
        formula: `rival_type_reward = \nif (rival_pokemon_types.includes(control_type_string))\nthen 1\nelse 0`,
        calculation: `Rival Pokemon Types (${rival_pokemon_types.map(x => getTypeFromId(parseInt(x))).join(", ")}) ${rival_type_reward == 1 ? "includes" : "does not include"} ${control_type_string} \n=> rival_type_reward = ${rival_type_reward}`,
    };
}

const getFirstMoveRewardValue = (control: Control, outcome: Outcome) => {
    const first_move_trainer = outcome.first_move_trainer || "";
    const control_first_move_trainer = control.first_move_trainer || 0;
    const control_first_move_string = control_first_move_trainer === 0 ? "Player" : "Rival";
    return first_move_trainer.toLowerCase() === control_first_move_string.toLowerCase() ? 1 : 0;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getFirstMoveReward: CalculationParameterGenerator = (_problem, control, outcome, _content) => {
    const first_move_trainer = outcome.first_move_trainer || "";
    const control_first_move_trainer = control.first_move_trainer || 0;
    const first_move_reward = getFirstMoveRewardValue(control, outcome);
    const control_first_move_string = control_first_move_trainer === 0 ? "Player" : "Rival";
    return {
        label: "first_move_reward",
        description: "Reward for the first move trainer matching the control sample's defined first move trainer.",
        formula: `first_move_reward = \nif (first_move_trainer === control_first_move_string)\nthen 1\nelse 0`,
        calculation: `First Move Trainer (${first_move_trainer}) ${first_move_reward == 1 ? "is" : "is not"} ${control_first_move_string} \n=> first_move_reward = ${first_move_reward}`,
    };
}

const getCScoreParameter = (rewards: number[]): CalculationParameter => {
    return {
        label: "c_score",
        description: "Average of all defined control rewards (rewards / 3).",
        formula: "c_score = (turns_reward \n           + rival_type_reward \n           + first_move_reward) / 3",
        calculation: `c_score = (${rewards.map(x => x.toFixed(2)).join(" + ")}) / 3 = ${(rewards.reduce((a, b) => a + b, 0) / 3).toFixed(2)}`,
    }
}
    
export {
    getWinnerReward,
    getPlayerLevelReward,
    getRivalLevelReward,
    getLevelBalanceReward,
    getHpPercentageReward,
    getQScoreParameter,
    getWinerRewardValue,
    getPlayerLevelRewardValue,
    getRivalLevelRewardValue,
    getLevelBalanceRewardValue,
    getHpPercentageRewardValue,
    getTurnsReward,
    getRivalTypeReward,
    getTurnsRewardValue,
    getRivalTypeRewardValue,
    getFirstMoveReward,
    getFirstMoveRewardValue,
    getCScoreParameter,
    getPokemonDiversityReward,
    getLevelDiversityReward,
    getDiversityRatio,
    getDScoreParameter,
}

export type { CalculationParameter };