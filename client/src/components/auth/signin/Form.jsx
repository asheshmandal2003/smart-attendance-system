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
import LoadingBtn from "../../partials/LoadingBtn";

export default function Form({ phone, signin, logging }) {
  const [visibility, setVisibility] = useState(false);
  const changeVisibility = () => setVisibility(!visibility);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string()
      .max(30, "⚠️ Email can have max 30 characters!")
      .required("⚠️ Email is required!"),
    password: yup
      .string()
      .min(8, "⚠️ Password must contain 8 characters!")
      .required("⚠️ Password is required!"),
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
        <InputLabel size={phone ? "small" : "normal"}>Email</InputLabel>
        <OutlinedInput
          fullWidth
          autoFocus
          label="Email"
          id="email"
          name="email"
          type="text"
          size={phone ? "small" : "normal"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            Boolean(formik.touched.email) && Boolean(formik.errors.email)
          }
        />
        <Typography color="error" mt={1} variant="caption">
          {Boolean(formik.touched.email) && formik.errors.email}
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
      {logging ? (
        <LoadingBtn btnText="Log In" />
      ) : (
        <Button
          size={phone ? "small" : "normal"}
          variant="contained"
          type="submit"
        >
          Sign In
        </Button>
      )}
    </Stack>
  );
}
