import { Routes, Route } from "react-router-dom";
import Signup from "./components/auth/signup/Signup";
import Signin from "./components/auth/signin/Signin";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Routes>
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <ToastContainer />
    </Box>
  );
}

export default App;
