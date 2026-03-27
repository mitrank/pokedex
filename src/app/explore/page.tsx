"use client";

import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { api } from "~/trpc/react";
import { PokemonTypeSelection } from "~/components/PokemonTypeSelection";
import { PokedexTable } from "~/components/PokedexTable";

const ExplorePage = () => {
  const [selectedType, setSelectedType] = useState<string | undefined>();

  const { data: pokemon, isLoading } = api.pokemon.getPokemonType.useQuery(
    { type: selectedType },
    { placeholderData: (prev) => prev },
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 900 }}>
          Global Pokedex
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse the entire database and filter by elemental attributes.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 4,
          border: "1px solid #eaeaea",
        }}
      >
        {/* Filteration */}
        <PokemonTypeSelection
          selectedType={selectedType}
          selectType={setSelectedType}
        />

        {/* Final table */}
        {isLoading && !pokemon ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress color="secondary" />
          </Box>
        ) : (
          <PokedexTable pokemonArray={pokemon ?? []} />
        )}
      </Paper>
    </Container>
  );
};

export default ExplorePage;
