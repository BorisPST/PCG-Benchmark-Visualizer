import { Box, Paper, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import ProblemConfigContext from '../../../../../contexts/ProblemConfigContext';
import { type ProblemConfig } from '../../../../utils/type_utils';
import { fillDefaultValuesForProblemConfig } from '../../../../utils/function_utils';

function ProblemOverview() {
    const problem = useContext(ProblemConfigContext);
    const [problemConfig, setProblemConfig] = React.useState<ProblemConfig>(problem.problemConfig);

    useEffect(() => {
        if (problem) {
            const config = fillDefaultValuesForProblemConfig(problem.problemConfig);
            setProblemConfig({...config});
        }
    }, [problem]);

    if (!problem) {
        return <Box className="problem-overview">No problem data available</Box>;
    }

    const isFieldDefault = (key: keyof ProblemConfig): boolean => {
        return problem.problemConfig[key] === undefined || problem.problemConfig[key] === null;
    }

    const getProblemConfigValueOrDefault = (key: keyof ProblemConfig): string => {
        if (problemConfig && key in problemConfig) {
            let value = problemConfig[key];
            if (key == "winner") value = value === 0 ? "Player" : "Rival";

            if (isFieldDefault(key)) {
                return value as string + " (default)";
            } else {
                return value as string;
            }
        }

        return "";
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
                flex: 4,
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
                Problem
            </Box>
            <Table size="small" sx={{ color: "#fff"}}>
                <TableBody>
                    {Object.entries(problem.problemConfig).map(([key]) =>
                        (
                            <TableRow key={key}>
                                <TableCell sx={{ color: "#bbb", border: "none", fontWeight: 600 }}>
                                    {labels[key] || key}
                                </TableCell>
                                <TableCell sx={{ color: "#fff", border: "none" }} className={"battle-overview-value" + (isFieldDefault(key as keyof ProblemConfig) ? " default-value" : "")}>
                                    {getProblemConfigValueOrDefault(key as keyof ProblemConfig)}
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </Paper>
    );
}

export default ProblemOverview;