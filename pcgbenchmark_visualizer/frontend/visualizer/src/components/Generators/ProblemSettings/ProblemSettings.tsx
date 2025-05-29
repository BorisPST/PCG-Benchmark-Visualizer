import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
  DialogContentText
} from "@mui/material";
import { defaultProblem, longProblem, rivalWinProblem, shortProblem, sweepProblem, toTheWireProblem } from "../../utils/type_utils";
import "./ProblemSettings.css";

interface ProblemConfig {
  variant: string;
  min_level?: number;
  max_level?: number;
  min_turns?: number;
  max_turns?: number;
  winner?: number;
  surviving_hp_percentage?: number;
  diversity?: number;
}

const predefinedVariants: ProblemConfig[] = [
    defaultProblem,
    longProblem,
    shortProblem,
    rivalWinProblem,
    toTheWireProblem,
    sweepProblem
];

interface Props {
  value: ProblemConfig;
  onChange: (config: ProblemConfig) => void;
}

export default function ProblemSettings(props: Props) {
  const [open, setOpen] = React.useState(false);
  const [definedVariants, setDefinedVariants] = React.useState<ProblemConfig[]>(predefinedVariants);
  const [customConfig, setCustomConfig] = React.useState<ProblemConfig>({
    variant: "",
    min_level: undefined,
    max_level: undefined,
    min_turns: undefined,
    max_turns: undefined,
    winner: undefined,
    surviving_hp_percentage: undefined,
    diversity: undefined
  });

  const handleVariantChange = (e: SelectChangeEvent<string>) => {
    const selected = predefinedVariants.find(p => p.variant === e.target.value);
    if (selected) {
      props.onChange(selected);
    } else {
      props.onChange({ ...props.value, variant: e.target.value });
    }
  };

  const handleOpenModal = () => {
    setCustomConfig({
      variant: "",
      min_level: undefined,
      max_level: undefined,
      min_turns: undefined,
      max_turns: undefined,
      winner: undefined,
      surviving_hp_percentage: undefined,
      diversity: undefined
    });
    setOpen(true);
  };

  const handleCustomChange = (field: keyof ProblemConfig, val: number | string | undefined) => {
    setCustomConfig(prev => ({
      ...prev,
      [field]: val === "" ? undefined : val
    }));
  };

  const handleSaveCustom = () => {
    if (customConfig.variant) {
      setDefinedVariants(prev => [...prev, customConfig]);
      props.onChange(customConfig);
      setOpen(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        p: 2,
        pt: 0,
        width: "85%",
        margin: "auto",
        background: "none",
        boxShadow: "none",
        borderRadius: 2,
        mb: 2,
        justifyContent: "center"
      }}
    >
        <Typography variant="h6" sx={{ minWidth: 120, mr: 5 }}>
            Problem Variant
        </Typography>
        <FormControl size="small" sx={{ minWidth: 300 }} className="generator-settings-input">
            <InputLabel id="variant-label">Variant</InputLabel>
            <Select
            labelId="variant-label"
            value={props.value.variant}
            label="Variant"
            onChange={handleVariantChange}
            className="generator-settings-input"
            sx={{
                "& .MuiSelect-select": {
                    textAlign: "left"
                }
            }}
            >
            {definedVariants.map((problem, i) => (
                <MenuItem key={i} value={problem.variant}>
                {problem.variant}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

        <Box sx={{ ml: 1, display: "flex", flexGrow: 1, justifyContent: "start" }}>
            <div className="new-problem-button app-button-secondary" onClick={handleOpenModal}>
                New Problem Variant
            </div>
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
            <DialogTitle>New Problem Config</DialogTitle>
            <DialogContentText sx={{ml: 3, fontSize: 14}}>Note that you don't need to fill in every field. Defining 2-3 fields usually gives clearest results.</DialogContentText>
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
                label="Variant"
                value={customConfig.variant}
                onChange={e => handleCustomChange("variant", e.target.value)}
                placeholder="E.g. pokemonbattle-newname-v0"
                required
                fullWidth
            />
            <TextField
                label="Min Level"
                type="number"
                value={customConfig.min_level ?? ""}
                onChange={e => handleCustomChange("min_level", e.target.value === "" ? undefined : Number(e.target.value))}
                placeholder="Between 1 and 100"
                fullWidth
            />
            <TextField
                label="Max Level"
                type="number"
                value={customConfig.max_level ?? ""}
                onChange={e => handleCustomChange("max_level", e.target.value === "" ? undefined : Number(e.target.value))}
                placeholder="Between 1 and 100, larger than min_level"
                fullWidth
            />
            <TextField
                label="Min Turns"
                type="number"
                value={customConfig.min_turns ?? ""}
                onChange={e => handleCustomChange("min_turns", e.target.value === "" ? undefined : Number(e.target.value))}
                placeholder="Minimum is 1 turn"
                fullWidth
            />
            <TextField
                label="Max Turns"
                type="number"
                value={customConfig.max_turns ?? ""}
                onChange={e => handleCustomChange("max_turns", e.target.value === "" ? undefined : Number(e.target.value))}
                placeholder="There is no maximum, but larger than min_turns"
                fullWidth
            />
            <TextField
                label="Winner"
                type="number"
                value={customConfig.winner ?? ""}
                onChange={e => handleCustomChange("winner", e.target.value === "" ? undefined : Number(e.target.value))}
                placeholder="0 for player win, 1 for enemy (rival) win"
                fullWidth
            />
            <TextField
                label="Surviving HP %"
                type="number"
                value={customConfig.surviving_hp_percentage ?? ""}
                onChange={e => handleCustomChange("surviving_hp_percentage", e.target.value === "" ? undefined : Number(e.target.value))}
                placeholder="Surviving Pokémon's HP, e.g. 0.5 for 50%"
                fullWidth
            />
            <TextField
                label="Diversity"
                type="number"
                value={customConfig.diversity ?? ""}
                onChange={e => handleCustomChange("diversity", e.target.value === "" ? undefined : Number(e.target.value))}
                placeholder="Diversity threshold (default 0.3)"
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
                onClick={handleSaveCustom}
                variant="contained"
                color="primary"
                disabled={!customConfig.variant}
            >
                Save
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
  );
}