import React, { useEffect } from "react";
import type { BattleData } from "../utils";
import { Grid, Typography, Box } from "@mui/material";
import "./StatsHub.css";

interface Props {
    data: BattleData[];
}

function StatsHub(props: Props) {
    const [data, setData] = React.useState<BattleData[]>([]);
    
    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <Box className="status-hub" sx={{ padding: 2 }}>
            <Grid container direction={"row"} alignItems="center" sx={{ display:"flex", flexDirection:"row", background: "", borderRadius: 1,  paddingLeft: "1rem", paddingY: 1, marginBottom: 1, width: "100%" }}>
                <Grid flex={1}><Typography align="left" fontWeight="bold">#</Typography></Grid>
                <Grid flex={3}><Typography align="center" fontWeight="bold">Quality</Typography></Grid>
                <Grid flex={3}><Typography align="center" fontWeight="bold">Controllability</Typography></Grid>
            </Grid>

            {data.map((battle, index) => (
                <Grid container direction={"row"} alignItems="center" sx={{ display:"flex", flexDirection:"row", background: "", borderRadius: 1, paddingY: 1, paddingLeft: "1rem",  marginBottom: 1, width: "100%" }}>
                    <Grid flex={1}><Typography align="left">{index + 1}</Typography></Grid>
                    <Grid flex={3}><Typography align="center">{battle.playerPokemon.name}</Typography></Grid>
                    <Grid flex={3}><Typography align="center">{battle.playerPokemon.level}</Typography></Grid>
                </Grid>
            ))}
        </Box>
    );
}

export default StatsHub;