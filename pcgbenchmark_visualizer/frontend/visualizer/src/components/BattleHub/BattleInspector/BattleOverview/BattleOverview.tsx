import { Box } from "@mui/material";
import React from "react";
import "./BattleOverview.css";
import { BattleInspectorContext } from "../../../../contexts/BattleInspectorContext";
import PokemonOverview from "./PokemonOverview/PokemonOverview";
import QualityCalculation from "./Calculations/QualityCalculation/QualityCalculation";
import ProblemOverview from "./ProblemOverview/ProblemOverview";
import ControlOverview from "./ControlOverview/ControlOverview";
import OutcomeOverview from "./OutcomeOverview/OutcomeOverview";
import ScoreOverview from "./ScoreOverview/ScoreOverview";
import ControlCalculation from "./Calculations/ControlCalculation/ControlCalculation";

function BattleOverview() {
    const battleInspectorData = React.useContext(BattleInspectorContext);

    if (!battleInspectorData.data) {
        return <Box className="battle-overview">No battle data available</Box>;
    }

    return (
        <Box
            className="battle-overview"
        >
            <Box sx={{ mb: 1, display: "flex", justifyContent: "center", width: "100%", gap: 2 }}>
                <PokemonOverview label="Player" pokemon={battleInspectorData.data.player_pokemon} justifyContent="start"></PokemonOverview>
                <PokemonOverview label="Rival" pokemon={battleInspectorData.data.rival_pokemon} justifyContent="end"></PokemonOverview>
            </Box>

            <Box sx={{ mb: 4, display: "flex", width: "100%", gap: 4 }}>
                <ProblemOverview></ProblemOverview>
                <ControlOverview></ControlOverview>
                <OutcomeOverview></OutcomeOverview>
            </Box>
            <Box sx={{ mb: 4, display: "flex", justifyContent: "center", width: "100%", gap: 2 }}>
                <ScoreOverview></ScoreOverview>
            </Box>
            <Box sx={{ mb: 4, display: "flex", justifyContent: "center", width: "100%", gap: 2 }}>
                <QualityCalculation additional_data={battleInspectorData.data}></QualityCalculation>
            </Box>
            <Box sx={{ mb: 4, display: "flex", justifyContent: "center", width: "100%", gap: 2 }}>
                <ControlCalculation additional_data={battleInspectorData.data}></ControlCalculation>
            </Box>
        </Box>
    );
}

export default BattleOverview;