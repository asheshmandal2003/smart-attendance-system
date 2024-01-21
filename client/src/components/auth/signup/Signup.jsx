import Form from "./Form";
import { Card, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlexCenter } from "../../partials/FlexCenter";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "../../cookie/Csrf";
import { toast, Bounce } from "react-toastify";

export default function Signup() {
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600px)");
  const [registering, setRegistering] = useState(false);

  const signup = async (values) => {
    setRegistering(true);
    const formdata1 = new FormData();
    const formdata2 = new FormData()
    
    formdata1.append("file", values["picture"])
    formdata1.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)
    formdata1.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY)

    for (let value in values) formdata2.append(value, values[value]);
    formdata2.delete("picture");

    await axios({
      method: "post",
      url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`,
      data: formdata1
    })
    .then(async(res)=>{
      formdata2.append("img_path", res.data.url)
      await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup`,
        data: formdata2,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFTOKEN": getCookie("csrftoken"),
        },
      })
    })
    .then((result) => {
      toast.success("You're successfully registered!", {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      navigate("/");
    })
    .catch((err) => {
      setRegistering(false);
      toast.error(`${err.message}!`, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
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
          registering={registering}
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
