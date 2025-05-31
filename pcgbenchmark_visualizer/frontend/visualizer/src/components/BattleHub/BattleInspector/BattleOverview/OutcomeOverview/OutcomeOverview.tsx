import { Box, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { BattleInspectorContext } from '../../../../../contexts/BattleInspectorContext';

function OutcomeOverview() {
    const outcomes = useContext(BattleInspectorContext);
    const [relevantOutcomes, setRelevantOutcomes] = React.useState<Record<string, string>>({});
    
    useEffect(() => {
        if (outcomes.data) {
            const winner = outcomes.data.winner == 0 ? "Player" : "Rival";
            const turns = outcomes.data.turns || 0;
            const surviving_pokemon_hp_percentage = (outcomes.data.surviving_pokemon_hp_percentage * 100).toFixed() || 0;
            const first_move_trainer = outcomes.data.first_move === 0 ? "Player" : "Rival";
            const rival_battle_strategy = outcomes.data.rival_battle_strategy == 0 ? "Random" : "Greedy";

            setRelevantOutcomes({
                turns: turns.toString(),
                first_move_trainer: first_move_trainer,
                winner: winner,
                surviving_pokemon_hp_percentage: surviving_pokemon_hp_percentage.toString() + "%",
                rival_battle_strategy: rival_battle_strategy,
            });
            
        }
    })

    const labels: Record<string, string> = {
        turns: "Turns",
        rival_pokemon_type: "Rival Type",
        first_move_trainer: "First Move",
        winner: "Winner",
        surviving_pokemon_hp_percentage: "Surviving HP %",
        rival_battle_strategy: "Rival Strategy",
    };

    if (!outcomes) {
        return <Box className="problem-overview">No problem data available</Box>;
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
                flex: 3,
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
                Outcomes
            </Box>
            <Table size="small" sx={{ color: "#fff", height: "fit-content" }}>  
                <TableBody>
                    {Object.entries(relevantOutcomes).map(([key, value]) =>
                        value !== undefined && value !== null && key !== "variant" ? (
                            <TableRow key={key}>
                                <TableCell sx={{ color: "#bbb", border: "none", fontWeight: 600 }}>
                                    {labels[key] || key}
                                </TableCell>
                                <TableCell sx={{ color: "#fff", border: "none" }} className='battle-overview-value'>
                                    {value}
                                </TableCell>
                            </TableRow>
                        ) : null
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default OutcomeOverview;