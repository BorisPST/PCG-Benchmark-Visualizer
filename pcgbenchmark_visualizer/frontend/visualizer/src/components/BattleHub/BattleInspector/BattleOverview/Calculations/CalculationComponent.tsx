import { Box, Grid } from '@mui/material';
import React from 'react';
import './Calculations.css';
import type { CalculationParameter } from './calculation_utils';

interface Props {
    data: CalculationParameter
}

function CalculationComponent(props: Props) {
  return (
    <Grid container direction="column" alignItems="start" justifyContent="center" className="calculation-container">
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%",  alignItems: "start", p: 2}}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "right", pt: 0.2}} className="calculation-label">
                    {props.data.label}:
                </Box>
            </Grid>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 3 }}>
                <Box sx={{ ml: "1rem", textAlign: "left", fontSize: 16, display: "flex", flexDirection: "column", }} className="calculation-description">
                    {props.data.description}
                </Box>
            </Grid>
        </Grid>
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "start", p: 2}}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "center", pt: 0.2}} className="calculation-caption">
                    Formula:
                </Box>
            </Grid>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 3 }}>
                <Box sx={{ color: "#fff", ml: "1rem", textAlign: "left", fontSize: 15, mt: 0.4}} className="calculation-formula">
                  {props.data.formula}
            </Box>
            </Grid>
        </Grid>
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%",  alignItems: "start", p: 2}}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "center", pt: 0.2}} className="calculation-caption">
                    Calculation:
                </Box>
            </Grid>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 3 }}>
                <Box sx={{ ml: "1rem", textAlign: "left", fontSize: 15, display: "flex", flexDirection: "column", mt: 0.4}} className="calculation-formula">
                    {props.data.calculation}
                </Box>
            </Grid>
        </Grid>
    </Grid>
  );
}

export default CalculationComponent;