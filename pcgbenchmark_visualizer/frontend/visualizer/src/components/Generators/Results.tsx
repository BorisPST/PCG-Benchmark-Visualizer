import React, { useState } from 'react';
import { Box, Breadcrumbs, Link } from '@mui/material';
import GeneratorList from './GeneratorList';
import GenerationList from './GenerationList';
import IndividualList from './IndividualList';
import "./Results.css"
import type { GeneratorConfig } from '../utils/type_utils';

interface Props {
  onRunGenerator: (generator: GeneratorConfig) => void;
}

type Individual = string;
type Scores = { quality: number; controlability: number; diversity: number };
export type Generation = { id: number; individuals: Individual[]; scores: Scores };
export type Generator = { id: number; name: string; generations: Generation[], parameters: string[], scores?: Scores };

const generators: Generator[] = [
  { id: 1, name: 'Random', generations: [], parameters: ['Population Size: 100', ""] },

  { id: 2, name: 'Evolutionary Strategy', generations: [], parameters: ['Mu Size: 100', 'Lambda Size: 100', 'Mutation Rate: 0.05'] },

  { id: 3, name: 'Genetic Algorithm', generations: [], parameters: ['Population Size: 100', "Tournament Size: 7", "Cross Rate: 0.5", "Mutation Rate: 0.05", "Elitism %: 10% "] }
];

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

  const generateConfig = (generator: Generator): GeneratorConfig => {
    let id = 0

    switch (generator.name) {
      case 'Random':
        id = 0;
        break;
      case 'Evolutionary Strategy':
        id = 1;
        break;
      case 'Genetic Algorithm':
        id = 2;
        break;
      default:
        throw new Error("Unknown generator type");
    }

    return {
      generator: id,
    };

  }

  const onRunGenerator = (generator: Generator) => {
    console.log("Running Generator:", generator);
    const config = generateConfig(generator);
    props.onRunGenerator(config);
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
        <GeneratorList generators={generators} onSelect={onGeneratorSelected} onRun={onRunGenerator}/>
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