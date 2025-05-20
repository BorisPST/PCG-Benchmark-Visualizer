import './App.css'
import React from 'react';
import BattleHub from './components/BattleHub/BattleHub';
import ControlHub from './components/ControlHub/ControlHub'
import { type MeasurementInfo, type Info } from './components/utils/type_utils';
import { Tabs, Tab, Box } from '@mui/material';
import StatsHub from './components/StatsHub/StatsHub';
import RenderLogContext from './contexts/RenderLogContext';

function App() {
  const [battleData, setBattleData] = React.useState<Info[]>([]);
  const [measurementData, setMeasurementData] = React.useState<MeasurementInfo[]>([]);
  const [tab, setTab] = React.useState(0);
  const [renderLogs, setRenderLogs] = React.useState<string[][]>([]);

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
    setMeasurementData([...measurementInfo]);
  }

  const generateBattles = async () => {
    const r = await fetch(`http://localhost:8000/simulate?sample_size=${5}&sample_with_control=${true}`);
    const data = await r.json();

    console.log(data["details"]);
    setBattleData(data["info"]);
    setRenderLogs(data["render"]);
    parseMeasurementInfo(data["details"]);
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
          <Tab label="Battles" className="custom-tab" sx={{ minWidth: 120 }} />
          <Tab label="Stats" className="custom-tab" sx={{ minWidth: 120 }} />
        </Tabs>
        <ControlHub onGenerateBattles={generateBattles} />
      </Box>
      <RenderLogContext.Provider value={renderLogs}>
        <Box sx={{ width: '100%', height: "100%", mx: 'auto', mt: 1 }}>
          {tab === 0 && <BattleHub data={battleData} measurementData={measurementData} />}
          {tab === 1 && <StatsHub data={battleData} />}
        </Box>
      </RenderLogContext.Provider>
    </div>
    </>
  )
}

export default App
