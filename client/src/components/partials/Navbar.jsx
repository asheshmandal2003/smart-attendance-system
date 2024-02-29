import { Adb } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AvatarWithMenu from "./Avatar";
import { logout } from "../../../state/auth";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const phone = useMediaQuery("(max-width:1000px)");
  const [loggingOut, setLoggingOut] = useState(false);

  const logOut = async () => {
    setLoggingOut(true);
    dispatch(logout());
    setLoggingOut(false);
  };

  return (
    <AppBar position="static" sx={{ width: "100vw" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Adb
            sx={{
              display: {
                xs: phone ? "flex" : "none",
                md: phone ? "none" : "flex",
              },
              fontSize: phone ? 30 : 38,
              color: "#fff",
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            component="div"
            noWrap
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: {
                xs: phone ? "flex" : "none",
                md: phone ? "none" : "flex",
              },
              fontWeight: 500,
              fontSize: phone ? 16 : 20,
              color: "#fff",
              flexGrow: 1,
              cursor: "pointer",
            }}
          >
            Smart Attendance System
          </Typography>
          <Box>
            {user && (
              <AvatarWithMenu
                name={user.first_name}
                img={user.img_path}
                phone={phone}
                logOut={logOut}
                loggingOut={loggingOut}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
