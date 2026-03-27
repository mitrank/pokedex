"use client";

import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Stack,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { api } from "~/trpc/react";
import PokemonRow from "~/components/PokemonRow";
import SearchIcon from "@mui/icons-material/Search";

const SearchPage = () => {
  const [input, setInput] = useState("");
  const [submittedName, setSubmittedName] = useState("");

  // tRPC hook to fetch a single pokemon
  const {
    data: pokemon,
    isLoading,
    isError,
    error,
  } = api.pokemon.getPokemon.useQuery(
    { name: submittedName.toLowerCase().trim() },
    { enabled: !!submittedName }, // Only fetch when there's a name
  );

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setSubmittedName(input);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Pokemon Search
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Enter a Pokemon name (like &quot;Pikachu&quot; or
          &quot;Bulbasaur&quot;) to retrieve its data from the SQL database.
        </Typography>

        <form onSubmit={handleSearch}>
          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              label="Pokemon Name"
              variant="outlined"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. Charizard"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!input.trim()}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Stack>
        </form>
      </Box>

      <Box sx={{ mt: 6 }}>
        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            {error.message || "Pokemon not found in our database."}
          </Alert>
        )}

        {pokemon && (
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <PokemonRow pokemon={pokemon} />
          </Box>
        )}

        {!pokemon && !isLoading && !isError && submittedName && (
          <Alert severity="info">
            No results found for &quot;{submittedName}&quot;
          </Alert>
        )}
      </Box>
    </Container>
  );
};

export default SearchPage;
