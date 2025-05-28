import React from "react";
import { Box, Card, CardActionArea, CircularProgress, Divider, Typography } from "@mui/material";
import type { Generator } from '../Results';
import { AnimatePresence, motion } from "framer-motion";
import "./GeneratorElement.css";

interface Props {
    gen: Generator;
    onSelect: () => void;
    onRun: () => void;
}

function GeneratorElement(props: Props) {
    const [hasBeenRan, setHasBeenRan] = React.useState<boolean>(false);
    const [runCompleted, setRunCompleted] = React.useState<boolean>(false);

    const runGeneratorHandler = () => {
      setHasBeenRan(true);
      props.onRun();
      setTimeout(() => setRunCompleted(true), 2000);
    }

    const generatorSelectedHandler = () => {
      if (hasBeenRan && runCompleted) {
        props.onSelect();
      }
    }

    return (
      <Card key={props.gen.id} sx={{ minWidth: 400, minHeight: 400, display: "flex", flexDirection: "column" }} className={"generator-card" + (hasBeenRan ? " contains-generations" : "")}
           onClick={generatorSelectedHandler}>
          <Box p={2} pb={1} mt={2} >
            <Typography variant="h4" style={{color: "white"}}>{props.gen.name}</Typography>
          </Box>
          <AnimatePresence mode="wait">
                {!hasBeenRan && (
                    <motion.div
                        key="not-ran"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                    >
                        <Box p={2} sx={{ p: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontStyle: "italic" }}>
                            <div className="no-generations-text">
                                No generations ran.
                            </div>
                        </Box>
                        <Divider sx={{ backgroundColor: 'white', width: "80%", margin: "auto", marginTop: "0.5rem" }} />
                        <Box p={2} sx={{ flexGrow: 1, display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                            {props.gen.parameters.map((item, index) => (
                                <Typography pb={1} key={index} variant="body1" color="white" className="generator-data-text" sx={{ fontStyle: 'italic', margin: "0 0.5rem" }}>
                                    {item}
                                </Typography>
                            ))}
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'end', justifyContent: 'center', marginBottom: "2rem" }}>
                            <div className="run-generator-button app-button" onClick={runGeneratorHandler}>
                                Run Generator
                            </div>
                        </Box>
                    </motion.div>
                )}

                {hasBeenRan && !runCompleted && (
                    <motion.div
                        key="running"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                    >
                        <Divider sx={{ backgroundColor: 'white', width: "80%", margin: "auto", marginTop: "0.5rem" }} />
                        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: "2rem"  }}>
                            <Typography variant="h6" color="white" sx={{ fontStyle: "italic"}}>
                                Running generator...
                            </Typography>
                          <CircularProgress color="primary" className="generator-progress"/>
                        </Box>
                    </motion.div>
                )}

                {runCompleted && (
                    <motion.div
                        key="ran"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.4 }}
                        style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                    >
                        <CardActionArea>
                            <Divider sx={{ backgroundColor: 'white', width: "80%", margin: "auto", marginBottom: "0.5rem", marginTop: "0.5rem" }} />
                            <Box p={2} sx={{ flexGrow: 1, gap: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h6" color="white" className="generator-score-text" sx={{ fontStyle: 'italic' }}>
                                    Quality: 1.0
                                </Typography>
                                <Typography variant="h6" color="white" className="generator-score-text" sx={{ fontStyle: 'italic' }}>
                                    Diversity: 1.0
                                </Typography>
                                <Typography variant="h6" color="white" className="generator-score-text" sx={{ fontStyle: 'italic' }}>
                                    Controlability: 1.0
                                </Typography>
                            </Box>
                            <Divider sx={{ backgroundColor: 'white', width: "80%", margin: "auto", marginTop: "0.5rem" }} />
                            <Box p={2} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "2rem" }}>
                                <Typography variant="body1" color="white" className="no-generations-text" sx={{ fontStyle: 'italic' }}>
                                    Click to view generations.
                                </Typography>
                            </Box>
                        </CardActionArea>
                    </motion.div>
                )}
            </AnimatePresence>
      </Card>
    )
}

export default GeneratorElement;