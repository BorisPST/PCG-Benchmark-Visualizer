import { Box } from '@mui/material';
import React from 'react';
import PokeballSprite from "../../assets/pokeball.png"
import './PokemonProblem.css';
import Section from './Section/Section';

function PokemonProblem() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', p:2, px: 8 }}>
            <Box sx={{ color: '#fff', fontSize: 48, fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={PokeballSprite} className='pokeball-sprite'></img>
                The Pokémon Battle Problem
                <img src={PokeballSprite} className='pokeball-sprite'></img>
            </Box>
            <Box sx={{ color: '#fff', fontSize: 18, width: '75%', textAlign: 'center', mb: 4,  }}>
                In order to explore how the benchmark works, an entirely new problem was defined: <b>The Pokemon Battle Problem.</b> This way we can see not only how the benchmark works, but also how easy it is to define entirely new problems and use them for new generative tasks!
            </Box>
            <Section align={"start"}></Section>
        </Box>
    );
}

export default PokemonProblem;