import React from 'react';
import "./BattleInspector.css"
import { motion } from 'framer-motion';
import { Grid, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BattleSimulator from './BattleSimulator/BattleSimulator';

interface Props {
    inspectorActive: boolean,
    onLeaveInspector: () => void,
}

function BattleInspector(props: Props) {

    return (
        <div className="battle-inspector">
            <Grid container direction="column" alignItems="center" justifyContent="space-between" sx={{ padding: 2, width: "100%", height: "100%" }}>
                <Grid container direction="row" alignItems="center" justifyContent={'center'} sx={{ display: "flex", flexDirection: "row", background: "", borderRadius: 1, paddingY: 1, paddingLeft: "1rem", marginBottom: 1, width: "100%" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0 }}
                        style={{ marginRight: 8, display: "flex", alignItems: "center" }}
                    >
                        <IconButton style={{ color: "white" }} onClick={props.onLeaveInspector} aria-label="Back">
                            <ArrowBackIcon />
                        </IconButton>
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0 }}
                        style={{ margin: 0, display: "inline-block" }}
                    >
                        Battle Inspector
                    </motion.h2>
                </Grid>
                <Grid container direction="row" alignItems="center" sx={{ display: "flex", flexDirection: "row", background: "", borderRadius: 1, paddingY: 1, paddingLeft: "1rem", marginBottom: 1, width: "100%", height: "100%" }}>
                    <Grid flex={3} sx={{ height:  "100%"}}>
                        <BattleSimulator endInspection={!props.inspectorActive}/>
                    </Grid>
                    <Grid flex={3}><h2 style={{ margin: 0 }}>Defender</h2></Grid>
                </Grid>
            </Grid>
            
        </div>
    );
}

export default BattleInspector;