import React from 'react';
import "./BattleInspector.css"
import { Grid } from '@mui/material';
import BattleSimulator from './BattleSimulator/BattleSimulator';
import BattleOverview from './BattleOverview/BattleOverview';

interface Props {
    inspectorActive: boolean,
    onLeaveInspector: () => void,
}

function BattleInspector(props: Props) {

    return (
        <div className="battle-inspector">
            <Grid container direction="column" alignItems="center" justifyContent="space-between" sx={{ padding: 2, width: "100%", height: "100%" }}>

                <Grid container direction="row" alignItems="start" sx={{ display: "flex", flexDirection: "row", background: "", borderRadius: 1, paddingY: 1, paddingLeft: "1rem", marginBottom: 1, width: "100%", height: "100%" }}>
                    <Grid flex={3} sx={{ height:  "100%"}}>
                        <BattleSimulator endInspection={!props.inspectorActive}/>
                    </Grid>
                    <Grid flex={4} sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <BattleOverview></BattleOverview>
                    </Grid>
                </Grid>
            </Grid>
            
        </div>
    );
}

export default BattleInspector;