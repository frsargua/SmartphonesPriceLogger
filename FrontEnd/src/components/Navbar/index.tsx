import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Container } from "@mui/system";
import { ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, mb: "5rem" }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar
            variant="dense"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Link to={"/"}>
                <HomeIcon />
              </Link>
            </IconButton>
            <Box>
              <ButtonBase sx={{ px: "1rem", py: "0.5rem" }}>
                <Typography variant="h6" color="inherit" component="div">
                  <Link to={"/create-brand"}>Create Brand</Link>
                </Typography>
              </ButtonBase>
              <ButtonBase sx={{ px: "1rem", py: "0.5rem" }}>
                <Typography variant="h6" color="inherit" component="div">
                  <Link to={"/compare"}>Compare</Link>
                </Typography>
              </ButtonBase>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
