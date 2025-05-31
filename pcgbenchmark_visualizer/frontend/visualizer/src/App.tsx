import './App.css'
import React, { useEffect } from 'react';
// import BattleHub from './components/BattleHub/BattleHub';
import ControlHub from './components/ControlHub/ControlHub'
import { emptyESGenerator, emptyGAGenerator, emptyRandomGenerator, type Outcome, type BattleSimulationData, type Content, type Control, type Generation, type Generator, type GeneratorConfig, type GeneratorResponseParsedData, type Individual, type ProblemConfig, type Scores } from './components/utils/type_utils';
import { Tabs, Tab, Box } from '@mui/material';
import Results from './components/Generators/Results';
import GeneratorDataContext from './contexts/GeneratorDataContext';
import { RunContext } from './contexts/RunContext';
import { generateBattles, getAllProblemConfigs, getBattleSimulation, getIndividualsForGeneration, runGeneratorOnProblem } from './components/utils/server_requests';
import { BattleInspectorContext } from './contexts/BattleInspectorContext';
import ProblemConfigContext from './contexts/ProblemConfigContext';
import ControlSampleContext from './contexts/ControlSampleContext';
import { BattleScoresContext } from './contexts/BattleScoresContext';
import { getOutcomeData } from './components/utils/function_utils';
import BattleOutcomeContext from './contexts/BattleOutcomeContext';
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
  const [problemConfig, setProblemConfig] = React.useState<ProblemConfig>({} as ProblemConfig);
  const [currentControlSample, setCurrentControlSample] = React.useState<Control>({} as Control);
  const [allProblemConfigs, setAllProblemConfigs] = React.useState<ProblemConfig[]>([]);
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
  const [selectedBattleScores, setSelectedBattleScores] = React.useState<Scores>({ q_score: 0, c_score: 0, d_score: 0 });
  const [battleOutcome, setBattleOutcome] = React.useState<Outcome>({} as Outcome);

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

  const updateProblemConfig = (config: ProblemConfig) => {
    const defaultConfig = allProblemConfigs.find(c => c.variant === config.variant);
    if (defaultConfig) {
      setProblemConfig({...defaultConfig});
    } else {
      setProblemConfig({...config});
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
    updateProblemConfig(problemConfig);
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

  const battleSelectedHandler = async (content: Content, control: Control, scores: Scores) => {
    const simulationData = await getBattleSimulation(problemConfig.variant, content, control);
    setBattleSimulationData({...simulationData});
    setCurrentControlSample({...control});
    setSelectedBattleScores({...scores});

    const outcomeData = getOutcomeData(simulationData)
    setBattleOutcome({...outcomeData});
  }

  useEffect(() => {
    if (allProblemConfigs.length == 0) {
      getAllProblemConfigs().then((configs) => {
        setAllProblemConfigs(configs);
        if (configs.length > 0) {
          setProblemConfig(configs[0]);
        }
      }
      ).catch((error) => {
        console.error("Error fetching problem configurations:", error);
      }
      );      
    }
  }, [allProblemConfigs]);

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
      <BattleOutcomeContext.Provider value={battleOutcome}>
        <BattleScoresContext.Provider value={selectedBattleScores}>
          <ControlSampleContext.Provider value={currentControlSample}>
            <ProblemConfigContext.Provider value={problemConfig}>
              <BattleInspectorContext.Provider value={battleSimulationData}>
                <RunContext.Provider value={runContextValue}>
                  <GeneratorDataContext.Provider value={{generators: [randomGeneratorData, evolutionaryStrategyData, geneticAlgorithmData], setGeneratorConfig: updateGeneratorConfig}}>
                      <Box sx={{ width: '100%', height: "100%", mx: 'auto', mt: 1 }}>
                          {tab === 0 && <Results 
                            onRunGenerator={runGenerator} 
                            onSelectGeneration={generationSelectedHandler} 
                            problemVaraint={problemConfig.variant}
                            onSelectBattle={battleSelectedHandler}/>}
                      </Box>
                  </GeneratorDataContext.Provider>
                </RunContext.Provider>
              </BattleInspectorContext.Provider>
            </ProblemConfigContext.Provider>
          </ControlSampleContext.Provider>
        </BattleScoresContext.Provider>
      </BattleOutcomeContext.Provider>
    </div>
    </>
  )
}

export default App
