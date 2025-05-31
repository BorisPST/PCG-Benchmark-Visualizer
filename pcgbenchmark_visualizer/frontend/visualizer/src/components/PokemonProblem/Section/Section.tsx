import { Box } from "@mui/material";
import React from "react";

interface Props {
    align: 'start' | 'center' | 'end';
    title: string;
    description: string;
    content?: React.ReactNode;
    children?: React.ReactNode;
}

function Section(props: Props) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: props.align, justifyContent: props.align, width: '100%', mb: 4, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: props.align, justifyContent: "center" , width: "50%", mt: 2}}>
                <Box sx={{ fontSize: 26, fontWeight: 700, color: '#fff', mb: 2, display: 'flex', textAlign: props.align}}>
                    {props.title}
                </Box>
                <Box sx={{ fontSize: 16, color: '#fff', mb: 2, display: 'flex', width: "100%", textAlign: props.align }}>
                    {props.description}
                </Box>
                {props.content && (
                    <Box sx={{ width: "100%", height: "100%", display: 'flex', alignItems: 'start', justifyContent: props.align }}>
                        {props.content}
                    </Box>
                )}
            </Box>
            <Box sx={{ width: "50%", display: 'flex', justifyContent: props.align == 'start' ? 'end' : 'start', alignItems: 'end' }}>
                {props.children}
            </Box>
        </Box>
    );
}

export default Section;