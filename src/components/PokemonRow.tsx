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
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 3,
        borderBottom: "1px solid #eee",
        flexWrap: "wrap",
      }}
    >
      <Typography variant="h6" color="text.secondary">
        ID: {pokemon.id}
      </Typography>
      <Avatar
        src={pokemon.sprite}
        alt={pokemon.name}
        sx={{ height: 120, width: 120 }}
      />
      <Typography
        variant="h5"
        sx={{ flexGrow: 1, textTransform: "capitalize" }}
      >
        {pokemon.name}
      </Typography>
      <Stack direction="row" spacing={1}>
        {pokemon.types.map((type) => (
          <Chip key={type} label={type} color="primary" variant="outlined" />
        ))}
      </Stack>
    </Box>
  );
};

export default PokemonRow;
