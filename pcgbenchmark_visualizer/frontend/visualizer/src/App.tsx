import './App.css'
import React from 'react';
import BattleHub from './components/BattleHub/BattleHub';
import ControlHub from './components/ControlHub/ControlHub'
import type { BattleData, Info } from './components/utils';

function App() {
  const [battleData, setBattleData] = React.useState<BattleData[]>([]);


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
      <BattleHub data={battleData}/>
    </div>
    </>
  )
}

export default App
