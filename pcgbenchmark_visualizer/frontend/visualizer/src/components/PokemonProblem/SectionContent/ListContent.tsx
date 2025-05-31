import { Box } from "@mui/material";
import React from "react";

interface Props {
    label: string;
    items: string[];
}

function ListContent(props: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "left", alignItems: "start", width: "100%", height: "100%"}}>
        {props.label}
        <Box sx={{ ml: 2, textAlign: "justify", height: "100%" }}>
            <ul>
                {props.items.map((item, index) => (
                    <li key={index} style={{ marginBottom: "0.5rem" }}>
                        {item}
                    </li>
                ))}
            </ul>
        </Box>
    </Box>
  );
}
export default ListContent;