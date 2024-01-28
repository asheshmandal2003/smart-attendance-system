import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/auth/signup/Signup";
import Signin from "./components/auth/signin/Signin";
import Home from "./components/home/Home";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.auth.user);
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Routes>
        <Route
          path="/auth/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/auth/signin"
          element={!user ? <Signin /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/auth/signin" />}
        />
      </Routes>
      <ToastContainer />
    </Box>
  );
}

export default App;
