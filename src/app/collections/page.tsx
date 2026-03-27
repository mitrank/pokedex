"use client";

import {
  Container,
  Typography,
  Box,
  Alert,
  Paper,
  TextField,
  Button,
  Stack,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { api } from "~/trpc/react";
import { PokedexTable } from "~/components/PokedexTable";
import { useState } from "react";

const CollectionsPage = () => {
  const [input, setInput] = useState("");
  const [pokemonNames, setPokemonNames] = useState<string[]>([]);

  const { data: pokemonArray, isLoading } =
    api.pokemon.getPokemonArray.useQuery(
      { names: pokemonNames },
      { enabled: pokemonNames.length > 0 },
    );

  const handleAddPokemon = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = input.toLowerCase().trim();
    if (trimmedName && !pokemonNames.includes(trimmedName)) {
      setPokemonNames((prev) => [...prev, trimmedName]);
      setInput("");
    }
  };

  const handleRemoveName = (name: string) => {
    setPokemonNames((prev) => prev.filter((n) => n !== name));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          Dynamic Pokemon Collections
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Add Pokemon names to the list below to fetch their data.
        </Typography>

        {/* Input form */}
        <Paper
          component="form"
          onSubmit={handleAddPokemon}
          sx={{ p: 2, mb: 4, display: "flex", gap: 2 }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Enter name (e.g. Pikachu)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            startIcon={<AddIcon />}
            disabled={!input.trim()}
          >
            Add
          </Button>
        </Paper>

        {/* List of entered pokemons */}
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ mb: 4 }}
        >
          {pokemonNames.map((name) => (
            <Chip
              key={name}
              label={name}
              onDelete={() => handleRemoveName(name)}
              sx={{ textTransform: "capitalize" }}
              color="secondary"
            />
          ))}
          {pokemonNames.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No Pokemon added yet.
            </Typography>
          )}
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* Final pokemon collection */}
        {pokemonNames.length > 0 ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              Live Database Results
            </Typography>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </Box>
            ) : (
              <PokedexTable pokemonArray={pokemonArray ?? []} />
            )}
            {pokemonArray &&
              pokemonArray.length < pokemonNames.length &&
              !isLoading && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                  Some Pokemon names were not found in the database.
                </Alert>
              )}
          </Box>
        ) : null}
      </Box>
    </Container>
  );
};

export default CollectionsPage;
