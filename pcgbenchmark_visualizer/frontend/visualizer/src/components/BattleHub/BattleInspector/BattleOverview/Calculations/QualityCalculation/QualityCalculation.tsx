import { Box, Divider, Grid, Paper } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import CalculationComponent from '../CalculationComponent';
import ProblemConfigContext from '../../../../../../contexts/ProblemConfigContext';
import type { BattleInspectorData, ProblemConfig } from '../../../../../utils/type_utils';
import { fillDefaultValuesForProblemConfig } from '../../../../../utils/function_utils';
import ControlSampleContext from '../../../../../../contexts/ControlSampleContext';
import BattleOutcomeContext from '../../../../../../contexts/BattleOutcomeContext';
import { getHpPercentageReward, getLevelBalanceReward, getPlayerLevelReward, getQScoreParameter, getRivalLevelReward, getWinerRewardValue, getWinnerReward, getHpPercentageRewardValue, getLevelBalanceRewardValue, getPlayerLevelRewardValue, getRivalLevelRewardValue } from '../calculation_utils';

interface Props {
    additional_data: BattleInspectorData
}

function QualityCalculation(props: Props) {
    const problem = useContext(ProblemConfigContext);
    const [problemConfig, setProblemConfig] = React.useState<ProblemConfig>(problem.problemConfig);
    const control = useContext(ControlSampleContext);
    const outcome = useContext(BattleOutcomeContext);

    useEffect(() => {
        if (problem) {
            const config = fillDefaultValuesForProblemConfig(problem.problemConfig);
            setProblemConfig({...config});
        }
    }, [problem]);

    const getAllRewards = () => {
        const winner_reward = getWinerRewardValue(problemConfig, outcome);
        const player_level_reward = getPlayerLevelRewardValue(problemConfig, props.additional_data);
        const rival_level_reward = getRivalLevelRewardValue(problemConfig, props.additional_data);
        const level_balance_reward = getLevelBalanceRewardValue(props.additional_data);
        const hp_percentage_reward = getHpPercentageRewardValue(problemConfig, props.additional_data);
        
        return [winner_reward, player_level_reward, rival_level_reward, level_balance_reward, hp_percentage_reward];
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
            Quality
        </Box>
        <Grid container sx={{ display: "flex", flexDirection: "row", width: "100%",  alignItems: "start", p: 2}}>
            <Grid sx={{ height:  "100%", display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", flex: 1 }}>
                <Box sx={{ color: "#fff", textAlign: "left", pt: 0.2, fontSize: 15}}>
                    The quality score is computed as a weighted sum of rewards. The rewards are defined in a way to reflect what would be considered a good outcome in a battle. The rewards are the following:
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
                    {`winner_reward\nplayer_level_reward\nrival_level_reward\nlevel_balance_reward\nhp_percentage_reward`}
                </Box>
            </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getWinnerReward(problemConfig, control, outcome, props.additional_data)}/>
        
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getPlayerLevelReward(problemConfig, control, outcome, props.additional_data)}/>
 
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getRivalLevelReward(problemConfig, control, outcome, props.additional_data)}/>
        
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getLevelBalanceReward(problemConfig, control, outcome, props.additional_data)}/>
 
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getHpPercentageReward(problemConfig, control, outcome, props.additional_data)}/>
 
        <Divider sx={{ borderColor: "#696969", width: "95%", margin: "auto"}} />
        <CalculationComponent data={getQScoreParameter(getAllRewards())}/>
        
    </Paper>
  );
}

export default QualityCalculation;