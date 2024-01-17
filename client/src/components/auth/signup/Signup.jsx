import Form from "./Form";
import { Card, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlexCenter } from "../../partials/FlexCenter";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "../../cookie/Csrf";

export default function Signup() {
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600px)");
  const [base64Image, setBase64Image] = useState(null);
  const [registering, setRegistering] = useState(false);

  const signup = async (values) => {
    setRegistering(true);
    const formdata = new FormData();
    for (let value in values) formdata.append(value, values[value]);
    // formdata.append("base64Image", base64Image);
    formdata.delete("picture")
    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken"),
      },
    })
      .then((result) => {
        console.log(result.data);
        navigate("/");
      })
      .catch((err) => {
        setRegistering(false);
        console.log(err.message);
      });
  };
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
        <Form
          phone={phone}
          setBase64Image={setBase64Image}
          registering={registering}
          setRegistering={setRegistering}
          signup={signup}
        />
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
