import { createContext } from "react";
import type { Control } from "../components/utils/type_utils";

const ControlSampleContext = createContext<Control>({} as Control);
export default ControlSampleContext;