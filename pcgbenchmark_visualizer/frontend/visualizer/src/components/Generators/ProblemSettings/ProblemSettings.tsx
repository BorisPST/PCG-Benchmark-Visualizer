import React, { useContext } from "react";
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
  DialogContentText,
  Divider
} from "@mui/material";
import { defaultProblem, longProblem, rivalWinProblem, shortProblem, sweepProblem, toTheWireProblem } from "../../utils/type_utils";
import "./ProblemSettings.css";
import ProblemConfigContext from "../../../contexts/ProblemConfigContext";

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
  const problem = useContext(ProblemConfigContext);
  
  const [open, setOpen] = React.useState(false);
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
  const [survivingHpDisplay, setSurvivingHpDisplay] = React.useState<string>(""); 

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
      [field]: val
    }));
  };

  const handleHpDisplayChange = (value: string) => {
    setSurvivingHpDisplay(value);
    if (value === "" || isNaN(Number(value))) {
      handleCustomChange("surviving_hp_percentage", undefined);
    } else {
      const numValue = Number(value);
      if (numValue >= 0 && numValue <= 100) {
        handleCustomChange("surviving_hp_percentage", numValue / 100);
      } else {
        handleCustomChange("surviving_hp_percentage", undefined);
      }
    }
  };

  const isFormValid = () => {
    if (!customConfig.variant?.trim()) return false;

    if (customConfig.min_level !== undefined && (customConfig.min_level < 1 || customConfig.min_level > 100)) return false;
    if (customConfig.max_level !== undefined && (customConfig.max_level < 1 || customConfig.max_level > 100)) return false;
    if (customConfig.min_level !== undefined && customConfig.max_level !== undefined && customConfig.max_level < customConfig.min_level) return false;

    if (customConfig.min_turns !== undefined && customConfig.min_turns < 1) return false;
    if (customConfig.min_turns !== undefined && customConfig.max_turns !== undefined && customConfig.max_turns <= customConfig.min_turns) return false;
    
    if (survivingHpDisplay !== "") {
        const numHp = Number(survivingHpDisplay);
        if (isNaN(numHp) || numHp < 0 || numHp > 100) return false;
    }
    if (customConfig.diversity !== undefined && (customConfig.diversity < 0 || customConfig.diversity > 1)) return false;

    return true;
  };

  const handleSaveCustom = () => {
    if (isFormValid()) {
      props.onChange(customConfig);
      setOpen(false);
    }
  };

  const saveDisabled = !isFormValid();

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
            {problem.allConfigs.map((problem, i) => (
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
            <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <DialogContentText sx={{ fontSize: 14, mb: 2}}>
                    Note that you don't need to fill in every field. Defining 2-3 fields usually gives clearest results.
                </DialogContentText>
            
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.secondary', mt:1 }}>Variant</Typography>
                  <TextField
                      label="Variant Name"
                      value={customConfig.variant}
                      onChange={e => handleCustomChange("variant", e.target.value)}
                      placeholder="E.g. pokemonbattle-mycustom-v0"
                      required
                      fullWidth
                      error={!customConfig.variant?.trim()}
                      helperText={!customConfig.variant?.trim() ? "Variant name is required." : ""}
                      autoFocus
                  />
              </Box>
              <Divider sx={{mb:1}}/>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Content Quality</Typography>
                  <FormControl fullWidth>
                      <InputLabel id="winner-select-label">Winner</InputLabel>
                      <Select
                          labelId="winner-select-label"
                          label="Winner"
                          value={customConfig.winner ?? ""}
                          onChange={e => handleCustomChange("winner", e.target.value)}
                      >
                          <MenuItem value={0}>Player</MenuItem>
                          <MenuItem value={1}>Rival</MenuItem>
                      </Select>
                  </FormControl>
                  <TextField
                      label="Min Level"
                      type="number"
                      value={customConfig.min_level ?? ""}
                      onChange={e => handleCustomChange("min_level", e.target.value === "" ? undefined : Number(e.target.value))}
                      placeholder="1-100"
                      fullWidth
                      error={customConfig.min_level !== undefined && (customConfig.min_level < 1 || customConfig.min_level > 100)}
                  />
                  <TextField
                      label="Max Level"
                      type="number"
                      value={customConfig.max_level ?? ""}
                      onChange={e => handleCustomChange("max_level", e.target.value === "" ? undefined : Number(e.target.value))}
                      placeholder="1-100, >= Min Level"
                      fullWidth
                      error={
                          (customConfig.max_level !== undefined && (customConfig.max_level < 1 || customConfig.max_level > 100)) ||
                          (customConfig.min_level !== undefined && customConfig.max_level !== undefined && customConfig.max_level < customConfig.min_level)
                      }
                  />
                  <TextField
                      label="Surviving HP % (0-100)"
                      type="text"
                      value={survivingHpDisplay}
                      onChange={e => handleHpDisplayChange(e.target.value)}
                      placeholder="E.g., 20 for 20%"
                      fullWidth
                      error={
                          survivingHpDisplay !== "" && 
                          (isNaN(Number(survivingHpDisplay)) || Number(survivingHpDisplay) < 0 || Number(survivingHpDisplay) > 100)
                      }
                  />
              </Box>
              <Divider sx={{mb:1}}/>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Controllability</Typography>
                  <TextField
                      label="Min Turns"
                      type="number"
                      value={customConfig.min_turns ?? ""}
                      onChange={e => handleCustomChange("min_turns", e.target.value === "" ? undefined : Number(e.target.value))}
                      placeholder="Minimum 1"
                      fullWidth
                      error={customConfig.min_turns !== undefined && customConfig.min_turns < 1}
                  />
                  <TextField
                      label="Max Turns"
                      type="number"
                      value={customConfig.max_turns ?? ""}
                      onChange={e => handleCustomChange("max_turns", e.target.value === "" ? undefined : Number(e.target.value))}
                      placeholder="> Min Turns"
                      fullWidth
                      error={
                          customConfig.min_turns !== undefined && customConfig.max_turns !== undefined && customConfig.max_turns <= customConfig.min_turns
                      }
                  />
              </Box>
              <Divider sx={{mb:1}}/>
              
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 1 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>Diversity</Typography>
                  <TextField
                      label="Diversity Threshold (0-1)"
                      type="number"
                      value={customConfig.diversity ?? ""}
                      onChange={e => handleCustomChange("diversity", e.target.value === "" ? undefined : Number(e.target.value))}
                      placeholder="E.g. 0.3 (decimal)"
                      fullWidth
                      error={customConfig.diversity !== undefined && (customConfig.diversity < 0 || customConfig.diversity > 1)}
                  />
              </Box>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
                onClick={handleSaveCustom}
                variant="contained"
                color="primary"
                disabled={saveDisabled}
            >
                Save
            </Button>
            </DialogActions>
        </Dialog>
    </Box>
  );
}