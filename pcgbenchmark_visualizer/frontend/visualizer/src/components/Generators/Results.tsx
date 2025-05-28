import React, { useState } from 'react';
import { Box, Breadcrumbs, Link } from '@mui/material';
import GeneratorList from './GeneratorList';
import GenerationList from './GenerationList';
import IndividualList from './IndividualList';
import "./Results.css"
import type { Generation, GeneratorConfig, Generator} from '../utils/type_utils';

interface Props {
  onRunGenerator: (generator: GeneratorConfig) => void;
}

function Results(props: Props) {
  const [selectedGenerator, setSelectedGenerator] = useState<Generator | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);

  const handleBreadcrumb = (level: 'root' | 'generator' | 'generation') => {
    if (level === 'root') {
      setSelectedGenerator(null);
      setSelectedGeneration(null);
    } else if (level === 'generator') {
      setSelectedGeneration(null);
    } else if (level === 'generation') {
        setSelectedGeneration(null);
    }
  };

  const onGeneratorSelected = (generator: Generator) => {
    setSelectedGenerator(generator);
    console.log("Selected Generator:", generator);
  }

  return (
    <Box sx={{ pl: 5}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3, color: 'white', fontSize: '1.2rem' }}>
        <Link underline="hover" color="white" onClick={() => handleBreadcrumb('root')} sx={{ cursor: 'pointer' }}>
          Generators
        </Link>
        {selectedGenerator && (
            <Link underline="hover" color="white" onClick={() => handleBreadcrumb('generator')} sx={{ cursor: 'pointer' }}>
                {selectedGenerator.name}
            </Link>
        )}
        {selectedGeneration && (
            <Link underline="hover" color="white" onClick={() => handleBreadcrumb('generation')} sx={{ cursor: 'pointer' }}>
                {selectedGeneration.id}
            </Link>
        )}
      </Breadcrumbs>

      {!selectedGenerator && (
        <GeneratorList onSelect={onGeneratorSelected} onRun={props.onRunGenerator}/>
      )}

      {selectedGenerator && !selectedGeneration && (
        <GenerationList
          generations={selectedGenerator.generations}
          onSelect={setSelectedGeneration}
        />
      )}

      {selectedGenerator && selectedGeneration && (
        <IndividualList individuals={selectedGeneration.individuals} />
      )}
    </Box>
  );
}

export default Results;