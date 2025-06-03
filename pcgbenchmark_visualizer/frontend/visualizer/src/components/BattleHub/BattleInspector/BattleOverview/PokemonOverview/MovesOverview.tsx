import { Box, Grid, Paper, Typography } from "@mui/material";
import type { MoveData } from "../../../../utils/type_utils";
import { getColorForType } from "../../../battle_utils";

interface Props {
    move: MoveData,
    i: number;
    stretch?: boolean;
}

function MovesOverview(props: Props) {
    const getMoveCategory = (value: number) => {
        switch (value) {
            case 0: return "Physical";
            case 1: return "Special";
            case 2: return "Status";
        }
    }

    return (
        <Grid size={6} key={props.i}>
            {props.move ? (
                <Paper
                    sx={{
                        p: 1,
                        background: getColorForType(props.move.type),
                        borderRadius: 2,
                        color: "#fff",
                        minHeight: 48,
                        height: props.stretch ? "100%" : "auto",
                    }}
                    elevation={1}
                >
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                        <Typography fontWeight="bold" fontSize={16}>
                            {props.move.name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, alignItems: "center", mt: 0.5 }}>
                        <Typography fontSize={12} >
                            {props.move.power ? `Power: ${props.move.power}` : ""}
                        </Typography>
                        <Typography fontSize={12}>
                            {getMoveCategory(props.move.category)}
                        </Typography>
                    </Box>
                </Paper>
            ) : (
                <Paper
                    sx={{
                        p: 1,
                        background: "#222",
                        borderRadius: 2,
                        color: "#888",
                        minHeight: 48,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    elevation={0}
                >
                    Empty
                </Paper>
            )}
        </Grid>
    );
}

export default MovesOverview;