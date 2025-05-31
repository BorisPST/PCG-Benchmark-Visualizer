import { Box, Typography, Paper, Chip, Grid } from "@mui/material";
import React, { useEffect } from "react";
import "../BattleOverview.css";
import type { PokemonData } from "../../../../utils/type_utils";
import { sprites } from "../../../../utils/sprites";
import MovesOverview from "./MovesOverview";
import { getColorForPokemonType } from "../../../battle_utils";

interface Props {
    label: string;
    pokemon: PokemonData;
    justifyContent: string;
}

function PokemonOverview(props: Props) {
    const [sprite, setSprite] = React.useState<string>("");

    useEffect(() => {
        if (props.pokemon) {
            const pokemonSprite = sprites.find(sprite => sprite.name === props.pokemon.name);
            setSprite(pokemonSprite ? pokemonSprite.front : "");
        }
    }, [props.pokemon]);

    if (!props.pokemon) return null;

    return (
        <Box sx={{ mb: 4, display: "flex", justifyContent: props.justifyContent, flexGrow: 1 }}>
            <Paper
                elevation={3}
                sx={{
                    borderRadius: 3,
                    position: "relative",
                    minWidth: 150,
                    width: "100%",
                    p: 2,
                    pt: 4,
                    background: "#232323",
                    border: "2px solid #fff",
                }}
                className="pokemon-overview-paper"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: -14,
                        left: 24,
                        background: "#232323",
                        px: 2,
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 18,
                        borderRadius: "1rem 1rem 0 0",
                        borderBottom: "none",
                        zIndex: 2,
                    }}
                >
                    {props.label}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 2, mr: 2 }}>
                    <img
                        src={sprite}
                        alt={props.pokemon.name}
                        style={{
                            maxWidth: 120,
                            maxHeight: 120,
                            width: "auto",
                            height: "auto",
                            objectFit: "contain",
                            display: "block",
                            imageRendering: "pixelated",
                            marginBottom: "0.75rem",
                        }}
                    />
                    <Box>
                        <Typography variant="h6" color="white" sx={{ mb: 0.5 }}>
                            {props.pokemon.name}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                            {props.pokemon.types?.map((type: string) => (
                                <Chip
                                    key={type}
                                    label={type}
                                    size="small"
                                    sx={{
                                        background: getColorForPokemonType(type),
                                        color: "#fff",
                                        fontWeight: "bold",
                                        textTransform: "capitalize",
                                    }}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end", alignItems: "center" }}>
                        <Typography variant="h6" color="white">
                            Level: {props.pokemon.level}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ mt: 1}}>
                    <Typography variant="subtitle2" color="white" sx={{ mb: 1 }}>
                        Moves
                    </Typography>
                    <Grid container spacing={1}>
                        {props.pokemon.moves?.map((move, i) => (
                            <MovesOverview key={i} move={move} i={i} />
                        ))}
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
}

export default PokemonOverview;