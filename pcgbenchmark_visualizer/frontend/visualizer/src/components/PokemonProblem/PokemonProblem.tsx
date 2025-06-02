import { Box, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import PokeballSprite from "../../assets/pokeball.png"
import './PokemonProblem.css';
import BattleExample from './SectionContent/BattleExample';
import type { MoveData } from '../utils/type_utils';
import MovesOverview from '../BattleHub/BattleInspector/BattleOverview/PokemonOverview/MovesOverview';

function PokemonProblem() {
    const battlePlaysOutItems = [
        'Each Pokemon has a set of moves they can use',
        'The moves have different base powers and types',
        'Each turn, the selected moves are executed in sequential order based on the Pokemon\'s speed stat',
        'The battle continues until one of the Pokemon\'s health reaches zero'
    ];

    const moveItems = [
        "When calculating damage, there are many factors which act as multipliers, drastically changing the final value",
        "Each pokemon has a predefined learnset: a set of moves they can learn at specific levels",
        "A Pokemon can have a maximum of four moves at a time",
    ]

     const exampleMoves: MoveData[] = [{
            name: "Thunderbolt",
            type: 4,
            power: 90,
            category: 1,
            accuracy: 100,
        },
        {
            name: "Flamethrower",
            type: 2,
            power: 90,
            category: 1,
            accuracy: 100,
        },
        {
            name: "Leaf Blade",
            type: 1,
            power: 90,
            category: 0,
            accuracy: 100,
        },
        {
            name: "Surf",
            type: 3,
            power: 90,
            category: 1,
            accuracy: 90,
        }
    ];

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
            <Divider sx={{ width: '100%', borderColor: '#555', mb: 4 }} />
            {/* align={"start"}
                title={"What is a Pokemon battle?"}
                description={"For the purposes of this problem setup, a Pokemon battle is defined as a turn-based battle between (only) two Pokemon: one on the player side and one on the enemy side (rival)."}
                content={
                    <><ListContent
                    label={"A Pokemon battle plays out as follows:"}
                    items={[
                        'Each Pokemon has a set of moves they can use',
                        'Each turn, the selected moves are executed in sequential order based on the Pokemon\'s speed stat',
                        'The battle continues until one of the Pokemon\'s health reaches zero'
                    ]}
                     /> */}
                     <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '100%', mt: 2, mb: 6 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'left', flex: 1, mr: 2 }}>
                            <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
                                What is a Pokémon battle?
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                                For the purposes of this problem setup, a Pokémon battle is defined as a turn-based battle between (only) two Pokémon: one on the player side and one on the enemy side (rival).
                            </Typography>
                            <Box sx={{ width: '100%', color: '#fff' }}>
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    A Pokemon battle plays out as follows:
                                </Typography>
                                <List dense>
                                    {battlePlaysOutItems.map((item, index) => (
                                    <ListItem key={index} sx={{ py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, color: 'primary.light' }}>
                                        <CallMissedOutgoingIcon fontSize="small" sx={{ color: "#0a9580" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.95rem' }} />
                                    </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'left', flex: 1 }}>
                            <BattleExample></BattleExample>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '100%', mt: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, pr: 2, mr: 2 }}>
                            <Grid container rowSpacing={4} columnSpacing={2} sx={{ width: '100%', maxWidth: {xs: 300, sm: 400, md: '100%'}, justifyContent: 'center' }}>
                                {exampleMoves.map((move, i) => (
                                    <MovesOverview key={i} move={move} i={i} stretch={true} />
                                ))}
                            </Grid>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'start', textAlign: 'left', flex: 1}}>
                                <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
                                    What are Pokemon Moves?
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#fff' }}>
                                    Each Pokemon comes with a se of moves they can use in battle. Each move has a base power and a type, which determines its effectiveness against the opponent's Pokemon. Moves also have a category, being either Physical, Special, or Status.
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#fff', mt: 1 }}>
                                    Physical moves deal damage based on the Pokemon's Attack stat, Special moves deal damage based on the Pokemon's Special Attack stat, and Status moves do not deal damage but can inflict various effects.
                                </Typography>
                                <Box sx={{ width: '100%', color: '#fff' }}>
                                <List dense>
                                    {moveItems.map((item, index) => (
                                    <ListItem key={index} sx={{ py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, color: 'primary.light' }}>
                                        <CallMissedOutgoingIcon fontSize="small" sx={{ color: "#0a9580" }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item} primaryTypographyProps={{ fontSize: '0.95rem' }} />
                                    </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    </Box>
        </Box>
    );
}

export default PokemonProblem;