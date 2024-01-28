import {
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useState } from "react";

export default function AvatarWithMenu({
  name,
  img,
  phone,
  logOut,
  loggingOut,
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        edge="end"
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
        sx={{ mr: 2 }}
      >
        <Avatar
          alt={name}
          src={img}
          sx={{ color: "#fff", fontSize: phone ? "medium" : "large" }}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ mt: "40px", padding: 5 }}
      >
        <MenuList sx={{ width: 200 }}>
          <MenuItem onClick={handleClose}>
            <Avatar
              sx={{ mr: 1, height: phone ? 26 : 36, width: phone ? 26 : 36 }}
            />{" "}
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar
              sx={{ mr: 1, height: phone ? 26 : 36, width: phone ? 26 : 36 }}
            />{" "}
            My Account
          </MenuItem>
          <Divider />
          <MenuItem onClick={logOut} disabled={loggingOut}>
            <ListItemIcon>
              <Logout color="error" fontSize={phone ? "small" : "medium"} />
            </ListItemIcon>
            <ListItemText>
              <Typography color="error">
                {loggingOut ? "Logging Out..." : "Logout"}
              </Typography>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
