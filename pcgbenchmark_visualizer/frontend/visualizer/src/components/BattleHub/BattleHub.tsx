import React, { useEffect } from "react";
import { type PokemonSprites, type Info, type MeasurementInfo, type PokemonData } from "../utils/type_utils";
import { Grid, Typography, Box, Avatar, Divider } from "@mui/material";
import "./BattleHub.css";
import { sprites } from "../utils/sprites";
import { motion } from "framer-motion";

interface Props {
    data: Info[];
    measurementData: MeasurementInfo[];
}

interface BattleData {
    playerPokemon: PokemonData;
    rivalPokemon: PokemonData;
    winner: number;
    turns: number;
    player_move_effectiveness: number;
    rival_move_effectiveness: number;
    surviving_pokemon_hp: number;
    quality: number;
    controllability: number;
    diversity: number;
}

function BattleHub(props: Props) {
    const [battleData, setBattleData] = React.useState<BattleData[]>([]);
    const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

    useEffect(() => {
        if (props.measurementData.length == props.data.length) {
            const newBattleData: BattleData[] = props.data.map((battle, index) => ({
                playerPokemon: battle.player_pokemon,
                rivalPokemon: battle.rival_pokemon,
                winner: battle.winner,
                turns: battle.turns,
                player_move_effectiveness: battle.player_move_effectiveness,
                rival_move_effectiveness: battle.rival_move_effectiveness,
                surviving_pokemon_hp: battle.surviving_pokemon_hp,
                quality: props.measurementData[index].quality,
                controllability: props.measurementData[index].controllability,
                diversity: props.measurementData[index].diversity,
            }));
            setBattleData([...newBattleData]);
        }
    }, [props.data, props.measurementData,]);

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
                <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Winner</Typography></Grid>
                <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Turns</Typography></Grid>
                <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Winner HP</Typography></Grid>
                <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Player AME</Typography></Grid>
                <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Rival AME</Typography></Grid>

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
                    onMouseLeave={() => setHoveredRow(null)}>
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
                        transition={{ duration: 0.2, ease: "easeInOut", delay: hoveredRow === index ? 0.2 : 0}}
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
                                alt={battle.playerPokemon.name}
                                src={hoveredRow === index ? getAnimatedIconSprite(battle.playerPokemon.name) : getIconSprite(battle.playerPokemon.name)}
                                sx={{ margin: "0 auto", '& img': {imageRendering: 'pixelated'} }}
                            />
                        </Grid>
                        <Grid size = {{xs: 1}}>
                            <Avatar
                                alt={battle.rivalPokemon.name}
                                src={hoveredRow === index ? getAnimatedIconSprite(battle.rivalPokemon.name) : getIconSprite(battle.rivalPokemon.name)}
                                sx={{ margin: "0 auto", '& img': {imageRendering: 'pixelated'}  }}
                            />
                        </Grid>
                        <Grid size={{ xs: 1 }}>
                            <Box sx={{ position: "relative", width: 40, height: 40, margin: "0 auto" }}>
                                <Avatar
                                    alt={battle.winner === 0 ? battle.playerPokemon.name : battle.rivalPokemon.name}
                                    src={hoveredRow === index
                                        ? getAnimatedIconSprite(battle.winner === 0 ? battle.playerPokemon.name : battle.rivalPokemon.name)
                                        : getIconSprite(battle.winner === 0 ? battle.playerPokemon.name : battle.rivalPokemon.name)}
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
                        <Grid size = {{xs: 1}}><Typography align="center">{battle.surviving_pokemon_hp}</Typography></Grid>
                        <Grid size = {{xs: 1}}><Typography align="center">{battle.player_move_effectiveness}</Typography></Grid>
                        <Grid size = {{xs: 1}}><Typography align="center">{battle.rival_move_effectiveness}</Typography></Grid>
                        <Grid size = {{xs: 1}}><Typography align="center">{battle.quality}</Typography></Grid>
                        <Grid size = {{xs: 1}}><Typography align="center">{battle.controllability}</Typography></Grid>
                        <Grid size = {{xs: 1}}><Typography align="center">{battle.diversity}</Typography></Grid>
                    </Grid>
                </motion.div>
            ))}
        </Box>
    );
}

export default BattleHub;