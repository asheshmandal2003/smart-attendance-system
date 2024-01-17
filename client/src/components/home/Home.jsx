import React from "react";
import Navbar from "../navbar/Navbar";
import { Box } from "@mui/material";
import { FlexCenter } from "../partials/FlexCenter";
import Index from "../camera/Index";

export default function Home() {
  return (
    <Box>
      <Navbar />
      <FlexCenter>
        <Index />
      </FlexCenter>
    </Box>
  );
}
