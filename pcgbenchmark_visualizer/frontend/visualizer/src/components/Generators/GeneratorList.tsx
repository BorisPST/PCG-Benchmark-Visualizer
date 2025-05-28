import React, { useContext, useEffect } from 'react';
import { Box } from '@mui/material';
import type { Generator, GeneratorConfig } from '../utils/type_utils';
import GeneratorElement from './Generator/GeneratorElement';
import GeneratorDataContext from '../../contexts/GeneratorDataContext';
import GeneratorSettings from './GeneratorSettings/GeneratorSettings';

interface Props {
  onSelect: (generator: Generator) => void;
  onRun: (config: GeneratorConfig) => void;
}

export default function GeneratorList(props: Props) {
    const [currentRun, setCurrentRun] = React.useState(0);
    const generatorData = useContext(GeneratorDataContext);
    const [generatorConfig, setGeneratorConfig] = React.useState<GeneratorConfig>({});

    useEffect(() => {
        generatorData.setGeneratorConfig(generatorConfig);
    }, [generatorConfig])

    useEffect(() => {
        if (currentRun > 0) {
            props.onRun(generatorConfig)
        }
    }, [currentRun]);

    return (
        <>
            <Box display="flex" gap={5} className="generator-list">
            {generatorData.generators.map(gen => (
                <GeneratorElement 
                    gen={gen} 
                    onSelect={() => props.onSelect(gen)} 
                    key={gen.id}
                    run={currentRun}
                    />
            ))}
            </Box>

            <GeneratorSettings 
            runGenerators={() => setCurrentRun(curr => curr + 1)}
            onGeneratorConfigChange={(config: GeneratorConfig) => setGeneratorConfig({...config})}
            ></GeneratorSettings>
        </>
    );
}