import Form from "./Form";
import { Card, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FlexCenter } from "../../partials/FlexCenter";
import { useState } from "react";
import axios from "axios";
import { getCookie } from "../../cookie/Csrf";
import { UploadImg } from "../../../../cloudinary/UploadImg";
import { DeleteImg } from "../../../../cloudinary/DeleteImg";
import { ErrorAlert, SuccessAlert } from "../../partials/Alert";
import { useDispatch } from "react-redux";
import { login } from "../../../../state/auth";

export default function Signup() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600px)");
  const [registering, setRegistering] = useState(false);
  let url, public_id;

  const signup = async (values) => {
    setRegistering(true);
    const formdata = new FormData();

    for (let value in values) formdata.append(value, values[value]);
    formdata.delete("picture");

    await UploadImg(values)
      .then((response) => {
        url = response.data.url;
        public_id = response.data.public_id;
      })
      .catch((err) => ErrorAlert("Error! while uploading photo."));

    formdata.append("img_path", url);
    formdata.append("img_public_id", public_id);

    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/signup`,
      data: formdata,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken"),
      },
    })
      .then((response) => {
        dispatch(login({ user: response.data }));
        SuccessAlert("You're registered successfully!")
        navigate("/");
      })
      .catch((err) => {
        DeleteImg(public_id);
        ErrorAlert(err.message)
        setRegistering(false);
      });
  };
  return (
    <FlexCenter>
      <Card
        sx={{
          p: phone ? 3 : 4,
          pt: phone ? 3 : 5,
          pb: phone ? 4 : 5,
          mt: phone ? 5 : 6,
          mb: phone ? 5 : 6,
          width: phone ? "80%" : 400,
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" mb={4} fontWeight={600}>
          Sign Up
        </Typography>
        <Form phone={phone} registering={registering} signup={signup} />
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
