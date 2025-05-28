import React from 'react';
import { Box, Card, Typography } from '@mui/material';

interface Props {
  individuals: string[];
}

export default function IndividualList({ individuals }: Props) {
  if (individuals.length === 0) {
    return <Typography>No individuals available.</Typography>;
  }
  return (
    <Box display="flex" gap={2}>
      {individuals.map((ind, idx) => (
        <Card key={idx} sx={{ minWidth: 200 }}>
          <Box p={2}>
            <Typography variant="h6">{ind}</Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}