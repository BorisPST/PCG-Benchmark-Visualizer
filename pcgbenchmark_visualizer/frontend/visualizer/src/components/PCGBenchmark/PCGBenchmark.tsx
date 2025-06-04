import { Box, Divider, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import React from 'react';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import './PCGBenchmark.css';

function PCGBenchmark() {
    const benchmarkComponents = [
        "Content Space: the core information defining the problem we are trying to solve. E.g. the level layout in a puzzle game.",
        "Control Space: a set of feasible constraints a given solution should satisfy. E.g. the number of enemies in a generated level.",
        "Info function: provides information about the sampled content, used by evaluation functions.",
        "Quality, Controlability and Diversity functions: used for evaluating results.",
        "(Optional) Render function: Renders the generated content to a readable / illustrative format."
    ]

    const contentSpaceParameters = [
        "Player pokemon: Pokémon species used by the player",
        "Rival pokemon: Pokémon species used by the rival",
        "Player level: level of the player's Pokémon",
        "Rival level: level of the rival's Pokémon",
        "Rival battle strategy: whether the rival Pokémon selects moves randomly, or greedily (highest damage). Player is assumed to always use greedy.",
        "Rng Seed: needed for replicability and consistency but NOT optimized by the generator; it is reset between each run"
    ];

    const controlSpaceParameters = [
        "Turns: target number of turns the battle should (roughly) take to finish",
        "Rival Pokémon Type: type of the pokemon used by the rival pokemon. (this can be useful since, in Pokémon, trainers often tend to specialize in a particular type, e.g. gym leaders)",
        "First move trainer: Who makes the first move, the player or the rival? This is determined by the speed stat, and it is a useful parameter to control as moving first can often mean winning the battle!"
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', p:2, px: 8 }}>
            <Box sx={{ color: '#fff', fontSize: 48, fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                The Pokemon Battle Problem
            </Box>
            <Box sx={{ color: '#fff', fontSize: 18, width: '50%', textAlign: 'justify', mb: 4,  }}>
                In order to explore how the benchmark works, an entirely new problem was defined: <b>The Pokemon Battle Problem.</b> This way we can see not only how the benchmark works, but also how easy it is to define entirely new problems and use them for new generative tasks!
            </Box>
            <Divider sx={{ width: '100%', borderColor: '#555', mb: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2, textAlign: 'left' }}>
                        PCG Benchmark: Defining new problems
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        The pcg benchmark allows for easy extension by creating new problems, apart from the 12 default problems that come built in.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        The paper and documentation go into detail as for how this I done, but the main takeaways are that we need to define a content space, a control space, an info function, and quality, controllability and diversity functions.
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        Optionally, we can also define a render function to visualize the generated content.
                    </Typography>
                    <Box sx={{ width: '100%', color: '#fff' }}>
 
                        <List dense>
                            {benchmarkComponents.map((item, index) => (
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
    content_space: {...},
    control_space: {...},
    info: function(content),
    quality: function(info),
    controlability: function(info),
    diversity: function(info),
    render_function: function(content)
}`}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
                        Content Space
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        There are many ways to define the Pokémon battle problem; there isn't a one-fits-all solution. Following the simplifications made for the purposes of this implementation, the following parameters were chosen as dictionary keys of the content space rpresenting the problem:
                    </Typography>
                    <Box sx={{ width: '100%', color: '#fff', mt: 2 }}>
                        <List dense>
                            {contentSpaceParameters.map((item, index) => (
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
    "player_pokemon": "Pikachu",
    "rival_pokemon": "Charmander",
    "player_level": 12,
    "rival_level": 14,
    "rival_battle_strategy": "greedy",
    "rng_seed": 42
}`}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'justify', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
                        Control Space
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        The control space is defined by a dictionary that aims to constrain the solution to match its set of feasible parameters. The control space is optional with the PCG Benchmark, but this implementation defines it and samples from it in all examples. It consists of:                    </Typography>
                    <Box sx={{ width: '100%', color: '#fff', mt: 2 }}>
                        <List dense>
                            {controlSpaceParameters.map((item, index) => (
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
    "turns": 8,
    "rival_pokemon_type": "Fire",
    "first_move_trainer": "player"
}`}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'left', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
                        Info, Quality, Controllability and Diversity
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        These functions are the core of the optimiziation process behind the generators. The info function is the function which takes the sampled content values and parses them into a meaningful battle information format, which is then used for evaluating that particular sample. In our case, it runs the battle simulation (where the rng seed comes in) and ends up with outcome information such as the winner, number of turns, and surviving Pokémon's hp percentage. 
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        Finally, the QCD functions. They evaluate a given piece of content based on several criteria and assing them a 0-1 score, which can then be used by the generator's fitness function to maximize its objective. The details of how each of the functions are defined (and calculated) can be seen in the results tab, when inspecting a particular battle
                    </Typography>
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
    "q_score": 1.0,
    "c_score": "0.4",
    "d_score": "0.74"
}`}
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center', width: '75%', mt: 2, mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'start', textAlign: 'left', flex: 1, mr: 2 }}>
                    <Typography variant="h4" sx={{ color: '#fff', mb: 2 }}>
                        Render Function
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff', mb: 1 }}>
                        This function simply renders the outcome information in a Pokémon-style battle log format. This includes iconic lines from the games, such as "It's super effective!" and "It's not very effective...". Each line is a string representative of what happened in a given turn, in sequential order of moves. The final line is always "X fainted", where X is the losing Pokémon.
                    </Typography>
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
                            width: '80%',
                            overflowX: 'auto',
                            boxShadow: 1,
                            mt: 10
                        }}
                    >
                    {
`[
    "Enemy sent out Charmander.",
    "Squirtle used Water Gun. It's super effective!",
    "Charmander used Scratch.",
    "Squirtle used Water Gun. It's super effective!",
    "Enemy Charmander fainted."
]`}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default PCGBenchmark;