import React from 'react';
import './Credits.css';
import { Box, Divider, List, ListItem, ListItemIcon } from '@mui/material';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

function Credits() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', p:2, px: 8 }}>
            <Box sx={{ color: '#fff', fontSize: 48, fontWeight: 800, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Credits
            </Box>
            <Box sx={{ color: '#fff', fontSize: 18, width: '50%', textAlign: 'justify', mb: 4 }}>
                This project was built as a visualizer for the <a href='https://dl.acm.org/doi/full/10.1145/3723498.3723794' target="_blank">PCG Benchmark</a>: An Open-source
                Testbed for Generative Challenges in Games. The following links elaborate on the sources and tools that were used, without which the project would not have been possible:

            </Box>
            <Divider sx={{ width: '100%', borderColor: '#555', mb: 4 }} />
            <List sx={{ width: '50%', alignSelf: 'flex-center' }}>
                <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, color: 'primary.light' }}>
                        <CallMissedOutgoingIcon fontSize="small" sx={{ color: "#0a9580" }} />
                    </ListItemIcon>
                    <a href='https://github.com/amidos2006/pcg_benchmark' target='_blank'>The PCG Benchmark repository</a>, which was used as a package and was extended to include the Pokemon Battle Problem.
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, color: 'primary.light' }}>
                        <CallMissedOutgoingIcon fontSize="small" sx={{ color: "#0a9580" }} />
                    </ListItemIcon>
                    <a href='https://github.com/amidos2006/benchmark_experiments' target='_blank' >The PCG Benchmark Experiments Repository</a>, where the generators and fitness functions were imported from, to match the experiments from the paper.
                </ListItem>
                <ListItem sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1.5, color: 'primary.light' }}>
                        <CallMissedOutgoingIcon fontSize="small" sx={{ color: "#0a9580" }} />
                    </ListItemIcon>
                    <a href='https://bulbapedia.bulbagarden.net/wiki/Main_Page' target='_blank'>Bulbapedia</a>, for the Pokemon sprites and the various formulas and information.
                </ListItem>
            </List>
            <Box
                sx={{
                    mt: '2rem',
                    color: '#aaa',
                    fontSize: 14,
                    textAlign: 'center',
                    width: '100%',
                }}
            >
                PCG Benchmark Visualizer. Created by Boris Pavic.
            </Box>
        </Box>
    );
}

export default Credits;