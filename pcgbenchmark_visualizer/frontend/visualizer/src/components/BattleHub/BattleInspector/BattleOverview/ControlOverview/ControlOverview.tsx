import { Box, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useContext } from 'react';
import ControlSampleContext from '../../../../../contexts/ControlSampleContext';
import { getTypeFromId } from '../../../battle_utils';

function ControlOverview() {
    const control = useContext(ControlSampleContext);

    if (!control) {
        return <Box className="problem-overview">No problem data available</Box>;
    }

    const labels: Record<string, string> = {
        turns: "Turns",
        rival_pokemon_type: "Rival Type",
        first_move_trainer: "First Move Trainer",
    };

    const valueParser = (value: number, key: string): string => {
        if (key === "rival_pokemon_type") {
            return getTypeFromId(value) || "Unknown Type";
        } 
        if (key === "first_move_trainer") {
            return value === 0 ? "Player" : "Rival";
        }
        return value.toString();
    }

    return (
        <Paper
            elevation={3}
            sx={{
                borderRadius: 3,
                position: "relative",
                p: 2,
                pt: 4,
                background: "#232323",
                border: "2px solid #fff",
                display: "flex",
                flex: 2,
            }}
            className="quality-overview-paper"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: -20,
                    left: 24,
                    background: "#232323",
                    px: 2,
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 24,
                    borderRadius: "1rem 1rem 0 0",
                    borderBottom: "none",
                    zIndex: 2,
                }}
            >
                Sampled Control
            </Box>
            <Table size="small" sx={{ color: "#fff", height: "fit-content" }}>
                <TableBody>
                    {Object.entries(control).map(([key, value]) =>
                        value !== undefined && value !== null && key !== "variant" ? (
                            <TableRow key={key} >
                                <TableCell sx={{ color: "#bbb", border: "none", fontWeight: 600 }}>
                                    {labels[key] || key}
                                </TableCell>
                                <TableCell sx={{ color: "#fff", border: "none" }} className='battle-overview-value'>
                                    {valueParser(value, key)}
                                </TableCell>
                            </TableRow>
                        ) : null
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default ControlOverview;