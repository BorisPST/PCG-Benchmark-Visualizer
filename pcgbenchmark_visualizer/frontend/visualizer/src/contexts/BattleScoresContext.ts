import { createContext } from "react";
import type { Scores } from "../components/utils/type_utils";

export const BattleScoresContext = createContext<Scores>({
    q_score: 0,
    c_score: 0,
    d_score: 0
})