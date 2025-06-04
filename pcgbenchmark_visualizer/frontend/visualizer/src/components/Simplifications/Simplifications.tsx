import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import './Simplifications.css';

function Simplifications() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', p:2, px: 8 }}>
            <Box sx={{ color: '#fff', fontSize: 48, fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Simplifications to the concept
            </Box>
            <Box sx={{ color: '#fff', fontSize: 18, width: '50%', textAlign: 'justify', mb: 4,  }}>
                Due to the complexity of Pokemon battles in the original games, we had to make a series of simplifications to make the problem more manageable. This means that the problem we define isn't 100% true to the originals, but instead serves as a simplified version that is still representative enough to carry the point across. 
            </Box>

            <Divider sx={{ width: '100%', borderColor: '#555', mb: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '50%', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                        1v1 Battles
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        Rather than the usual 6v6 battles that are possible in the games, the problem was stripped down to a simple 1v1 battle. This means one Pokemon on the player's side and one Pokemon on the rival's side. This in turn also reduces the overhead complexity caused by switches.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '50%', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                        Always attack
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        Other than eliminating the switch mechanic, simplifications were also made to the battle structure itself. Items were removed to focus on the Pokemon rather than the items they hold / the player can use (such as potions). Additionally, while there are 3 categories of moves (Physical, Special, and Status), status moves were not included due to the varying and complex effects they have.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        For this reason, each turn we ensure that both Pokemon attack and deal damage to each other, preventing infinite or prolonged battles. This also allowed for the exclusion of power points (PP) for moves, which are otherwise necessary to prevent this scenario.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '50%', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                        Pokemon & Move changes 
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        More simplifications were made to the Pokemon themselves. This includes things like simplifying their learnsets to only include a few level-up moves, removing abilities from the game, and removing stat affecting mechanics, namely natures, EVs and IVs. Similarly, the afformentioned move changes also include removing things like secondary effects (e.g. flinching, burn, paralysis, etc.) and move accuracy, as it could lead to a less stable battle outcome. Thus all moves are guaranteed to hit and deal damage.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '50%', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                        Scale
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        In the games, there are currently 1025 Pokemon. This is way too complex to handle for the purposes of this project, so we scale the problem down to include only 4 Pokemon. These include the iconic starters from the Kanto games, which everyone is familiar with: Bulbasaur, Charmander, Squirtle, and of course, Pikachu. This also means that these Pokemon don't evolve, so you can end up with a level 100 Charmander, which is admittedly a bit unusual!
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        Since only these Pokemon are used, and their learnsets were also simplified to only include a few moves, the problem (currently) defines only 6 types, being those that are used either by their moves or by the Pokemon themselves. These include Normal, Grass, Fire, Water, Electric, Poison and Dark.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '50%', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                        Calculations
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        When calculating a Pokemon's stats, the <a href='https://bulbapedia.bulbagarden.net/wiki/Stat'>official formula</a> is used, but simplified to exclude terms which are not included due to the simplifications mentioned before (such as EVs, IVs, and natures).
                    </Typography>
                     <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        Similarly, a simplified version of the <a href='https://bulbapedia.bulbagarden.net/wiki/Damage'>damage formula</a> is used. Crtical hits were not included, and the only multipliers considered (from the list) are "random" and "STAB". Random refers to a damage range, being [0.85, 1.0], that is computed before each attack. STAB is the Same Type Attack Bonus, which makes moves of the same type as the Pokemon using them gain an additonal 1.5x multiplier.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '50%', mb: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                        Battle strategies
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        Finally, we use two very simple battle strategy algorithms to decide which move is selected. These are the "Random" and "Greedy" strategies. The player always uses the "Greedy" strategy (as the player is presumed to always select the best move), while the rival can use either of the two.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        As the name suggests, the "Random" strategy randomly selects one of the moves available to the Pokemon, while the "Greedy" strategy selects the move that deals the most damage to the opponent. This means that the "Greedy" strategy is always optimal, and thus it is used by the player.
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Simplifications;