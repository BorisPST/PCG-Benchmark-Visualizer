import { Box, Divider, Grid, Paper } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import CalculationComponent from '../CalculationComponent';
import ProblemConfigContext from '../../../../../../contexts/ProblemConfigContext';
import type { BattleInspectorData, ProblemConfig } from '../../../../../utils/type_utils';
import { fillDefaultValuesForProblemConfig } from '../../../../../utils/function_utils';
import ControlSampleContext from '../../../../../../contexts/ControlSampleContext';
import BattleOutcomeContext from '../../../../../../contexts/BattleOutcomeContext';
import { getTurnsReward, getRivalTypeReward, getFirstMoveReward, getTurnsRewardValue, getRivalTypeRewardValue, getFirstMoveRewardValue, getCScoreParameter } from '../calculation_utils';

interface Props {
    additional_data: BattleInspectorData
}

function ControlCalculation(props: Props) {
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

    const getAllRewards = () => {
        const turns_reward = getTurnsRewardValue(control, props.additional_data);
        const rival_type_reward = getRivalTypeRewardValue(props.additional_data, control);
        const first_move_reward = getFirstMoveRewardValue(control, outcome);
        return [turns_reward, rival_type_reward, first_move_reward];
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
            Control
        </Box>
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%",  alignItems: "start", p: 2}}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "left", pt: 0.2, fontSize: 15}}>
                    The control score is also computed as a weighted sum of rewards. The rewards are defined in a way to measure that the outcome aligns with a given set of feasible controlability criteria. The rewards are the following:
                </Box>
            </Grid>
        </Grid>
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%",  alignItems: "start", p: 2, mb: 1 }}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "right", pt: 0.2}} className="calculation-label">
                    Rewards:
                </Box>
            </Grid>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 3 }}>
                <Box sx={{ color:"#fff", ml: "1rem", textAlign: "left", fontSize: 16, display: "flex", flexDirection: "column", }} className="calculation-formula">
                    {`turns_reward\nrival_type_reward\nfirst_move_reward`}
                </Box>
            </Grid>
        </Grid>
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%",  alignItems: "start", p: 2}}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "left", pt: 0.2, fontSize: 15}} className='app-reminder-text'>
                    <b>Reminder:</b> the control score is only optimized by the generator if the chosen fitness function aims to maximize it. The default fitness function (Quality) does <b>not</b> optimize controlability.
                </Box>
            </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getTurnsReward(problemConfig, control, outcome, props.additional_data)}/>
        
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getRivalTypeReward(problemConfig, control, outcome, props.additional_data)}/>
 
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getFirstMoveReward(problemConfig, control, outcome, props.additional_data)}/>
 
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getCScoreParameter(getAllRewards())}/>
        
    </Paper>
  );
}

export default ControlCalculation;