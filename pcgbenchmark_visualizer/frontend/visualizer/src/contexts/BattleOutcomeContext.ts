import { createContext } from "react";
import type { Outcome } from "../components/utils/type_utils";

const BattleOutcomeContext = createContext<Outcome>({} as Outcome);
export default BattleOutcomeContext;