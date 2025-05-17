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
    }

    return (
        <>
        {!open && (
                <IconButton
                    onClick={handleDrawerOpen}
                    sx={{
                        position: 'fixed',
                        top: 16,
                        left: 16,
                        zIndex: 1300,
                        background: '#fff',
                        boxShadow: 2,
                    }}
                    aria-label="Open menu"
                >
                    <MenuIcon />
                </IconButton>
            )}

            <Drawer
                anchor="left"
                open={open}
                onClose={handleDrawerClose}
                variant="temporary"
                PaperProps={{
                    sx: { width: 240, paddingTop: 2 }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mb: 2 }}>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Control Hub
                    </Typography>
                    <IconButton onClick={handleDrawerClose} aria-label="Close menu">
                        <ChevronLeftIcon />
                    </IconButton>
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