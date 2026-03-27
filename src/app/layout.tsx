import { TRPCReactProvider } from "~/trpc/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import theme from "../theme";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />

              <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary" elevation={0}>
                  <Toolbar>
                    <Typography
                      variant="h6"
                      sx={{ flexGrow: 1, fontWeight: "bold" }}
                    >
                      POKEDEX
                    </Typography>
                    <Button color="inherit" component={Link} href="/">
                      Dashboard
                    </Button>
                  </Toolbar>
                </AppBar>
              </Box>

              <main>{children}</main>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
