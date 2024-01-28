import { Box } from "@mui/material";
import { FlexCenter } from "../partials/FlexCenter";
import Index from "../camera/Index";
import Navbar from "../partials/Navbar";

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
