"use client";

import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import { useRouter } from "next/navigation";
import {
  Container,
  Stack,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Box,
} from "@mui/material";

const navigationCards = [
  {
    title: "Single Search",
    path: "/search",
    desc: "Find a Pokemon by name",
    icon: <SearchIcon fontSize="large" />,
  },
  {
    title: "Pokemon Team",
    path: "/collections",
    desc: "View a collection of specific Pokemon",
    icon: <GroupIcon fontSize="large" />,
  },
  {
    title: "Global Pokedex",
    path: "/explore",
    desc: "Filter and browse the entire database",
    icon: <TravelExploreIcon fontSize="large" />,
  },
];

const Home = () => {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={2} alignItems="center" sx={{ mb: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{ fontWeight: 800, textAlign: "center" }}
        >
          Pokedex
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: "center", maxWidth: 600 }}
        >
          Select a module below to interact with the Pokemon database.
        </Typography>
      </Stack>

      <Grid container spacing={4}>
        {navigationCards.map((card) => (
          <Grid key={card.path} size={{ xs: 12, md: 4 }}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.02)" },
              }}
            >
              <CardActionArea
                onClick={() => router.push(card.path)}
                sx={{ height: "100%", p: 2 }}
              >
                <CardContent>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mb: 3 }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {card.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
