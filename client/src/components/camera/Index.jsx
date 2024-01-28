import Camera from "./Camera";
import { getCookie } from "../cookie/Csrf";
import { useCallback, useState, useRef } from "react";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../partials/Alert";
import { useSelector } from "react-redux";

export default function Index() {
  const [uploading, setUploading] = useState(false);
  const { email } = useSelector((state) => state.auth.user);
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImg(imgSrc);
  }, [webcamRef]);

  async function matchFace() {
    setUploading(true);
    const formData = new FormData();
    formData.append("img", img);
    formData.append("email", email);
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
        SuccessAlert(result.data.res);
        setUploading(false);
      })
      .catch((err) => {
        ErrorAlert(err.response.data.res);
        setUploading(false);
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
        uploading={uploading}
      />
    </>
  );
}
