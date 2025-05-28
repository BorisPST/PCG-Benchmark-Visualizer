import { createContext } from "react";
import { emptyESGenerator, emptyGAGenerator, emptyRandomGenerator, type Generator, type GeneratorConfig } from "../components/utils/type_utils";

interface GeneratorDataContextData {
    generators: Generator[];
    setGeneratorConfig: (config: GeneratorConfig) => void;
}

const GeneratorDataContext = createContext<GeneratorDataContextData>({
    generators: [emptyRandomGenerator, emptyESGenerator, emptyGAGenerator],
    setGeneratorConfig: (config: GeneratorConfig) => {
        console.log(config)
    }
});

export default GeneratorDataContext;