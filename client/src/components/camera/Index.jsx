import Camera from "./Camera";
import { getCookie } from "../cookie/Csrf";
import { useCallback, useState, useRef } from "react";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../partials/Alert";

export default function Index() {
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
        SuccessAlert("Face matches!")
        console.log(result.data);
      })
      .catch((err) => {
        ErrorAlert(err.response.data.res)
        console.log(err.message);
      });
  }
  return (
    <>
      <Camera
        img={img}
        setImg={setImg}
        webcamRef={webcamRef}
        capture={capture}
        matchFace={matchFace}
      />
    </>
  );
}
