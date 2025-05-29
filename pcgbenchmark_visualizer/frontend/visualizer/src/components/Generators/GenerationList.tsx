import React from 'react';
import { Box, Divider, Grid, Typography } from '@mui/material';
import type { Generation } from '../utils/type_utils';

interface Props {
  generations: Generation[];
  onSelect: (generation: Generation) => void;
}

export default function GenerationList(props: Props) {
  if (props.generations.length === 0) {
    return <Typography>No generations available.</Typography>;
  }
  return (
    <Box sx={{ width: "100%", mt: 2, margin: "auto" }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 1 }}>
        <Grid size="grow"><Typography align="center" fontWeight="bold">Generation #</Typography></Grid>
        <Grid size="grow"><Typography align="center" fontWeight="bold">Q_Score</Typography></Grid>
        <Grid size="grow"><Typography align="center" fontWeight="bold">C_Score</Typography></Grid>
        <Grid size="grow"><Typography align="center" fontWeight="bold">D_Score</Typography></Grid>

      </Grid>
      <Divider sx={{ mb: 1, borderBottomWidth: 1, borderColor: 'white', width: "100%" }} />
      {props.generations.map((gen, idx) => (
        <Grid container key={gen.id} spacing={2} alignItems="center" sx={{ mb: 1.5 }}>
          <Grid size="grow">
            <Typography align="center">{idx + 1}</Typography>
          </Grid>
          <Grid size="grow">
            <Typography align="center" sx={{ fontSize: 14 }}>
              {gen.scores.q_score.toFixed(2)}
            </Typography>
          </Grid>
          <Grid size="grow">
            <Typography align="center" sx={{ fontSize: 14 }}>
                {gen.scores.c_score.toFixed(2)}
            </Typography>
          </Grid>
          <Grid size="grow">
            <Typography align="center" sx={{ fontSize: 14 }}>
                {gen.scores.d_score.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}