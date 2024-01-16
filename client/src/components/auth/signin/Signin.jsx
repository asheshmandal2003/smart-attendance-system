import Form from "./Form";
import { Card, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600px)");

  const signin = async () => {};

  return (
    <Card
      sx={{
        p: phone ? 0 : 5,
        pt: phone ? 3 : 5,
        pb: phone ? 4 : 5,
        mt: phone ? 5 : 6,
        mb: phone ? 0 : 6,
        width: phone ? "90%" : 450,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" mb={4} fontWeight={600}>
        Sign In
      </Typography>
      <Form phone={phone} signin={signin} />
      <Typography mt={5}>
        Don't have an account?{" "}
        <Typography
          component="span"
          color="primary"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => navigate("/auth/signup")}
        >
          Sign up
        </Typography>
      </Typography>
    </Card>
  );
}
