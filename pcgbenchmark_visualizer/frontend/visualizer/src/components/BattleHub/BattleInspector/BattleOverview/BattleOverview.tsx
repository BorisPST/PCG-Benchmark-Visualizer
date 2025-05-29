import { Box } from "@mui/material";
import React from "react";
import "./BattleOverview.css";
import { BattleInspectorContext } from "../../../../contexts/BattleInspectorContext";
import PokemonOverview from "./PokemonOverview/PokemonOverview";

function BattleOverview() {
    const battleInspectorData = React.useContext(BattleInspectorContext);

    if (!battleInspectorData.data) {
        return <Box className="battle-overview">No battle data available</Box>;
    }

    return (
        <Box
            className="battle-overview"
        >
            <Box sx={{ mb: 2, display: "flex", justifyContent: "center", gap: 2 }}>
                <PokemonOverview label="Player" pokemon={battleInspectorData.data.player_pokemon}></PokemonOverview>
                <PokemonOverview label="Rival" pokemon={battleInspectorData.data.rival_pokemon}></PokemonOverview>
            </Box>
        </Box>
    );
}

export default BattleOverview;