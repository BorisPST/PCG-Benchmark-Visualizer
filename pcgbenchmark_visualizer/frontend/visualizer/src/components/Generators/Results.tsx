import React, { useContext, useEffect, useState } from 'react';
import { Box, Breadcrumbs, Link } from '@mui/material';
import GeneratorList from './GeneratorList';
import GenerationList from './GenerationList';
import "./Results.css"
import type { Generation, GeneratorConfig, Generator, ProblemConfig, Content, Control, Individual, Scores} from '../utils/type_utils';
import GeneratorDataContext from '../../contexts/GeneratorDataContext';
import BattleHub from '../BattleHub/BattleHub';

interface Props {
  onRunGenerator: (generatorConfig: GeneratorConfig, problemConfig: ProblemConfig) => void;
  onSelectGeneration: (generation: Generation, generator: Generator) => void;
  onSelectBattle: (content: Content, control: Control, scores: Scores) => void;
  problemVaraint: string;
}

function Results(props: Props) {
  const generatorData = useContext(GeneratorDataContext);
  const [selectedGenerator, setSelectedGenerator] = useState<Generator | null>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<Generation | null>(null);
  const [selectedIndividual, setSelectedIndividual] = useState<Individual | null>(null);

  const handleBreadcrumb = (level: 'root' | 'generator' | 'generation' | 'individual') => {
    if (level === 'root') {
      setSelectedGenerator(null);
      setSelectedGeneration(null);
      setSelectedIndividual(null);
    } else if (level === 'generator') {
      setSelectedGeneration(null);
      setSelectedIndividual(null);
    } else if (level === 'generation') {
      setSelectedIndividual(null);
    }
  };

  const onGeneratorSelected = (generator: Generator) => {
    setSelectedGenerator(generator);
  }

  const onGenerationSelected = (generation: Generation) => {
    setSelectedGeneration(generation);
    if (selectedGenerator != null) {
      props.onSelectGeneration(generation, selectedGenerator);
    }
  }

  const onIndividualSelected = (individual: Individual) => {
    setSelectedIndividual(individual);
    const scores: Scores = {
      q_score: individual.quality,
      c_score: individual.controlability,
      d_score: individual.diversity
    };
    
    props.onSelectBattle(individual.content, individual.control, scores);
  };

  useEffect(() => {
    for (const generator of generatorData.generators) {
      if (generator.id == selectedGenerator?.id) {

        const generation = generator.generations.find(gen => gen.id === selectedGeneration?.id);
        if (generation) {
          setSelectedGeneration({...generation});
        }

      }
    }
  }, [generatorData.generators])

  return (
    <Box sx={{ pl: 5}}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3, color: 'white', fontSize: '1.2rem' }}>
        <Link underline="hover" color="white" onClick={() => handleBreadcrumb('root')} sx={{ cursor: 'pointer' }}>
          Generators
        </Link>
        {selectedGenerator && (
            <Link underline="hover" color="white" onClick={() => handleBreadcrumb('generator')} sx={{ cursor: 'pointer' }}>
                {selectedGenerator.name} ({props.problemVaraint})
            </Link>
        )}
        {selectedGeneration && (
            <Link underline="hover" color="white" onClick={() => handleBreadcrumb('generation')} sx={{ cursor: 'pointer' }}>
                Gen#{selectedGeneration.id} (Random 10 individuals)
            </Link>
        )}
        {selectedIndividual && (
          <Link underline="hover" color="white" onClick={() => handleBreadcrumb('individual')} sx={{ cursor: 'pointer' }}>
            Battle
          </Link>
        )}
      </Breadcrumbs>

      {!selectedGenerator && (
        <GeneratorList onSelect={onGeneratorSelected} onRun={props.onRunGenerator}/>
      )}

      {selectedGenerator && !selectedGeneration && (
        <GenerationList
          generations={selectedGenerator.generations}
          onSelect={onGenerationSelected}
        />
      )}

      {selectedGenerator && selectedGeneration && (
        <BattleHub individuals={selectedGeneration.individuals} onBattleSelected={onIndividualSelected} battleSimulationActive={selectedIndividual != null}/>
      )}
    </Box>
  );
}

export default Results;