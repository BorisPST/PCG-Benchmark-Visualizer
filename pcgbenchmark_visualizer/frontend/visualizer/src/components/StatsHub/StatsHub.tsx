import React, { useEffect } from "react";
import type { Info } from "../utils/type_utils";
import { Grid, Typography, Box } from "@mui/material";
import "./StatsHub.css";

interface Props {
    data: Info[];
}

function StatsHub(props: Props) {
    const [data, setData] = React.useState<Info[]>([]);
    
    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    return (
        <Box className="status-hub" sx={{ padding: 2 }}>
            <Grid container direction={"row"} alignItems="center" sx={{ display:"flex", flexDirection:"row", background: "", borderRadius: 1,  paddingLeft: "1rem", paddingY: 1, marginBottom: 1, width: "100%" }}>
                <Grid flex={3}><Typography align="center" fontWeight="bold" fontSize={20}>Quality</Typography></Grid>
                <Grid flex={3}><Typography align="center" fontWeight="bold" fontSize={20}>Controlability</Typography></Grid>
                <Grid flex={3}><Typography align="center" fontWeight="bold" fontSize={20}>Diversity</Typography></Grid>
            </Grid>

            {data.map((battle, index) => (
                <Grid container direction={"row"} alignItems="center" sx={{ display:"flex", flexDirection:"row", background: "", borderRadius: 1, paddingY: 1, paddingLeft: "1rem",  marginBottom: 1, width: "100%" }}>
                    <Grid flex={3}><Typography align="center">{index + 1}</Typography></Grid>
                    <Grid flex={3}><Typography align="center">{battle.player_pokemon.name}</Typography></Grid>
                    <Grid flex={3}><Typography align="center">{battle.player_pokemon.level}</Typography></Grid>
                </Grid>
            ))}
        </Box>
    );
}

export default StatsHub;