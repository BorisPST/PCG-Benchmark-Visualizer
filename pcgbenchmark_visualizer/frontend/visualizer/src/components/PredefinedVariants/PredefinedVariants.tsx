import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

function PredefinedVariants() {
    const defaultVariantFields = [
        'winner: The player must win the battle.',
        'min_level: The minimum level for the Pokémon is 5.'
    ];

    const longBattleVariantFields = [
        'min_level: The minimum level for the Pokémon is 5.',
        'max_level: The maximum level for the Pokémon is 50.',
        'min_turns: The battle must last at least 7 turns.'
    ];

    const shortBattleVariantFields = [
        'min_level: The minimum level for the Pokémon is 5.',
        'max_level: The maximum level for the Pokémon is 50.',
        'max_turns: The battle must last at most 3 turns.'
    ];

    const rivalWinVariantFields = [
        'winner: The rival must win the battle.',
        'min_level: The minimum level for the Pokémon is 5.'
    ];

    const toTheWireVariantFields = [
        'min_level: The minimum level for the Pokémon is 5.',
        'max_level: The maximum level for the Pokémon is 50.',
        'surviving_hp_percentage: The winner must have at most 10% HP remaining.'
    ];

    const sweepVariantFields = [
        'min_level: The minimum level for the Pokémon is 5.',
        'max_level: The maximum level for the Pokémon is 50.',
        'surviving_hp_percentage: The winner must have at least 80% HP remaining.'
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', p:2, px: 8 }}>
            <Box sx={{ color: '#fff', fontSize: 48, fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Predefined Variants
            </Box>
            <Box sx={{ color: '#fff', fontSize: 18, width: '50%', textAlign: 'justify', mb: 4,  }}>
                The Pokemon Battle Problem we defined comes with a few predefined variants you can use for experimenting. These were created to capture a few insteresting scenarios by balancing the parameters for a specific result. You may also define your own (temporary) variant and experiment as much as you want!
            </Box>
            <Divider sx={{ width: '100%', borderColor: '#555', mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
                        pokemonbattle-v0 (default)
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        This is the default, most basic variant of the problem. It simply aims to have the player win the battle, and makes 5 the minimum level for the Pokemon.
                    </Typography>
                    <Box sx={{ width: '100%', color: '#fff' }}>
 
                        <List dense>
                            {defaultVariantFields.map((item, index) => (
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'left', flex: 1 }}>
                    <Box
                        component="pre"
                        sx={{
                            background: '#222',
                            color: '#fff',
                            borderRadius: 2,
                            p: 2,
                            fontSize: '1rem',
                            width: '70%',
                            overflowX: 'auto',
                            boxShadow: 1,
                            mt: 10
                        }}
                    >
                    {
`{
    winner: 0,
    min_level: 5
}`}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
                        pokemonbattle-long-v0
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                       
                    </Typography>
                    <Box sx={{ width: '100%', color: '#fff' }}>
                        This variant is meant to create longer battles, as we want at least 7 turns. The problem itself does have a +-2 leeway for the number of turns (to make the boundary softer), so in reality we will value battles taking 5-9 turns. The levels are set to be 5-50, for some variety while still not being too large of a range.
                        <List dense>
                            {longBattleVariantFields.map((item, index) => (
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'left', flex: 1 }}>
                    <Box
                        component="pre"
                        sx={{
                            background: '#222',
                            color: '#fff',
                            borderRadius: 2,
                            p: 2,
                            fontSize: '1rem',
                            width: '70%',
                            overflowX: 'auto',
                            boxShadow: 1,
                            mt: 10
                        }}
                    >
                    {
`{
    min_level: 5,
    max_level: 50,
    min_turns: 7
}`}
                    </Box>
                </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
                        pokemonbattle-short-v0
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        In this variant we check the opposite from above: we want a short battle lasting a maximum of 3 turns (so 1-5 turns in reality, due to the +-2 leeway). The levels are still set to be 5-50, for some variety while still not being too large of a range.
                    </Typography>
                    <Box sx={{ width: '100%', color: '#fff' }}>
 
                        <List dense>
                            {shortBattleVariantFields.map((item, index) => (
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'left', flex: 1 }}>
                    <Box
                        component="pre"
                        sx={{
                            background: '#222',
                            color: '#fff',
                            borderRadius: 2,
                            p: 2,
                            fontSize: '1rem',
                            width: '70%',
                            overflowX: 'auto',
                            boxShadow: 1,
                            mt: 10
                        }}
                    >
                    {
`{
    min_level: 5,
    max_level: 50,
    max_turns: 3
}`}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
                        pokemonbattle-rivalwin-v0
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        This variant is very similar to the default one, but it instead requies the rival to win the battle. The minimum level for the Pokemon is still 5.
                    </Typography>
                    <Box sx={{ width: '100%', color: '#fff' }}>
 
                        <List dense>
                            {rivalWinVariantFields.map((item, index) => (
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'left', flex: 1 }}>
                    <Box
                        component="pre"
                        sx={{
                            background: '#222',
                            color: '#fff',
                            borderRadius: 2,
                            p: 2,
                            fontSize: '1rem',
                            width: '70%',
                            overflowX: 'auto',
                            boxShadow: 1,
                            mt: 10
                        }}
                    >
{
`{
    winner: 1,
    min_level: 5
}`}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
                        pokemonbattle-tothewire-v0
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                    </Typography>
                    <Box sx={{ width: '100%', color: '#fff' }}>
                        In this variant, we want to get battles which end up very close, or in other words "come down to the wire". Thus, we want the surviving Pokemon's HP percentage to be at most 10% (but do to leniancy, 0-20% is still acceptable). The levels are set to be 5-50, for some variety while still not being too large of a range.
                        <List dense>
                            {toTheWireVariantFields.map((item, index) => (
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'left', flex: 1 }}>
                    <Box
                        component="pre"
                        sx={{
                            background: '#222',
                            color: '#fff',
                            borderRadius: 2,
                            p: 2,
                            fontSize: '1rem',
                            width: '70%',
                            overflowX: 'auto',
                            boxShadow: 1,
                            mt: 10
                        }}
                    >
                    {
`{
    min_level: 5,
    max_level: 50,
    surviving_hp_percentage: 0.1
}`}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
                        pokemonbattle-sweep-v0
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        And finally, in this variant we try to get the opposite: a battle where there is a clear winner, also knows as a "sweep". The winner must have at least 80% HP remaining (so 70-90% in reality, due to the +-10% leniency). The levels are set to be 5-50, for some variety while still not being too large of a range.
                    </Typography>
                    <Box sx={{ width: '100%', color: '#fff' }}>
 
                        <List dense>
                            {sweepVariantFields.map((item, index) => (
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'left', flex: 1 }}>
                    <Box
                        component="pre"
                        sx={{
                            background: '#222',
                            color: '#fff',
                            borderRadius: 2,
                            p: 2,
                            fontSize: '1rem',
                            width: '70%',
                            overflowX: 'auto',
                            boxShadow: 1,
                            mt: 10
                        }}
                    >
                    {
`{
    min_level: 5,
    max_level: 50,
    surviving_hp_percentage: 0.8
}`}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default PredefinedVariants;