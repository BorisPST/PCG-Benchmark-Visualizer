import React, { useEffect } from "react";
import type { BattleData } from "../utils";
import { Grid, Typography, Divider, Box } from "@mui/material";
import "./BattleHub.css";

interface Props {
    data: BattleData[];
}

function BattleHub(props: Props) {
    const [data, setData] = React.useState<BattleData[]>([]);
    
    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <Box className="battle-hub" sx={{ padding: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Battles
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            <Grid container sx={{ background: "", borderRadius: 1, paddingY: 1, marginBottom: 1, width: "100%" }} alignItems="center">
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">#</Typography></Grid>
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">Player</Typography></Grid>
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">P. Level</Typography></Grid>
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">Rival</Typography></Grid>
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">R. Level</Typography></Grid>
                <Grid size = {{xs: 2}}><Typography align="center" fontWeight="bold">Winner</Typography></Grid>
            </Grid>

            {data.map((battle, index) => (
                <Grid container key={index} sx={{ background: "", borderRadius: 1, paddingY: 1, marginBottom: 1, width: "100%" }} alignItems="center">
                    <Grid size = {{xs: 2}}><Typography align="center">{index + 1}</Typography></Grid>
                    <Grid size = {{xs: 2}}><Typography align="center">{battle.playerPokemon.name}</Typography></Grid>
                    <Grid size = {{xs: 2}}><Typography align="center">{battle.playerPokemon.level}</Typography></Grid>
                    <Grid size = {{xs: 2}}><Typography align="center">{battle.rivalPokemon.name}</Typography></Grid>
                    <Grid size = {{xs: 2}}><Typography align="center">{battle.rivalPokemon.level}</Typography></Grid>
                    {/* <Grid size = {{xs: 2}}>
                        <Typography align="center" color={battle.winner === "player" ? "primary" : "secondary"}>
                            {battle.winner === "player" ? "Player" : "Rival"}
                        </Typography>
                    </Grid> */}
                </Grid>
            ))}
        </Box>
    );
}

export default BattleHub;