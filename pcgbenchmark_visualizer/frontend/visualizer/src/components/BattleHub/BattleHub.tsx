import React, { useContext, useEffect } from "react";
import { type PokemonSprites, type BattleData, type Individual } from "../utils/type_utils";
import { Grid, Typography, Box, Avatar, Divider } from "@mui/material";
import "./BattleHub.css";
import { sprites } from "../utils/sprites";
import { motion } from "framer-motion";
import BattleInspector from "./BattleInspector/BattleInspector";
import RenderLogContext from "../../contexts/RenderLogContext";
import { getPokemonFromId } from "./battle_utils";

interface Props {
    individuals: Individual[];
}

function BattleHub(props: Props) {
    const [battleData, setBattleData] = React.useState<BattleData[]>([]);
    const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);
    const [battleInspection, setBattleInspection] = React.useState<BattleData | null>(null);
    const renderLogs: string[][] = useContext(RenderLogContext);

    useEffect(() => {
            const newBattleData: BattleData[] = props.individuals.map((individual, index) => ({
                id: index,
                playerPokemon: getPokemonFromId(individual.content.player_pokemon),
                rivalPokemon: getPokemonFromId(individual.content.rival_pokemon),
                player_level: individual.content.player_level,
                rival_level: individual.content.rival_level,
                winner: individual.winner,
                turns: individual.turns,
                surviving_hp_percentage: individual.surviving_hp_percentage,
                quality: individual.quality,
                controlability: individual.controlability,
                diversity: individual.diversity,
            }));
            setBattleData([...newBattleData]);
    }, [props.individuals]);

    const getSpritesForPokemon = (name: string) => {
        const res: PokemonSprites | undefined = sprites.find((sprite) => sprite.name === name);
        if (res) {
            return res;
        } else {
            return {
                name: "",
                front: "",
                back: "",
                icon: "",
                animated_icon: "",
            };
        }
    }

    // const getFrontSprite = (name: string) => {
    //     return getSpritesForPokemon(name).front;
    // }

    // const getBackSprite = (name: string) => {
    //     return getSpritesForPokemon(name).back;
    // }

    const getIconSprite = (name: string) => {
        return getSpritesForPokemon(name).icon;
    }

    const getAnimatedIconSprite = (name: string) => {
        return getSpritesForPokemon(name).animated_icon;
    }

    return (
        <Box className="battle-hub">
            {!battleInspection && (
                <>
                <Grid container sx={{ background: "", borderRadius: 1, paddingY: 1, marginBottom: 1, paddingLeft: "1rem", width: "100%" }} alignItems="center">
                    <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">#</Typography></Grid>
                    <Grid size = {{xs: 1}}>
                        <Box sx={{ position: "relative", margin: "0 auto" }}>
                                <Typography align="center" fontWeight="bold">Player</Typography>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        bgcolor: "#e53935",
                                        top: 5,
                                        left: 10,
                                        boxShadow: 1,
                                    }}
                                />
                            </Box>
                    </Grid>
                    <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Player lvl</Typography></Grid>
                    <Grid size = {{xs: 1}}>
                        <Box sx={{ position: "relative", margin: "0 auto" }}>
                                <Typography align="center" fontWeight="bold">Rival</Typography>
                                <Box
                                    sx={{
                                        position: "absolute",
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        bgcolor: "#1e88e5",
                                        top: 5,
                                        left: 10,
                                        boxShadow: 1,
                                    }}
                                />
                            </Box>
                    </Grid>
                    <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Rival lvl</Typography></Grid>
                    <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Winner</Typography></Grid>
                
                    <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Turns</Typography></Grid>
                    <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Surviving HP%</Typography></Grid>

                    <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Quality</Typography></Grid>
                    <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Controllability</Typography></Grid>
                    <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Diversity</Typography></Grid>
                </Grid>
                <Divider sx={{ marginBottom: 1, borderBottomWidth: 1, borderColor: 'white', width: "100%" }} />

                {battleData.map((battle, index) => (
                    <motion.div
                        key={index}
                        className="battle-row"
                        style={{ width: "100%", overflow: "hidden", position: "relative"}}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        onClick = {() => setBattleInspection(battle)}>
                        <motion.div
                            style={{
                            position: "absolute",
                            top: 0, left: 0, bottom: 0,
                            zIndex: -30,
                            width: hoveredRow === index ? "100%" : "0%",
                            background: "linear-gradient(90deg, #e3f2fd 0%, #bbdefb 100%)",
                            borderRadius: 8,
                            pointerEvents: "none"
                            }}
                            animate={{ width: hoveredRow === index ? "100%" : "0%" }}
                            transition={{ duration: 0.25, ease: "easeInOut", delay: hoveredRow === index ? 0.1 : 0}}
                        />
                        <Grid
                            container
                            key={index}
                            sx={{ background: "", borderRadius: 1, paddingY: 1, paddingLeft: "1rem", marginBottom: 1, width: "100%" }}
                            alignItems="center"
                        >
                            <Grid size = {{xs: 1}}><Typography align="center">{index + 1}</Typography></Grid>
                            <Grid size = {{xs: 1}}>
                                <Avatar
                                    alt={battle.playerPokemon}
                                    src={hoveredRow === index ? getAnimatedIconSprite(battle.playerPokemon) : getIconSprite(battle.playerPokemon)}
                                    sx={{ margin: "0 auto", '& img': {imageRendering: 'pixelated'} }}
                                />
                            </Grid>
                            <Grid size = {{xs: 1}}><Typography align="center">{battle.player_level}</Typography></Grid>
                            <Grid size = {{xs: 1}}>
                                <Avatar
                                    alt={battle.rivalPokemon}
                                    src={hoveredRow === index ? getAnimatedIconSprite(battle.rivalPokemon) : getIconSprite(battle.rivalPokemon)}
                                    sx={{ margin: "0 auto", '& img': {imageRendering: 'pixelated'}  }}
                                />
                            </Grid>
                            <Grid size = {{xs: 1}}><Typography align="center">{battle.rival_level}</Typography></Grid>
                            <Grid size={{ xs: 1 }}>
                                <Box sx={{ position: "relative", width: 40, height: 40, margin: "0 auto" }}>
                                    <Avatar
                                        alt={battle.winner === 0 ? battle.playerPokemon : battle.rivalPokemon}
                                        src={hoveredRow === index
                                            ? getAnimatedIconSprite(battle.winner === 0 ? battle.playerPokemon : battle.rivalPokemon)
                                            : getIconSprite(battle.winner === 0 ? battle.playerPokemon : battle.rivalPokemon)}
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            '& img': { imageRendering: 'pixelated' }
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            bgcolor: battle.winner === 0 ? "#e53935" : "#1e88e5",
                                            top: 0,
                                            left: battle.winner === 0 ? 0 : "unset",
                                            right: battle.winner === 0 ? "unset" : 0,
                                            boxShadow: 1,
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid size = {{xs: 1}}><Typography align="center">{battle.turns}</Typography></Grid>
                            <Grid size = {{xs: 1}}><Typography align="center">{(battle.surviving_hp_percentage * 100).toFixed(2)}%</Typography></Grid>
                            <Grid size = {{xs: 1}}><Typography align="center">{battle.quality.toFixed(2)}</Typography></Grid>
                            <Grid size = {{xs: 1}}><Typography align="center">{battle.controlability.toFixed(2)}</Typography></Grid>
                            <Grid size = {{xs: 1}}><Typography align="center">{battle.diversity.toFixed(2)}</Typography></Grid>
                        </Grid>
                    </motion.div>
                ))}
                </>
            )}

            {battleInspection && (
                <>
                    <BattleInspector onLeaveInspector={() => setBattleInspection(null)} battleData={battleInspection} renderLogs={renderLogs[battleData.findIndex(x => x == battleInspection)]}></BattleInspector>
                </>
            )}
        </Box>
    );
}

export default BattleHub;