import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";

interface PokemonProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

export const PokedexTable = ({
  pokemonArray,
}: {
  pokemonArray: PokemonProps[];
}) => {
  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>ID</TableCell>
            <TableCell>Sprite</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Types</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pokemonArray.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>
                <Avatar src={p.sprite} />
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", textTransform: "capitalize" }}
              >
                {p.name}
              </TableCell>
              <TableCell>{p.types.join(", ")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
