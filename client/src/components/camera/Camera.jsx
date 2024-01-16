import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { Box, Card, Stack } from "@mui/material";

const videoConstraints = {
  width: 800,
  height: 800,
  facingMode: "user",
};

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export default function Camera() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);
  const capture = useCallback(async () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImg(imgSrc);
  }, [webcamRef]);

  async function matchFace() {
    console.log("OK I'm called");
    const formData = new FormData();
    formData.append("img", img);
    await axios({
      method: "POST",
      url: "http://localhost:8000/match-face",
      data: formData,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken"),
      },
    })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <Card>
      <Stack spacing={4}>
        <Webcam
          audio={false}
          height={400}
          width={600}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <Box>
          <button onClick={capture}>Capture</button>
          {img !== null && <img src={img} alt="image" />}
          <button onClick={matchFace}>Upload</button>
        </Box>
      </Stack>
    </Card>
  );
}
