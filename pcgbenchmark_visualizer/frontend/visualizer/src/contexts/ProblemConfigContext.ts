import { createContext } from "react";
import { type ProblemConfig } from "../components/utils/type_utils";

interface ProblemConfigContextData {
    problemConfig: ProblemConfig;
    allConfigs: ProblemConfig[];
}

const ProblemConfigContext = createContext<ProblemConfigContextData>({
    problemConfig: {
        variant: "",
        min_level: 0,
        max_level: 0,
        min_turns: 0,
        max_turns: 0,
        winner: 0,
        surviving_hp_percentage: 0,
        diversity: 0
    },
    allConfigs: [],
});
export default ProblemConfigContext;