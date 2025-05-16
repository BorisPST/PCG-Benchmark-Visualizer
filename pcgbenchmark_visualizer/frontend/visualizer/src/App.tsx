import './App.css'
import React from 'react';
import BattleHub from './components/BattleHub/BattleHub';
import ControlHub from './components/ControlHub/ControlHub'
import type { BattleData, Info } from './components/utils';
import { Tabs, Tab, Box } from '@mui/material';
import StatsHub from './components/StatsHub/StatsHub';

function App() {
  const [battleData, setBattleData] = React.useState<BattleData[]>([]);
  const [tab, setTab] = React.useState(0);

  const parseBattleData = (data: Info[]) => {
    const parsedData: BattleData[] = data.map((battle: Info) => {
      return {
        playerPokemon: {
          name: battle.player_pokemon.name,
          types: battle.player_pokemon.types,
          level: battle.player_pokemon.level,
          stats: battle.player_pokemon.stats,
          moves: battle.player_pokemon.moves,
          curentHP: battle.player_pokemon.curentHP
        },
        rivalPokemon: {
          name: battle.rival_pokemon.name,
          types: battle.rival_pokemon.types,
          level: battle.rival_pokemon.level,
          stats: battle.rival_pokemon.stats,
          moves: battle.rival_pokemon.moves,
          curentHP: battle.rival_pokemon.curentHP
        }
      }
    });

    setBattleData(parsedData);
  }

  const generateBattles = async () => {
    const r = await fetch(`http://localhost:8000/simulate?sample_size=${5}`);
    const data = await r.json();

    console.log(data["info"][0]);
    parseBattleData(data["info"]);
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
            {tab === 0 && <BattleHub data={battleData} />}
            {tab === 1 && <StatsHub data={battleData} />}
          </Box>
     </Box>
    </div>
    </>
  )
}

export default App
