import React, { useEffect } from "react";
import { type Info, type MeasurementInfo, type PokemonData } from "../utils";
import { Grid, Typography, Box } from "@mui/material";
import "./BattleHub.css";

interface Props {
    data: Info[];
    measurementData: MeasurementInfo[];
}

interface BattleData {
    playerPokemon: PokemonData;
    rivalPokemon: PokemonData;
    winner: number;
    quality: number;
    controllability: number;
    diversity: number;
}

function BattleHub(props: Props) {
    const [battleData, setBattleData] = React.useState<BattleData[]>([]);

    useEffect(() => {
        if (props.measurementData.length == props.data.length) {
            const newBattleData: BattleData[] = props.data.map((battle, index) => ({
                playerPokemon: battle.player_pokemon,
                rivalPokemon: battle.rival_pokemon,
                winner: battle.winner,
                quality: props.measurementData[index].quality,
                controllability: props.measurementData[index].controllability,
                diversity: props.measurementData[index].diversity,
            }));
            setBattleData([...newBattleData]);
        }
    }, [props.data, props.measurementData,]);

    return (
        <Box className="battle-hub" sx={{ padding: 2 }}>
            <Grid container sx={{ background: "", borderRadius: 1, paddingY: 1, marginBottom: 1, paddingLeft: "1rem", width: "100%" }} alignItems="center">
                <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">#</Typography></Grid>
                <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Player</Typography></Grid>
                <Grid size = {{xs: 1}}><Typography align="center" fontWeight="bold">Rival</Typography></Grid>
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">Winner</Typography></Grid>
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">Quality</Typography></Grid>
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">Controllability</Typography></Grid>
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">Diversity</Typography></Grid>
            </Grid>

            {battleData.map((battle, index) => (
                <Grid container key={index} sx={{ background: "", borderRadius: 1, paddingY: 1, paddingLeft: "1rem", marginBottom: 1, width: "100%" }} alignItems="center">
                    <Grid size = {{xs: 1}}><Typography align="center">{index + 1}</Typography></Grid>
                    <Grid size = {{xs: 1}}><Typography align="center">{battle.playerPokemon.name}</Typography></Grid>
                    <Grid size = {{xs: 1}}><Typography align="center">{battle.rivalPokemon.name}</Typography></Grid>
                    <Grid size = {{xs: 2}}><Typography align="center" color={battle.winner === 1 ? "primary" : "secondary"}>
                        {battle.winner === 1 ? "Player" : "Rival"}
                    </Typography></Grid>
                    <Grid size = {{xs: 2}}><Typography align="center">{battle.quality}</Typography></Grid>
                    <Grid size = {{xs: 2}}><Typography align="center">{battle.controllability}</Typography></Grid>
                    <Grid size = {{xs: 2}}><Typography align="center">{battle.diversity}</Typography></Grid>
                </Grid>
            ))}
        </Box>
    );
}

export default BattleHub;