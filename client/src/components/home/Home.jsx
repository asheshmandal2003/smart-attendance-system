import React from "react";
import Navbar from "../navbar/Navbar";
import Camera from "../camera/Camera";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Camera />
    </Box>
  );
}
