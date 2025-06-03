import { Box, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';
import BattleExample from './BattleExample';
import MovesOverview from '../../BattleHub/BattleInspector/BattleOverview/PokemonOverview/MovesOverview';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import CallMadeIcon from '@mui/icons-material/CallMade';
import type { MoveData } from '../../utils/type_utils';
import { getColorForType, getTypeFromId } from '../../BattleHub/battle_utils';

function PokemonLogicSection() {
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

    const typesText = [
        "If a move is super effective, the multipler is 2x",
        "If a move is not very effective, the multiplier is 0.5x",
        "If a move is not effective at all (immunity), the multiplier is 0x",
        "If a move is neutral, the multiplier is 1x",
    ]

    const typeEffectiveness = {
        Normal:   { Normal: 1, Grass: 1,   Water: 1,   Fire: 1,   Electric: 1, Poison: 1, Dark: 1   },
        Grass:    { Normal: 1, Grass: 0.5, Water: 2,   Fire: 0.5, Electric: 1, Poison: 0.5,Dark: 1   },
        Water:    { Normal: 1, Grass: 0.5, Water: 0.5, Fire: 2,   Electric: 1, Poison: 1, Dark: 1   },
        Fire:     { Normal: 1, Grass: 2,   Water: 0.5, Fire: 0.5, Electric: 1, Poison: 1, Dark: 1   },
        Electric: { Normal: 1, Grass: 0.5, Water: 2,   Fire: 1,   Electric: 0.5,Poison: 1, Dark: 1   },
        Poison:   { Normal: 1, Grass: 2,   Water: 1,   Fire: 1,   Electric: 1, Poison: 0.5,Dark: 1   },
        Dark:     { Normal: 1, Grass: 1,   Water: 1,   Fire: 1,   Electric: 1, Poison: 1, Dark: 0.5 },
    };

    const getMultiplierColor = (multiplier: number) => {
        if (multiplier === 2) return 'success.light'; 
        if (multiplier === 0.5) return 'warning.light';
        if (multiplier === 0) return 'error.light';
        return '#fff'; // For 1x
    };
    
    const typeCellStyle = {
          background: '#555',
          color: '#fff',
          fontWeight: 'bold',
          minHeight: 40,
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderRadius: 1,
          boxSizing: 'border-box',
    };
    
    const multiplierCellStyle = (multiplier: number) => ({
        background: '#3a3a3a',
        color: getMultiplierColor(multiplier),
        fontWeight: 'bold',
        minHeight: 40,
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: 1,
        boxSizing: 'border-box',
    });

    const emptyCellStyle = {
        minHeight: 40,
        padding: '4px',
        background: 'transparent',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const selectedTypes = [0, 1, 2, 3, 4, 5, 6]
    const numGridColumns = selectedTypes.length + 2;
    const cellWidth = `${100 / numGridColumns }%`;
        
  return (
    <>
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '100%', mt: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
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

    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '100%', mt: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, pr: 2, mr: 6 }}>
            <Grid container rowSpacing={4} columnSpacing={2} sx={{ width: '100%', maxWidth: {xs: 300, sm: 400, md: '100%'}, justifyContent: 'center' }}>
                {exampleMoves.map((move, i) => (
                    <MovesOverview key={i} move={move} i={i} stretch={true} />
                ))}
            </Grid>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end', justifyContent: 'start', textAlign: 'justify', flex: 1}}>
                <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
                    What are Pokemon Moves?
                </Typography>
                <Typography variant="body1" sx={{ color: '#fff' }}>
                    Each Pokemon comes with a set of moves they can use in battle. Each move has a base power and a type, which determines its effectiveness against the opponent's Pokemon. Moves also have a category, being either Physical, Special, or Status.
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

    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '100%', mt: 2, mb: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 6 }}>
            <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
                The Pokemon Type Chart
            </Typography>
            <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                Pokemon types are a core aspect of the games. Each type has strengths and weaknesses against other types, which affects the damage dealt by moves. And the type chart is a table that shows the effectiveness of each type against every other type.
            </Typography>
            <Box sx={{ width: '100%', color: '#fff' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                    A type's effectiveness multiplier works as follows:
                </Typography>
                <List dense>
                    {typesText.map((item, index) => (
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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, pl: {md:2}, width: '100%' }}>
            <Grid container spacing={0.5} sx={{ width: '100%'}}>
                <Paper sx={{ ...emptyCellStyle, width: cellWidth }}>
                    <CallMadeIcon sx={{ color: "white"}}></CallMadeIcon>
                </Paper>

                {selectedTypes.map(defendingType => (
                    <Paper key={`header-${defendingType}`} elevation={1} sx={{ ...typeCellStyle, width: cellWidth, backgroundColor: getColorForType(defendingType) }}>
                        {getTypeFromId(defendingType).substring(0,3).toUpperCase()}
                    </Paper>
                ))}

                {selectedTypes.map(attackingType => (
                    <React.Fragment key={`row-${attackingType}`}>
                        <Paper elevation={1} sx={{ ...typeCellStyle, width: cellWidth,  backgroundColor: getColorForType(attackingType) }}>
                            {getTypeFromId(attackingType).substring(0,3).toUpperCase()}
                        </Paper>
                        {selectedTypes.map(defendingType => {
                            const multiplier = typeEffectiveness[getTypeFromId(attackingType) as keyof typeof typeEffectiveness]?.[getTypeFromId(defendingType) as keyof typeof typeEffectiveness.Normal] ?? 1;
                            return (
                                <Paper
                                    key={`cell-${attackingType}-${defendingType}`}
                                    elevation={1}
                                    sx={{ ...multiplierCellStyle(multiplier), width: cellWidth }}
                                >
                                    {multiplier}x
                                </Paper>
                            );
                        })}
                    </React.Fragment>
                ))}
            </Grid>
    </Box>
        </Box>
    </>
  );
}

export default PokemonLogicSection;