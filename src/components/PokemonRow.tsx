import React from "react";
import { Avatar, Box, Chip, Stack, Typography } from "@mui/material";

interface PokemonRowProps {
  pokemon: {
    id: number;
    name: string;
    types: string[];
    sprite: string;
  };
}

const PokemonRow = ({ pokemon }: PokemonRowProps) => {
  return (
    <Box>
      <Typography>ID: {pokemon.id}</Typography>
      <Avatar
        src={pokemon.sprite}
        alt={pokemon.name}
        sx={{ height: 60, width: 60 }}
      />
      <Typography>Name: {pokemon.name}</Typography>
      <Stack direction="row" spacing={1}>
        {pokemon.types.map((type) => (
          <Chip key={type} label={type} color="primary" variant="outlined" />
        ))}
      </Stack>
    </Box>
  );
};

export default PokemonRow;
