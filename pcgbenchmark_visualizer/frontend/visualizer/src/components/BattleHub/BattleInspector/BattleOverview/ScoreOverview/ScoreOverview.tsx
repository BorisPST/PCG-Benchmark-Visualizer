import { Box, Paper} from '@mui/material';
import React, { useContext } from 'react';
import { BattleScoresContext } from '../../../../../contexts/BattleScoresContext';

function ScoreOverview() {
    const scores = useContext(BattleScoresContext);

    if (!scores) {
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
                flex: 2,
                height: "fit-content",
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
                Score Overview
            </Box>
            <Box sx={{ display: "flex", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center", p: 2, gap: 2 }}>
                <Box sx={{ color: "#fff", fontSize: 18, mb: 1, textAlign: "center", flexGrow: 1 }}>
                    q_score: {scores.q_score.toFixed(2)}
                </Box>
                <Box sx={{ color: "#fff", fontSize: 18, mb: 1, textAlign: "center", flexGrow: 1 }}>
                    c_score: {scores.c_score.toFixed(2)}
                </Box>
                <Box sx={{ color: "#fff", fontSize: 18, mb: 1, textAlign: "center", flexGrow: 1 }}>
                    d_score: {scores.d_score.toFixed(2)}
                </Box>
            </Box>
        </Paper>
    );
}

export default ScoreOverview;