import { createContext } from "react";
const RenderLogContext = createContext<string[][]>([]);
export default RenderLogContext;