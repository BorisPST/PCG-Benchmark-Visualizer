import './App.css'
import React from 'react';
// import BattleHub from './components/BattleHub/BattleHub';
import ControlHub from './components/ControlHub/ControlHub'
import { type GeneratorConfig, type MeasurementInfo } from './components/utils/type_utils';
import { Tabs, Tab, Box } from '@mui/material';
import Results from './components/Generators/Results';
// import StatsHub from './components/StatsHub/StatsHub';
// import RenderLogContext from './contexts/RenderLogContext';

function App() {
  // const [battleData, setBattleData] = React.useState<Info[]>([]);
  // const [measurementData, setMeasurementData] = React.useState<MeasurementInfo[]>([]);
  const [tab, setTab] = React.useState(0);
  // const [renderLogs, setRenderLogs] = React.useState<string[][]>([]);

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

  const runGenerator = async (config: GeneratorConfig) => {
    try {
      const probConf = {variant: "pokemonbattle-v0"}
      const params = {
        generator_config: config,
        problem_config: probConf,
      }
      const response = await fetch('http://localhost:8000/run_generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      console.log("Generator run response:", data);
    } catch (error) {
      console.error("Error running generator:", error);
    }
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
      <Box sx={{ width: '100%', height: "100%", mx: 'auto', mt: 1 }}>
          {tab === 0 && <Results onRunGenerator={runGenerator}/>}
        </Box>
    </div>
    </>
  )
}

export default App
