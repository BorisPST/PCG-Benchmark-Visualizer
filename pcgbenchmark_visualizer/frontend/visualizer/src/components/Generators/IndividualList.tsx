import React from 'react';
import { Box, Card, CircularProgress, Typography } from '@mui/material';
import type { Individual } from '../utils/type_utils';

interface Props {
  individuals: Individual[];
}

export default function IndividualList({ individuals }: Props) {
  if (individuals.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography variant="h6" color="white">
          Loading individuals...
        </Typography>
        <CircularProgress color="primary" className="generator-progress"/>
      </Box>
    )
  }
  return (
    <Box display="flex" gap={2}>
      {individuals.map((ind, idx) => (
        <Card key={idx} sx={{ minWidth: 200 }}>
          <Box p={2}>
            <Typography variant="h6">{ind.content.player_pokemon}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}