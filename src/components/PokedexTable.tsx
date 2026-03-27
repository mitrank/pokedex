import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  TablePagination,
} from "@mui/material";

interface PokemonProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

interface PokedexTableProps {
  pokemonArray: PokemonProps[];
  totalCount: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PokedexTable = ({
  pokemonArray,
  totalCount,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: PokedexTableProps) => {
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

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};
