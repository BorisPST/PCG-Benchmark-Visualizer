import React from 'react';
import { Box, Card, CardActionArea, Typography } from '@mui/material';
import type { Generation } from './Results';

interface Props {
  generations: Generation[];
  onSelect: (generation: Generation) => void;
}

export default function GenerationList({ generations, onSelect }: Props) {
  if (generations.length === 0) {
    return <Typography>No generations available.</Typography>;
  }
  return (
    <Box display="flex" gap={2}>
      {generations.map(gen => (
        <Card key={gen.id} sx={{ minWidth: 200 }}>
          <CardActionArea onClick={() => onSelect(gen)}>
            <Box p={2}>
              <Typography variant="h6">{gen.id}</Typography>
            </Box>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}