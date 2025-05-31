import { Box } from "@mui/material";
import React from "react";

interface Props {
    align: 'start' | 'center' | 'end';
}

function Section(props: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: "100%", mt: 2 }}>
            <Box sx={{ fontSize: 26, fontWeight: 700, color: '#fff', mb: 2, display: 'flex', width: "100%", alignItems: 'start', justifyContent: props.align }}>
                Section Title
            </Box>
        </Box>
    );
}

export default Section;