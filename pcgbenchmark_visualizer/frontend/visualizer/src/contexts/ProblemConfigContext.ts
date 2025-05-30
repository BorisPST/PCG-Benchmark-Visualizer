import { createContext } from "react";
import { type ProblemConfig } from "../components/utils/type_utils";

const ProblemConfigContext = createContext<ProblemConfig>({} as ProblemConfig);
export default ProblemConfigContext;