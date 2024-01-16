import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Form({ phone, signin }) {
  const [visibility, setVisibility] = useState(false);
  const changeVisibility = () => setVisibility(!visibility);

  const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    picture: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(13, "Invalid ID!")
      .max(13, "Invalid ID!")
      .required("ID is required!"),
    picture: yup.string().required("Photo is required!"),
    password: yup
      .string()
      .min(8, "Password must contain 8 characters!")
      .required("Password is required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => signin(values),
    validationSchema,
  });

  return (
    <Stack
      spacing={4}
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: phone ? "88%" : "100%" }}
    >
      <FormControl>
        <InputLabel size={phone ? "small" : "normal"}>Username</InputLabel>
        <OutlinedInput
          fullWidth
          autoFocus
          label="Username"
          id="username"
          name="username"
          type="text"
          size={phone ? "small" : "normal"}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            Boolean(formik.touched.username) && Boolean(formik.errors.username)
          }
        />
        <Typography color="error" mt={1} variant="caption">
          {Boolean(formik.touched.username) && formik.errors.username}
        </Typography>
      </FormControl>
      <FormControl>
        <InputLabel size={phone ? "small" : "normal"}>Password</InputLabel>
        <OutlinedInput
          fullWidth
          label="Password"
          id="password"
          name="password"
          type={visibility ? "text" : "password"}
          size={phone ? "small" : "normal"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            Boolean(formik.touched.password) && Boolean(formik.errors.password)
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={changeVisibility}>
                {visibility ? (
                  <VisibilityOff fontSize={phone ? "small" : "normal"} />
                ) : (
                  <Visibility fontSize={phone ? "small" : "normal"} />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
        <Typography color="error" mt={1} variant="caption">
          {Boolean(formik.touched.password) && formik.errors.password}
        </Typography>
      </FormControl>
      <Button
        size={phone ? "small" : "normal"}
        variant="contained"
        type="submit"
      >
        Sign In
      </Button>
    </Stack>
  );
}
