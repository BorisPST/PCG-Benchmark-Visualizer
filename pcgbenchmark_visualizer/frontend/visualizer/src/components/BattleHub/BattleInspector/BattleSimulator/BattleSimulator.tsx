import React, { useEffect, useState } from "react";
import "./BattleSimulator.css";
import type { LogEntry, PokemonData } from "../../../utils/type_utils";
import { sprites } from "../../../utils/sprites";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";

interface Props {
    log: LogEntry[];
    player_pokemon: PokemonData;
    rival_pokemon: PokemonData;
    renderLogs: string[];
}

function BattleSimulator(props: Props) {
    const [playerPokemon, setPlayerPokemon] = useState<string>("");
    const [enemyPokemon, setEnemyPokemon] = useState<string>("");
    
    const [playerHP, setPlayerHP] = useState<number>(props.player_pokemon.stats.hp);
    const [enemyHP, setEnemyHP] = useState<number>(props.rival_pokemon.stats.hp);

    useEffect(() => {
        if (props.log.length > 0) {
            
            const playerSprite = sprites.find(sprite => sprite.name === props.player_pokemon.name);
            const enemySprite = sprites.find(sprite => sprite.name === props.rival_pokemon.name);

            if (!playerSprite || !enemySprite) return;

            setPlayerPokemon(playerSprite?.back);
            setEnemyPokemon(enemySprite?.front);

            setPlayerHP(props.player_pokemon.stats.hp);
            setEnemyHP(props.rival_pokemon.stats.hp);
        }
    }, [props.log, props.player_pokemon, props.rival_pokemon]);

    const playerHPPercent = () => Math.max(0, Math.round((playerHP / props.player_pokemon.stats.hp) * 100));
    const enemyHPPercent = () => Math.max(0, Math.round((enemyHP / props.rival_pokemon.stats.hp) * 100));

    return (
        <>
        <div className="battle-simulator">
            <div className="battle-background">
                <div className="battle-floor-element player-position"/>
                <div className="battle-floor-element enemy-position enemy-floor"/>
                <div className="log-container"/>
                <div className="log-text">
                    {props.renderLogs[0]}
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
                            {props.player_pokemon.name}
                        </Typography>
                        <Typography className="pokemon-level"  sx={{marginRight: "0.6rem", fontSize: 18}} >
                            <span style={{marginRight: "1px"}}>Lv</span>{props.player_pokemon.level}
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
                        {playerHP} / {props.player_pokemon.stats.hp}
                    </Typography>
                </Box>

                <Box className="pokemon-information enemy-pokemon-information">
                    <Grid container direction="row" alignItems="center" justifyContent="space-between">
                        <Typography className="pokemon-name" sx={{marginLeft: "0.6rem", fontSize: 18}}>
                            {props.rival_pokemon.name}
                        </Typography>
                        <Typography className="pokemon-level"  sx={{marginRight: "0.6rem", fontSize: 18}} >
                            <span style={{marginRight: "1px"}}>Lv</span>{props.rival_pokemon.level}
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
                        {enemyHP} / {props.rival_pokemon.stats.hp}
                    </Typography>
                </Box>
            </div>
        </div>
        <div className="turns-container">
            Turn {props.log[0].turn}
        </div>
        </>
    );
}

export default BattleSimulator;