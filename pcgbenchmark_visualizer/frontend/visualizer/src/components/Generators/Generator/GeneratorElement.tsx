import React from "react";
import { Box, Card, CircularProgress, Divider, Typography } from "@mui/material";
import type { Generator } from "../../utils/type_utils";
import { AnimatePresence, motion } from "framer-motion";
import "./GeneratorElement.css";
import { RunContext } from "../../../contexts/RunContext";

interface Props {
    gen: Generator;
    onSelect: () => void;
}

function GeneratorElement(props: Props) {
    const runContext = React.useContext(RunContext);

    const generatorSelectedHandler = () => {
        if (runContext.currentRun > 0 && runContext.runCompleted) {
            props.onSelect();
        }
    }

    return (
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Card key={props.gen.id} sx={{ minWidth: 400, minHeight: 400, display: "flex", flexDirection: "column" }} className={"generator-card" + (runContext.currentRun > 0 ? " contains-generations" : "")}
            onClick={generatorSelectedHandler}>
            <Box p={2} pb={1} mt={2} >
              <Typography variant="h4" style={{color: "white"}}>{props.gen.name}</Typography>
            </Box>
            <AnimatePresence mode="wait">
                  {runContext.currentRun == 0 && props.gen.generations.length == 0 && (
                      <motion.div
                          key="not-ran"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.4 }}
                          style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                      >
                          <Box p={2} sx={{ p: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontStyle: "italic", marginTop: "0.5rem" }}>
                              <div className="no-generations-text">
                                  No generations ran.
                              </div>
                          </Box>
                          <Divider sx={{ backgroundColor: 'white', width: "80%", margin: "auto", marginTop: "0.5rem" }} />
                          <Box p={2} sx={{ flexGrow: 1, display: 'flex', flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}>
                              {props.gen.parameters.map((item, index) => (
                                  <Typography pb={1} key={index} variant="body1" color="white" className="generator-data-text" sx={{ fontStyle: 'italic', margin: "0 0.5rem" }}>
                                      {item.name}: {item.value}
                                  </Typography>
                              ))}
                          </Box>

                      </motion.div>
                  )}

                  {runContext.currentRun > 0 && !runContext.runCompleted && (
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

                  {runContext.runCompleted && (
                      <motion.div
                          key="ran"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -30 }}
                          transition={{ duration: 0.4 }}
                          style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                      >
                            <Divider sx={{ backgroundColor: 'white', width: "80%", margin: "auto", marginBottom: "0.5rem", marginTop: "0.5rem" }} />
                            <Box p={2} sx={{ flexGrow: 1, gap: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h6" color="white" className="generator-score-text" sx={{ fontStyle: 'italic' }}>
                                    Quality: {props.gen.scores?.q_score.toFixed(2)}
                                </Typography>
                                <Typography variant="h6" color="white" className="generator-score-text" sx={{ fontStyle: 'italic' }}>
                                    Diversity: {props.gen.scores?.d_score.toFixed(2)}
                                </Typography>
                                <Typography variant="h6" color="white" className="generator-score-text" sx={{ fontStyle: 'italic' }}>
                                    Controlability: {props.gen.scores?.c_score.toFixed(2)}
                                </Typography>
                            </Box>
                            <Divider sx={{ backgroundColor: 'white', width: "80%", margin: "auto", marginTop: "0.5rem" }} />
                            <Box p={2} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="body1" color="white" className="no-generations-text" sx={{ fontStyle: 'italic' }}>
                                    Click to view generations
                                </Typography>
                                
                            </Box>
                      </motion.div>
                  )}
              </AnimatePresence>
        </Card>
      </Box>
    )
}

export default GeneratorElement;