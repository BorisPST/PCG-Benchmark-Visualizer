import { Box, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useContext } from 'react';
import ProblemConfigContext from '../../../../../contexts/ProblemConfigContext';

function ProblemOverview() {
    const problem = useContext(ProblemConfigContext);

    if (!problem) {
        return <Box className="problem-overview">No problem data available</Box>;
    }

    const labels: Record<string, string> = {
        variant: "Variant",
        min_level: "Min Level",
        max_level: "Max Level",
        min_turns: "Min Turns",
        max_turns: "Max Turns",
        winner: "Winner",
        surviving_hp_percentage: "Surviving HP %",
        diversity: "Diversity",
    };

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
                {problem.variant}
            </Box>
            <Table size="small" sx={{ color: "#fff"}}>
                <TableBody>
                    {Object.entries(problem).map(([key, value]) =>
                        value !== undefined && value !== null && key !== "variant" ? (
                            <TableRow key={key}>
                                <TableCell sx={{ color: "#bbb", border: "none", fontWeight: 600 }}>
                                    {labels[key] || key}
                                </TableCell>
                                <TableCell sx={{ color: "#fff", border: "none" }}>
                                    {typeof value === "number"
                                        ? key === "surviving_hp_percentage"
                                            ? `${(value * 100).toFixed(1)}%`
                                            : value
                                        : value}
                                </TableCell>
                            </TableRow>
                        ) : null
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default ProblemOverview;