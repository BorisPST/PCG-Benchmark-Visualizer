import { Box, Divider, Grid, Paper } from '@mui/material';
import React, { useContext } from 'react';
import CalculationComponent from '../CalculationComponent';
import { getDiversityRatio, getDScoreParameter, getLevelDiversityReward, getPokemonDiversityReward } from '../calculation_utils';
import { BattleScoresContext } from '../../../../../../contexts/BattleScoresContext';

function DiversityCalculation() {
    const scores = useContext(BattleScoresContext);

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
            width: "100%",
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
            Diversity
        </Box>
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%",  alignItems: "start", p: 2}}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "left", pt: 0.2, fontSize: 15}}>
                    The diversity score is computed by computing a diversity ratio based on defined diversity measures. It is meant to reflect how diverse the generator output is in terms of content. The calculations are computed pairwise for all battles, and so we only include the outline of the calculations.
                </Box>
            </Grid>
        </Grid>
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%",  alignItems: "start", p: 2, mb: 1 }}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "right", pt: 0.2}} className="calculation-label">
                    Measures:
                </Box>
            </Grid>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 3 }}>
                <Box sx={{ color:"#fff", ml: "1rem", textAlign: "left", fontSize: 16, display: "flex", flexDirection: "column", }} className="calculation-formula">
                    {`pokemon_diversity\nlevel_diversity`}
                </Box>
            </Grid>
        </Grid>
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%",  alignItems: "start", p: 2}}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "left", pt: 0.2, fontSize: 15}} className='app-reminder-text'>
                    <b>Reminder:</b> the diversity score is only optimized by the generator if the chosen fitness function aims to maximize it. The default fitness function (Quality) does <b>not</b> optimize diversity.
                </Box>
            </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getPokemonDiversityReward()}/>
        
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getLevelDiversityReward()}/>
 
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getDiversityRatio()}/>
 
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getDScoreParameter(scores.d_score)}/>
        
    </Paper>
  );
}

export default DiversityCalculation;