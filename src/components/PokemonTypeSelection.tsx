"use client";

import { Box, Chip, Stack, Typography } from "@mui/material";

type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
};

const pokemonTypes = [
  "grass",
  "fire",
  "water",
  "bug",
  "normal",
  "poison",
  "electric",
  "ground",
  "fairy",
  "fighting",
  "psychic",
  "rock",
];

export const PokemonTypeSelection = ({
  selectedType,
  selectType,
}: PokemonTypeSelectionProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
        Filter by Type
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {pokemonTypes.map((type) => (
          <Chip
            key={type}
            label={type}
            onClick={() => selectType(selectedType === type ? undefined : type)}
            color={selectedType === type ? "primary" : "default"}
            variant={selectedType === type ? "filled" : "outlined"}
            sx={{
              textTransform: "capitalize",
              px: 1,
              fontWeight: selectedType === type ? "bold" : "normal",
            }}
          />
        ))}
      </Stack>
      {selectedType && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1, display: "block" }}
        >
          Showing all <strong>{selectedType}</strong> type Pokemon
        </Typography>
      )}
    </Box>
  );
};
