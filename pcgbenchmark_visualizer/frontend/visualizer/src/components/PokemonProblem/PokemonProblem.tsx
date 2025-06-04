import { Box, Divider } from '@mui/material';
import React from 'react';
import PokeballSprite from "../../assets/pokeball.png"
import './PokemonProblem.css';
import PokemonLogicSection from './SectionContent/PokemonLogicSection';

function PokemonProblem() {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', p:2, px: 8 }}>
            <Box sx={{ color: '#fff', fontSize: 48, fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={PokeballSprite} className='pokeball-sprite'></img>
                Pokemon Battles
                <img src={PokeballSprite} className='pokeball-sprite'></img>
            </Box>
            <Box sx={{ color: '#fff', fontSize: 18, width: '50%', textAlign: 'justify', mb: 4,  }}>
                Here we outline some background information about how Pokemon battles work, to help grasp the problem definition and the logic used in benchmarking. The following categories cover some basic concepts one should understand before diving deeper into the mechanics of the Pokemon Battle Problem.
            </Box>
            <Divider sx={{ width: '100%', borderColor: '#555', mb: 4 }} />

            <PokemonLogicSection></PokemonLogicSection>
        </Box>
    );
}

export default PokemonProblem;