import { Box, Paper } from '@mui/material';
import React from 'react';

function QualityCalculation() {
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
            Quality
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", p: 2 }}>
            <Box sx={{ color: "#fff", fontSize: 18, mb: 1, textAlign: "center" }}>
            <Box sx={{ display: "inline-block", ml: 1, mr: 2, verticalAlign: "middle" }}>
                <b>q_score</b> = {" "}
            </Box>
            <Box sx={{ display: "inline-block", lineHeight: 1.1, verticalAlign: "middle" }}>
                <Box sx={{ borderBottom: "2px solid #fff", px: 1, pb: 0.5 }}>
                    winner_reward + level_reward + level_balance_reward + hp_percentage_reward
                </Box>
                <Box>4</Box>
            </Box>
        </Box>
        </Box>
    </Paper>
  );
}

export default QualityCalculation;