import React from "react";
import { sprites } from "../../utils/sprites";
import { Box } from "@mui/material";

const playerPokemon = sprites.find(sprite => sprite.name.toLowerCase() === "pikachu")?.back || "";
const enemyPokemon = sprites.find(sprite => sprite.name.toLowerCase() === "charmander")?.front || "";

function BattleExample() {
    console.log(playerPokemon, enemyPokemon);
    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "start", justifyContent: "center", width: "100%", height: "100%", mt: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "40rem", height: "16rem", position: "relative" }} className="battle-example-background">
                <div className="pokemon-battle-sprite battle-example-player">
                        <img src={playerPokemon} alt=""/>
                    </div>

                <div className="pokemon-battle-sprite battle-example-enemy">
                    <img src={enemyPokemon} alt=""/>
                </div>
            </Box>
        </Box>
    );
}

export default BattleExample;