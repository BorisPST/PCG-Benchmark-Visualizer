import React, { useEffect } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import "./GeneratorSettings.css";
import type { GeneratorConfig } from "../../utils/type_utils";

interface Props {
    runGenerators: (config: GeneratorConfig) => void;
    onGeneratorConfigChange: (config: GeneratorConfig) => void;
}

const fitnessOptions = [
    { value: "fitness_quality", label: "Quality" },
    { value: "fitness_quality_control", label: "Quality-Controlability" },
    { value: "fitness_quality_control_diversity", label: "Quality-Controlability-Diversity" },
];

function GeneratorSettings(props: Props) {
    const [populationSize, setPopulationSize] = React.useState(100);
    const [numGenerations, setNumGenerations] = React.useState(10);
    const [fitnessFunction, setFitnessFunction] = React.useState("quality");

    const handleRun = () => {
        const config: GeneratorConfig = {
            generations: numGenerations,
            population_size: populationSize,
            fitness: fitnessFunction,
        };
        props.runGenerators(config)
    };

    useEffect(() => {
        const config: GeneratorConfig = {
            generations: numGenerations,
            population_size: populationSize,
            fitness: fitnessFunction,
        };
        props.onGeneratorConfigChange(config);
    }, [populationSize, numGenerations, fitnessFunction]);

  return (
        <Box
            className="generator-settings"
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                p: 2,
                background: "none",
                boxShadow: "none",
                borderRadius: 2,
                mb: 2,
                justifyContent: "center"
            }}>
            <Typography variant="h6" sx={{ minWidth: 120, mr: 2 }}>
                Generator Settings
            </Typography>
            <TextField
                label="Population Size"
                type="number"
                value={populationSize}
                onChange={e => setPopulationSize(Number(e.target.value))}
                size="small"
                sx={{ width: 120}}
                className="generator-settings-input"
            />
            <TextField
                label="Generations"
                type="number"
                value={numGenerations}
                onChange={e => setNumGenerations(Number(e.target.value))}
                size="small"
                sx={{ width: 160 }}
                className="generator-settings-input"
            />
            <FormControl size="small" sx={{ minWidth: 200 }} className="generator-settings-input">
                <InputLabel id="fitness-function-label">Fitness Function</InputLabel>
                <Select
                    labelId="fitness-function-label"
                    value={fitnessFunction}
                    label="Fitness Function"
                    onChange={e => setFitnessFunction(e.target.value)}
                    sx={{
                        "& .MuiSelect-select": {
                            textAlign: "left"
                        }
                    }}
                >
                    {fitnessOptions.map(opt => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ ml: 2 }}>
                <div className="run-generator-button app-button-primary" onClick={handleRun}>
                    Run Generators
                </div>
            </Box>
        </Box>
  );
}

export default GeneratorSettings;