import React from 'react';
import { Box } from '@mui/material';
import type { Generator } from '../utils/type_utils';
import GeneratorElement from './Generator/GeneratorElement';

interface Props {
  generators: Generator[];
  onSelect: (generator: Generator) => void;
  onRun: (generator: Generator) => void;
}

export default function GeneratorList(props: Props) {
  return (
    <>
        <Box display="flex" gap={5} className="generator-list">
        {props.generators.map(gen => (
            <GeneratorElement 
                gen={gen} 
                onSelect={() => props.onSelect(gen)} 
                key={gen.id}
                onRun={() => props.onRun(gen)}
                />
        ))}
        </Box>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                
        </Box>
    </>
  );
}