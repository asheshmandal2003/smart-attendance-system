import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import {
  Visibility,
  VisibilityOff,
  EditOutlined,
  CloudUploadOutlined,
} from "@mui/icons-material";
import Dropzone from "react-dropzone";
import { FlexBetween } from "../../partials/FlexBetween";
import { useFormik } from "formik";
import * as yup from "yup";

export default function Form({ phone, signup }) {
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
    first_name: yup
      .string()
      .min(3, "First name must contain 3 characters!")
      .max(50, "First name can have max 50 characters!")
      .required("First name is required!"),
    last_name: yup
      .string()
      .min(3, "Last name must contain 3 characters!")
      .max(50, "Last name can have max 50 characters!")
      .required("Last name is required!"),
    username: yup
      .string()
      .min(13, "Invalid ID!")
      .max(13, "Invalid ID!")
      .required("ID is required!"),
    picture: yup.string().required("Photo is required!"),
    email: yup.string().email("Invalid email!").required("Email is required!"),
    password: yup
      .string()
      .min(8, "Password must contain 8 characters!")
      .required("Password is required!"),
  });

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => signup(values),
    validationSchema,
  });

  return (
    <Stack
      spacing={4}
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: phone ? "88%" : "100%" }}
    >
      <Stack direction={phone ? "column" : "row"} spacing={phone ? 4 : 3}>
        <FormControl>
          <InputLabel size={phone ? "small" : "normal"}>First Name</InputLabel>
          <OutlinedInput
            autoFocus
            fullWidth={phone ? true : false}
            label="First Name"
            id="first_name"
            name="first_name"
            type="text"
            size={phone ? "small" : "normal"}
            value={formik.values.first_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              Boolean(formik.touched.first_name) &&
              Boolean(formik.errors.first_name)
            }
          />
          <Typography color="error" mt={1} variant="caption">
            {Boolean(formik.touched.first_name) && formik.errors.first_name}
          </Typography>
        </FormControl>
        <FormControl>
          <InputLabel size={phone ? "small" : "normal"}>Last Name</InputLabel>
          <OutlinedInput
            fullWidth={phone ? true : false}
            label="Last Name"
            id="last_name"
            name="last_name"
            type="text"
            size={phone ? "small" : "normal"}
            value={formik.values.last_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              Boolean(formik.touched.last_name) &&
              Boolean(formik.errors.last_name)
            }
          />
          <Typography color="error" mt={1} variant="caption">
            {Boolean(formik.touched.last_name) && formik.errors.last_name}
          </Typography>
        </FormControl>
      </Stack>
      <FormControl>
        <InputLabel size={phone ? "small" : "normal"}>ID</InputLabel>
        <OutlinedInput
          fullWidth
          label="ID"
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
      <Box>
        <Box
          gridColumn="span 4"
          border={
            Boolean(formik.touched.picture) && Boolean(formik.errors.picture)
              ? "1px solid #b71c1c"
              : "1px solid #b0bec5"
          }
          borderRadius="5px"
          p="1rem"
          fontSize={phone ? "small" : "normal"}
          mb={1}
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) =>
              formik.setFieldValue("picture", acceptedFiles[0])
            }
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                border={`2px dashed #80d8ff`}
                p="1rem"
                sx={{ "&:hover": { cursor: "pointer" } }}
                fontSize={phone ? "small" : "normal"}
              >
                <input {...getInputProps()} />
                {!formik.values.picture ? (
                  <FlexBetween>
                    <Typography color="#757575" variant="body2">
                      Drag and drop your picture here
                    </Typography>
                    <CloudUploadOutlined />
                  </FlexBetween>
                ) : (
                  <FlexBetween>
                    <Typography>{formik.values.picture.name}</Typography>
                    <EditOutlined />
                  </FlexBetween>
                )}
              </Box>
            )}
          </Dropzone>
        </Box>
        <Typography color="error" variant="caption">
          {Boolean(formik.touched.picture) && formik.errors.picture}
        </Typography>
      </Box>
      <FormControl>
        <InputLabel size={phone ? "small" : "normal"}>Email</InputLabel>
        <OutlinedInput
          fullWidth
          label="Email"
          id="email"
          name="email"
          type="email"
          size={phone ? "small" : "normal"}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
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
      <Button
        size={phone ? "small" : "normal"}
        variant="contained"
        type="submit"
      >
        Sign Up
      </Button>
    </Stack>
  );
}
