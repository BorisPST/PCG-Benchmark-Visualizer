import { Box } from "@mui/material";
import React from "react";
import "./BattleOverview.css";
import { BattleInspectorContext } from "../../../../contexts/BattleInspectorContext";
import PokemonOverview from "./PokemonOverview/PokemonOverview";
import QualityCalculation from "./QualityCalculation/QualityCalculation";
import ProblemOverview from "./ProblemOverview/ProblemOverview";
import ControlOverview from "./ControlOverview/ControlOverview";
import OutcomeOverview from "./OutcomeOverview/OutcomeOverview";

function BattleOverview() {
    const battleInspectorData = React.useContext(BattleInspectorContext);

    if (!battleInspectorData.data) {
        return <Box className="battle-overview">No battle data available</Box>;
    }

    return (
        <Box
            className="battle-overview"
        >
            <Box sx={{ mb: 1, display: "flex", justifyContent: "center", gap: 2 }}>
                <PokemonOverview label="Player" pokemon={battleInspectorData.data.player_pokemon}></PokemonOverview>
                <PokemonOverview label="Rival" pokemon={battleInspectorData.data.rival_pokemon}></PokemonOverview>
            </Box>
            <Box sx={{ mb: 4, display: "flex", width: "100%", gap: 4 }}>
                <ProblemOverview></ProblemOverview>
                <ControlOverview></ControlOverview>
                <OutcomeOverview></OutcomeOverview>
            </Box>
            <Box sx={{ mb: 1, display: "flex", justifyContent: "end", width: "100%" }}>
                <QualityCalculation></QualityCalculation>
            </Box>
        </Box>
    );
}

export default BattleOverview;