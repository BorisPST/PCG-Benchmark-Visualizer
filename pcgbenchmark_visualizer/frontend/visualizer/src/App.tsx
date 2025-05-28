import './App.css'
import React from 'react';
// import BattleHub from './components/BattleHub/BattleHub';
import ControlHub from './components/ControlHub/ControlHub'
import { emptyESGenerator, emptyGAGenerator, emptyRandomGenerator, type Generation, type Generator, type GeneratorConfig, type GeneratorServerResponse, type MeasurementInfo, type Scores } from './components/utils/type_utils';
import { Tabs, Tab, Box } from '@mui/material';
import Results from './components/Generators/Results';
import { parseGenerationData, parseGeneratorScoreData } from './components/utils/function_utils';
import GeneratorDataContext from './contexts/GeneratorDataContext';
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

  const parseMeasurementInfo = (data: {quality: number[], controlability: number[], diversity: number[]}) => {
    const measurementInfo: MeasurementInfo[] = [];
    for (let i = 0; i < data.quality.length; i++) {

      measurementInfo.push({
        quality: Number(data.quality[i].toFixed(2)),
        controllability: Number(data.controlability[i].toFixed(2)),
        diversity: Number(data.diversity[i].toFixed(2)),
      });
    }
    console.log(measurementInfo); 
    // setMeasurementData([...measurementInfo]);
  }

  const generateBattles = async () => {
    const response = await fetch(`http://localhost:8000/simulate?sample_size=${5}&sample_with_control=${true}`);
    const data = await response.json();

    console.log(data["details"]);
    // setBattleData(data["info"]);
    // setRenderLogs(data["render"]);
    parseMeasurementInfo(data["details"]);
  }

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

  const runGenerator = async (config: GeneratorConfig) => {
    try {
      const probConf = {variant: "pokemonbattle-v0"}
      const params = {
        generator_config: config,
        problem_config: probConf,
      }


      for (let i = 0; i < 3; i++) {
        params.generator_config.generator = i; // 0: Random, 1: Evolutionary Strategy, 2: Genetic Algorithm
        const response = await fetch('http://localhost:8000/run_generator', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        });

        const data = await response.json();
        const raw_scores = data["final_score"];
        const raw_generations = data["generations"];

        const responseData: GeneratorServerResponse = {
          scores: raw_scores,
          generations: raw_generations
        }

        const generations = parseGenerationData(responseData);
        const scores = parseGeneratorScoreData(responseData);
        updateGeneratorData(config.generator ?? 0, generations, scores);
      }
    } catch (error) {
      console.error("Error running generator:", error);
    }
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
      <GeneratorDataContext.Provider value={{generators: [randomGeneratorData, evolutionaryStrategyData, geneticAlgorithmData], setGeneratorConfig: updateGeneratorConfig}}>
          <Box sx={{ width: '100%', height: "100%", mx: 'auto', mt: 1 }}>
              {tab === 0 && <Results onRunGenerator={runGenerator}/>}
          </Box>
      </GeneratorDataContext.Provider>
    </div>
    </>
  )
}

export default App
