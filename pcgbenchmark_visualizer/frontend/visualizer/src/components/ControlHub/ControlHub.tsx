import React from 'react';
import './ControlHub.css';
import { Box, Button, Drawer, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface Props {
    onGenerateBattles: () => void;
}

function ControlHub(props: Props) {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);


    const simulateBattleButtonHandler = async () => {
        props.onGenerateBattles();
        handleDrawerClose();
    }

    return (
        <>
        {!open && (
                <IconButton
                    onClick={handleDrawerOpen}
                    sx={{
                        background: 'rgb(29, 29, 29)',
                        color: 'white',
                        transition: '0.2s',
                        '&:hover': {
                            background: '#fff',
                            color: 'rgb(29, 29, 29)',
                        }
                    }}
                    aria-label="Open menu"
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                anchor="right"
                open={open}
                onClose={handleDrawerClose}
                variant="temporary"
            >
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mb: 2 }}>
                    <IconButton onClick={handleDrawerClose} aria-label="Close menu">
                        <ChevronLeftIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
                        Control Hub
                    </Typography>
                    
                </Box>
                <Box sx={{ px: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={simulateBattleButtonHandler}
                        sx={{ mb: 2 }}
                    >
                        Generate Battles
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}
export default ControlHub;