import { Box, Divider, Paper } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import CalculationComponent from '../CalculationComponent';
import ProblemConfigContext from '../../../../../../contexts/ProblemConfigContext';
import type { ProblemConfig } from '../../../../../utils/type_utils';
import { fillDefaultValuesForProblemConfig } from '../../../../../utils/function_utils';
import ControlSampleContext from '../../../../../../contexts/ControlSampleContext';
import BattleOutcomeContext from '../../../../../../contexts/BattleOutcomeContext';
import { getWinnerReward } from '../calculation_utils';

function QualityCalculation() {
    const problem = useContext(ProblemConfigContext);
    const [problemConfig, setProblemConfig] = React.useState<ProblemConfig>(problem);
    const control = useContext(ControlSampleContext);
    const outcome = useContext(BattleOutcomeContext);

    useEffect(() => {
        if (problem) {
            const config = fillDefaultValuesForProblemConfig(problem);
            setProblemConfig({...config});
        }
    }, [problem]);
        
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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "center", p: 2 }}>
            <Box sx={{ color: "#fff", fontSize: 18, mb: 1, textAlign: "left" }}>
                <Box sx={{ display: "inline-block", ml: 1, mr: 2, verticalAlign: "middle", fontWeight: "bold" }}>
                    q_score = {" "}
                </Box>
                <Box sx={{ display: "inline-block", lineHeight: 1.1, verticalAlign: "middle", fontSize: 16 }}>
                    <Box sx={{ borderBottom: "2px solid #fff", px: 1, pb: 0.5 }} className="calculation-value">
                        winner_reward + level_reward + level_balance_reward + hp_percentage_reward
                    </Box>
                    <Box sx={{ width: "100%", textAlign: "center", pt: 1}}>4</Box>
                </Box>
            </Box>
        </Box>
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getWinnerReward(problemConfig, control, outcome)}/>
    </Paper>
  );
}

export default QualityCalculation;