import { Box, Button } from "@mui/material";
import { FlexCenter } from "../partials/FlexCenter";
import Index from "../camera/Index";
import Navbar from "../partials/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import { getCookie } from "../cookie/Csrf";
import { ErrorAlert, SuccessAlert } from "../partials/Alert";

export default function Home() {
  const { id } = useSelector((state) => state.auth.user);
  console.log(id);

  async function fetchAttendanceDetails() {
    await axios
      .get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/v1/user/${id}/attendance`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFTOKEN": getCookie("csrftoken"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        SuccessAlert("Check the devtools console!");
      })
      .catch((err) => {
        console.log(err.response);
        ErrorAlert("Check the devtools console for error detials!");
      });
  }

  return (
    <Box>
      <Navbar />
      <FlexCenter sx={{ flexDirection: "column", alignItems: "center" }}>
        <Index />
        <Button onClick={fetchAttendanceDetails}>Fetch Attendance Data</Button>
      </FlexCenter>
    </Box>
  );
}
