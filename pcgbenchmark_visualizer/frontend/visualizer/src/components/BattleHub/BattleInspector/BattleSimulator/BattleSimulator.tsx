import React, { useEffect, useRef, useState } from "react";
import "./BattleSimulator.css";
import { sprites } from "../../../utils/sprites";
import { Box, CircularProgress, Grid, LinearProgress, Typography } from "@mui/material";
import { BattleInspectorContext } from "../../../../contexts/BattleInspectorContext";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

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
    const [logIndex, setLogIndex] = useState<number>(0);
    const [renderIndex, setRenderIndex] = useState<number>(0);
    const [turn, setTurn] = useState<number>(1);
    const [autoPlay, setAutoPlay] = useState<boolean>(false);
    const [typewriterText, setTypewriterText] = useState("");

    const [playerFlash, setPlayerFlash] = useState(false);
    const [enemyFlash, setEnemyFlash] = useState(false);

    const prevPlayerHP = useRef(playerHP);
    const prevEnemyHP = useRef(enemyHP);

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
    const playPlayerFaintedAnimation = () => playerHP == 0 && renderIndex == battleInspectorData.render.length - 1;
    const playEnemyFaintedAnimation = () => enemyHP == 0 && renderIndex == battleInspectorData.render.length - 1;

    const manuallySetTurn = (next: boolean) => {
        setAutoPlay(false);
        if (next) {
            // If can go next, increment
            if (logIndex < battleInspectorData.log.length - 1) {
                let newIndex = logIndex + 1;
                setLogIndex(curr => curr + 1);

                // Did the turn not change? Increment again.
                if (battleInspectorData.log[newIndex].turn <= turn && newIndex < battleInspectorData.log.length - 1) {
                    newIndex++;
                    setLogIndex(curr => curr + 1);
                }
            }
        } 
        
        else {
            // If can go back, decrement
            if (logIndex > 0) {
                let newIndex = logIndex - 1;
                setLogIndex(curr => curr - 1);
                const targetTurn = Math.max(1, turn - 1);

                // Find start of the turn
                while (newIndex > 0 && battleInspectorData.log[newIndex].turn >= targetTurn) {
                    newIndex--;
                    setLogIndex(curr => curr - 1);

                    if (battleInspectorData.log[newIndex].turn < targetTurn) {
                        newIndex++;
                        setLogIndex(curr => curr + 1);
                        break;
                    }
                }
            }
        }
    }

    const updateHPAfterManualTurnChange = () => {
        const currentLog = battleInspectorData.log[logIndex];
        
        // Ensure updates from previous log are reflected unless this is the first log
        if (logIndex > 0) {
            const previousLog = battleInspectorData.log[logIndex - 1];
            if (previousLog.attacker_trainer === 0) {
                setEnemyHP(previousLog.hp);
            } else {
                setPlayerHP(previousLog.hp);
            }
        } 

        // Otherwise it is the first turn and the attacker should have full hp
        else {
            if (currentLog.attacker_trainer === 0) {
                setPlayerHP(battleInspectorData.data.player_pokemon.stats.hp);
            }
            else (
                setEnemyHP(battleInspectorData.data.rival_pokemon.stats.hp)
            );
        }
    }

    const updateHPForTurn = () => {
        const currentLog = battleInspectorData.log[logIndex];
        if (!currentLog) return;

        // Update HP based on the attacker
        if (currentLog.attacker_trainer === 0) {
            setEnemyHP(currentLog.hp)
        }
        else (
            setPlayerHP(currentLog.hp)
        );
    }

    useEffect(() => {
        if (battleInspectorData.data != undefined) {
            setBattleReady(true);
            setLogIndex(0);
        }
    }, [battleInspectorData])

    useEffect(() => {
        if (props.endInspection) {
            setBattleReady(false);
        }
    }, [props.endInspection]);

    useEffect(() => {
        if (battleReady) {
            setTurn(battleInspectorData.log[logIndex].turn);
            updateHPForTurn();

            if (!autoPlay) {
                updateHPAfterManualTurnChange();
            }
            setRenderIndex(logIndex);

            if (logIndex == battleInspectorData.log.length - 1) {
                setAutoPlay(false);
                // Play the pokemon fainted text which is always after the last log
                setTimeout(() => {
                    if (logIndex == battleInspectorData.log.length - 1) {
                        setRenderIndex(battleInspectorData.render.length - 1);
                    }
                }, 2000);
            }
        }
    }, [logIndex])

    useEffect(() => {
        if (!autoPlay) return;

        if (logIndex >= battleInspectorData.log.length - 1) return;

        if (autoPlay && logIndex == 0) {
            updateHPForTurn();
        }

        const interval = setInterval(() => {
            setLogIndex(curr => {
                if (curr < battleInspectorData.log.length - 1) {
                    return curr + 1;
                } else {
                    return curr;
                }
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [autoPlay, logIndex, battleInspectorData.log]);

    useEffect(() => {
        if (playerHP < prevPlayerHP.current) {
            setPlayerFlash(true);
            setTimeout(() => setPlayerFlash(false), 600);
        }
        prevPlayerHP.current = playerHP;
    }, [playerHP]);

    useEffect(() => {
        if (enemyHP < prevEnemyHP.current) {
            setEnemyFlash(true);
            setTimeout(() => setEnemyFlash(false), 600);
        }
        prevEnemyHP.current = enemyHP;
    }, [enemyHP]);

    useEffect(() => {
        const fullText = battleInspectorData.render && battleInspectorData.render[renderIndex]
            ? battleInspectorData.render[renderIndex]
            : "";

        setTypewriterText("");

        if (!fullText) return;

        let i = 0;

        const interval = setInterval(() => {
            setTypewriterText(prev => {
                if (i < fullText.length) {
                    i++;
                    return fullText.slice(0, i);
                } else {
                    clearInterval(interval);
                    return prev;
                }
            });
        }, 18);
        return () => clearInterval(interval);

    }, [renderIndex, battleInspectorData.render]);

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
                    {autoPlay || renderIndex > 0
                        ? typewriterText
                        : "Rival Trainer sent out " + battleInspectorData.data.rival_pokemon.name}
                </div>

                <div className="pokemon-battle-sprite player-pokemon player-position">
                    <img src={playerPokemon} alt="" className={(playerFlash ? "sprite-flash" : "") + (playPlayerFaintedAnimation() ? " sprite-fainted" : "")} />
                </div>

                <div className="pokemon-battle-sprite enemy-pokemon enemy-position">
                    <img src={enemyPokemon} alt="" className={(enemyFlash ? "sprite-flash" : "") + (playEnemyFaintedAnimation() ? " sprite-fainted" : "")} />
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
        <Box className="turns-container">
            <ArrowBackIosNewIcon
                sx={{
                    cursor: logIndex > 0 ? "pointer" : "not-allowed",
                    color: logIndex > 0 ? "white" : "#888",
                    fontSize: 28
                }}
                onClick={() => logIndex > 0 && manuallySetTurn(false)}
                aria-label="Previous Turn"
            />

            <span style={{ minWidth: 80, textAlign: "center", color: "white", fontSize: 18 }}>
                Turn {battleInspectorData.log[logIndex].turn}
            </span>
            
            <ArrowForwardIosIcon
                sx={{
                    cursor: logIndex < battleInspectorData.log.length - 1 ? "pointer" : "not-allowed",
                    color: logIndex < battleInspectorData.log.length - 1 ? "white" : "#888",
                    fontSize: 28
                }}
                onClick={() => logIndex < battleInspectorData.log.length - 1 && manuallySetTurn(true)}
                aria-label="Next Turn"
         />
        </Box>

        <Box className="simulate-battle-button-container">
            {<div className="app-button-primary simulation-button" onClick={() => setAutoPlay(curr => !curr)}>
                {!autoPlay ? "Play" : "Pause"}
            </div>}
        </Box>
        </>
    );
}

export default BattleSimulator;