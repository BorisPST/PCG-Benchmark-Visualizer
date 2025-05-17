import './App.css'
import React from 'react';
import BattleHub from './components/BattleHub/BattleHub';
import ControlHub from './components/ControlHub/ControlHub'
import { type MeasurementInfo, type Info } from './components/utils/type_utils';
import { Tabs, Tab, Box } from '@mui/material';
import StatsHub from './components/StatsHub/StatsHub';

function App() {
  const [battleData, setBattleData] = React.useState<Info[]>([]);
  const [measurementData, setMeasurementData] = React.useState<MeasurementInfo[]>([]);
  const [tab, setTab] = React.useState(0);

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
    parseMeasurementInfo(data["details"]);
  }

  return (
    <>
    <div className="app-content">
      <ControlHub onGenerateBattles={generateBattles} />
      <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', mt: "2rem" }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Battles" sx={{width: "2rem"}}/>
            <Tab label="Stats" />
          </Tabs>
          <Box sx={{ }}>
            {tab === 0 && <BattleHub data={battleData} measurementData={measurementData} />}
            {tab === 1 && <StatsHub data={battleData} />}
          </Box>
     </Box>
    </div>
    </>
  )
}

export default App
