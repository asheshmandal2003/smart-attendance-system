import React from "react";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";

export default function Navbar() {
  const navigate = useNavigate();
  const tab = useMediaQuery("(max-width:1000px)");
  return (
    <AppBar position="static" sx={{ width: "100vw" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            noWrap
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: tab ? "flex" : "none", md: tab ? "none" : "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            JIS
          </Typography>
          <IconButton
            edge="end"
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <AccountCircle sx={{ height: 40, width: 40 }} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
