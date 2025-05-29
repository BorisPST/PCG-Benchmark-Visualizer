import './App.css'
import React from 'react';
// import BattleHub from './components/BattleHub/BattleHub';
import ControlHub from './components/ControlHub/ControlHub'
import { emptyESGenerator, emptyGAGenerator, emptyRandomGenerator, type BattleSimulationData, type Content, type Control, type Generation, type Generator, type GeneratorConfig, type GeneratorResponseParsedData, type Individual, type ProblemConfig, type Scores } from './components/utils/type_utils';
import { Tabs, Tab, Box } from '@mui/material';
import Results from './components/Generators/Results';
import GeneratorDataContext from './contexts/GeneratorDataContext';
import { RunContext } from './contexts/RunContext';
import { generateBattles, getBattleSimulation, getIndividualsForGeneration, runGeneratorOnProblem } from './components/utils/server_requests';
import { BattleInspectorContext } from './contexts/BattleInspectorContext';
// import StatsHub from './components/StatsHub/StatsHub';
// import RenderLogContext from './contexts/RenderLogContext';

function App() {
  // const [battleData, setBattleData] = React.useState<Info[]>([]);
  // const [measurementData, setMeasurementData] = React.useState<MeasurementInfo[]>([]);
  const [tab, setTab] = React.useState(0);
  // const [renderLogs, setRenderLogs] = React.useState<string[][]>([]);

  const [randomGeneratorData, setRandomGeneratorData] = React.useState<Generator>(emptyRandomGenerator);
  const [evolutionaryStrategyData, setEvolutionaryStrategyData] = React.useState<Generator>(emptyESGenerator);
  const [geneticAlgorithmData, setGeneticAlgorithmData] = React.useState<Generator>(emptyGAGenerator);
  const [problemVariant, setProblemVariant] = React.useState<string>("");

  const [currentRun, setCurrentRun] = React.useState(0);
  const [runCompleted, setRunCompleted] = React.useState(false);
  const runContextValue = React.useMemo(
    () => ({
      currentRun,
      setCurrentRun,
      runCompleted,
      setRunCompleted
    }),
    [currentRun, runCompleted]
  );

  const [battleSimulationData, setBattleSimulationData] = React.useState<BattleSimulationData>({} as BattleSimulationData);
    
  const updateGeneratorData = (id: number, generations: Generation[], scores: Scores) => {
    switch (id) {
      case 0:
        setRandomGeneratorData({
          ...randomGeneratorData,
          generations: generations,
          scores: scores
        });
        break;
      case 1:
        setEvolutionaryStrategyData({
          ...evolutionaryStrategyData,
          generations: generations,
          scores: scores
        });
        break;
      case 2:
        setGeneticAlgorithmData({
          ...geneticAlgorithmData,
          generations: generations,
          scores: scores
        });
        break;
      default:
        throw new Error("Unknown generator type");
    }
  }

  const updateGenerationData = (generator: number, generation: number, individuals: Individual[]) => {
    switch (generator) {
      case 0:
        setRandomGeneratorData(prev => ({
          ...prev,
          generations: prev.generations.map(gen =>
            gen.id === generation ? { ...gen, individuals: individuals } : gen
          )
        }));
        break;
      case 1:
        setEvolutionaryStrategyData(prev => ({
          ...prev,
          generations: prev.generations.map(gen =>
            gen.id === generation ? { ...gen, individuals: individuals } : gen
          )
        }));
        break;
      case 2:
        setGeneticAlgorithmData(prev => ({
          ...prev,
          generations: prev.generations.map(gen =>
            gen.id === generation ? { ...gen, individuals: individuals } : gen
          )
        }));
        break;
      default:
        throw new Error("Unknown generator type");
      }
  }

  const runGenerator = async (generatorConfig: GeneratorConfig, problemConfig: ProblemConfig) => {
    setCurrentRun(cur => cur + 1);
    setRunCompleted(false);
    for (let i = 0; i < 3; i++) {
      generatorConfig.generator = i;
      const parsedResponse: GeneratorResponseParsedData | undefined = await runGeneratorOnProblem(generatorConfig, problemConfig);
      if (parsedResponse != undefined) {
        updateGeneratorData(parsedResponse.generator, parsedResponse.generations, parsedResponse.scores);
      }
    }
    setRunCompleted(true);
    setProblemVariant(problemConfig.variant);
  }

  const updateGeneratorConfig = (config: GeneratorConfig) => {
      setRandomGeneratorData(prev => ({
        ...prev,
        parameters: prev.parameters.map(param =>
          param.name === "Population Size"
            ? { ...param, value: config.population_size ?? param.value }
            : param
        )
      }));

      setEvolutionaryStrategyData(prev => ({
        ...prev,
        parameters: prev.parameters.map(param =>
          param.name === "Mu Size"
            ? { ...param, value: config.population_size ?? param.value }
            : param
        )
      }));

      setGeneticAlgorithmData(prev => ({
        ...prev,
        parameters: prev.parameters.map(param =>
          param.name === "Population Size"
            ? { ...param, value: config.population_size ?? param.value }
            : param
        )
      }));
  }

  const generationSelectedHandler = async (generation: Generation, generator: Generator) => {
    const individuals: Individual[] = await getIndividualsForGeneration(generator.id, generation.id);
    updateGenerationData(generator.id, generation.id, individuals);
  }

  const battleSelectedHandler = async (content: Content, control: Control) => {
    const simulationData = await getBattleSimulation(problemVariant, content, control);
    setBattleSimulationData({...simulationData});
    console.log("Battle Simulation Data:", simulationData);
  }

  return (
    <>
    <div className="app-content">
     <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          px: 2,
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, v) => setTab(v)}
          className="custom-tabs"
          sx={{ minHeight: 48 }}
          variant="standard"
          textColor="inherit"
          indicatorColor="secondary"
          centered={false}
          aria-label="Navigation Tabs"
        >
          <Tab label="Results" className="custom-tab" sx={{ minWidth: 120 }} />
          <Tab label="Information" className="custom-tab" sx={{ minWidth: 120 }} />
        </Tabs>
        <ControlHub onGenerateBattles={generateBattles} />
      </Box>
      {/* <RenderLogContext.Provider value={renderLogs}>
        <Box sx={{ width: '100%', height: "100%", mx: 'auto', mt: 1 }}>
          {tab === 0 && <BattleHub data={battleData} measurementData={measurementData} />}
          {tab === 1 && <StatsHub data={battleData} />}
        </Box>
      </RenderLogContext.Provider> */}
      <BattleInspectorContext.Provider value={battleSimulationData}>
        <RunContext.Provider value={runContextValue}>
          <GeneratorDataContext.Provider value={{generators: [randomGeneratorData, evolutionaryStrategyData, geneticAlgorithmData], setGeneratorConfig: updateGeneratorConfig}}>
              <Box sx={{ width: '100%', height: "100%", mx: 'auto', mt: 1 }}>
                  {tab === 0 && <Results 
                    onRunGenerator={runGenerator} 
                    onSelectGeneration={generationSelectedHandler} 
                    problemVaraint={problemVariant}
                    onSelectBattle={battleSelectedHandler}/>}
              </Box>
          </GeneratorDataContext.Provider>
        </RunContext.Provider>
      </BattleInspectorContext.Provider>
    </div>
    </>
  )
}

export default App
