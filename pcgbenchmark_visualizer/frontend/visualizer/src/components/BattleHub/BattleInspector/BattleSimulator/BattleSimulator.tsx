import React, { useEffect, useState } from "react";
import "./BattleSimulator.css";
import { sprites } from "../../../utils/sprites";
import { Box, CircularProgress, Grid, LinearProgress, Typography } from "@mui/material";
import { BattleInspectorContext } from "../../../../contexts/BattleInspectorContext";

interface Props {
    endInspection: boolean;
}

function BattleSimulator(props: Props) {
    const battleInspectorData = React.useContext(BattleInspectorContext);
    const [playerPokemon, setPlayerPokemon] = useState<string>("");
    const [enemyPokemon, setEnemyPokemon] = useState<string>("");
    
    const [playerHP, setPlayerHP] = useState<number>(0);
    const [enemyHP, setEnemyHP] = useState<number>(0);

    const [battleReady, setBattleReady] = useState<boolean>(false);
    console.log("Battle Inspector Data: ", battleInspectorData);

    useEffect(() => {
        if (battleInspectorData.data != undefined && battleInspectorData.log.length > 0) {
            
            const playerSprite = sprites.find(sprite => sprite.name === battleInspectorData.data.player_pokemon.name);
            const enemySprite = sprites.find(sprite => sprite.name === battleInspectorData.data.rival_pokemon.name);

            if (!playerSprite || !enemySprite) return;

            setPlayerPokemon(playerSprite?.back);
            setEnemyPokemon(enemySprite?.front);

            setPlayerHP(battleInspectorData.data.player_pokemon.stats.hp);
            setEnemyHP(battleInspectorData.data.rival_pokemon.stats.hp);
        }
    }, [battleInspectorData]);

    const playerHPPercent = () => Math.max(0, Math.round((playerHP / battleInspectorData.data.player_pokemon.stats.hp) * 100));
    const enemyHPPercent = () => Math.max(0, Math.round((enemyHP / battleInspectorData.data.rival_pokemon.stats.hp) * 100));


    useEffect(() => {
        if (battleInspectorData.data != undefined) {
            setBattleReady(true);
        }
    }, [battleInspectorData])

    useEffect(() => {
        if (props.endInspection) {
            setBattleReady(false);
        }
    }, [props.endInspection]);

    if (!battleReady) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                <Typography variant="h6" color="white">Loading Battle...</Typography>
                <CircularProgress className="generator-progress"></CircularProgress>
            </Box>
        );
    }

    return (
        <>
        <div className="battle-simulator">
            <div className="battle-background">
                <div className="battle-floor-element player-position"/>
                <div className="battle-floor-element enemy-position enemy-floor"/>
                <div className="log-container"/>
                <div className="log-text">
                    {battleInspectorData.render[0]}
                </div>

                <div className="pokemon-battle-sprite player-pokemon player-position">
                    <img src={playerPokemon} alt="" />
                </div>

                 <div className="pokemon-battle-sprite enemy-pokemon enemy-position">
                    <img src={enemyPokemon} alt="" />
                </div>

                <Box className="pokemon-information player-pokemon-information">
                    <Grid container direction="row" alignItems="center" justifyContent="space-between">
                        <Typography className="pokemon-name" sx={{marginLeft: "0.6rem", fontSize: 18}}>
                            {battleInspectorData.data.player_pokemon.name}
                        </Typography>
                        <Typography className="pokemon-level"  sx={{marginRight: "0.6rem", fontSize: 18}} >
                            <span style={{marginRight: "1px"}}>Lv</span>{battleInspectorData.data.player_pokemon.level}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" alignItems="center" justifyContent="right">
                        <span style={{marginRight: "5px"}}>HP</span>
                        <LinearProgress
                            variant="determinate"
                            value={playerHPPercent()}
                            sx={{
                                height: 10,
                                width: "70%",
                                borderRadius: 5,
                                backgroundColor: "#333",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: playerHPPercent() > 50 ? "#4caf50" : playerHPPercent() > 20 ? "#ffeb3b" : "#f44336"
                                }
                            }}
                        />
                    </Grid>
                    <Typography sx={{fontSize: 15, ml: 6 }}>
                        {playerHP} / {battleInspectorData.data.player_pokemon.stats.hp}
                    </Typography>
                </Box>

                <Box className="pokemon-information enemy-pokemon-information">
                    <Grid container direction="row" alignItems="center" justifyContent="space-between">
                        <Typography className="pokemon-name" sx={{marginLeft: "0.6rem", fontSize: 18}}>
                            {battleInspectorData.data.rival_pokemon.name}
                        </Typography>
                        <Typography className="pokemon-level"  sx={{marginRight: "0.6rem", fontSize: 18}} >
                            <span style={{marginRight: "1px"}}>Lv</span>{battleInspectorData.data.rival_pokemon.level}
                        </Typography>
                    </Grid>
                    <Grid container direction="row" alignItems="center" justifyContent="right" >
                        <span style={{marginRight: "5px"}}>HP</span>
                        <LinearProgress
                            variant="determinate"
                            value={enemyHPPercent()}
                            sx={{
                                height: 10,
                                width: "70%",
                                borderRadius: 5,
                                backgroundColor: "#333",
                                "& .MuiLinearProgress-bar": {
                                    backgroundColor: enemyHPPercent() > 50 ? "#4caf50" : enemyHPPercent() > 20 ? "#ffeb3b" : "#f44336"
                                }
                            }}
                        />
                    </Grid>
                    <Typography sx={{fontSize: 15, ml: 6 }}>
                        {enemyHP} / {battleInspectorData.data.rival_pokemon.stats.hp}
                    </Typography>
                </Box>
            </div>
        </div>
        <div className="turns-container">
            Turn {battleInspectorData.log[0].turn}
        </div>
        </>
    );
}

export default BattleSimulator;