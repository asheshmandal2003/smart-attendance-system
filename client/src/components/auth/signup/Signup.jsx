import Form from "./Form";
import { Card, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlexCenter } from "../../partials/FlexCenter";

export default function Signup() {
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600px)");

  const signup = async (values) => {};
  return (
    <FlexCenter>
      <Card
        sx={{
          p: phone ? 0 : 5,
          pt: phone ? 3 : 5,
          pb: phone ? 4 : 5,
          mt: phone ? 5 : 6,
          mb: phone ? 5 : 6,
          width: phone ? "90%" : 450,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" mb={4} fontWeight={600}>
          Sign Up
        </Typography>
        <Form phone={phone} signup={signup} />
        <Typography mt={5}>
          Already have an account?{" "}
          <Typography
            component="span"
            color="primary"
            sx={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => navigate("/auth/signin")}
          >
            Sign in
          </Typography>
        </Typography>
      </Card>
    </FlexCenter>
  );
}
