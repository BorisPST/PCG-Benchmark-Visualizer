import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import { defaultProblem, type Generator, type GeneratorConfig, type ProblemConfig } from '../utils/type_utils';
import GeneratorElement from './Generator/GeneratorElement';
import GeneratorDataContext from '../../contexts/GeneratorDataContext';
import GeneratorSettings from './GeneratorSettings/GeneratorSettings';
import ProblemSettings from './ProblemSettings/ProblemSettings';

interface Props {
  onSelect: (generator: Generator) => void;
  onRun: (generatorConfig: GeneratorConfig, problemConfig: ProblemConfig) => void;
  addProblemConfig: (problemConfig: ProblemConfig) => void;
}

export default function GeneratorList(props: Props) {
    const generatorData = useContext(GeneratorDataContext);
    const [generatorConfig, setGeneratorConfig] = React.useState<GeneratorConfig>({});
    const [problemConfig, setProblemConfig] = React.useState(defaultProblem);

    useEffect(() => {
        generatorData.setGeneratorConfig(generatorConfig);
    }, [generatorConfig])

    const handleProblemConfigChange = (config: ProblemConfig) => {
        setProblemConfig({...config});
        props.addProblemConfig(config);
    }

    return (
        <>
            <Box display="flex" gap={5} className="generator-list">
            {generatorData.generators.map(gen => (
                <GeneratorElement 
                    gen={gen} 
                    onSelect={() => props.onSelect(gen)} 
                    key={gen.id}
                    />
            ))}
            </Box>

            <GeneratorSettings 
                runGenerators={() => props.onRun(generatorConfig, problemConfig)}
                onGeneratorConfigChange={(config: GeneratorConfig) => setGeneratorConfig({...config})}
            ></GeneratorSettings>
            <ProblemSettings value={problemConfig} onChange={handleProblemConfigChange}></ProblemSettings>
        </>
    );
}