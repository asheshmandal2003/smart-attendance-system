import Camera from "./Camera";
import { getCookie } from "../cookie/Csrf";
import { useCallback, useState, useRef } from "react";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../partials/Alert";
import { useSelector } from "react-redux";

export default function Index() {
  const [uploading, setUploading] = useState(() => false);
  const [coords, setCoords] = useState(null);
  const { first_name, last_name, email } = useSelector(
    (state) => state.auth.user
  );
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(async () => {
    const imgSrc = webcamRef.current.getScreenshot();
    setImg(imgSrc);
  }, [webcamRef]);

  async function parseLocation() {
    return new Promise((resolve, reject) => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (data) => {
            const coord = {
              lat: data.coords.latitude,
              lon: data.coords.longitude,
            };
            resolve(coord);
          },
          (err) => {
            reject("Location is required!");
          }
        );
      } catch (err) {
        reject("Geolocation is not supported in this browser");
      }
    });
  }

  async function matchFace() {
    try {
      setUploading(true);
      if (!coords) {
        const coordinates = await parseLocation();
        setCoords(coordinates);
      }
      const formData = new FormData();
      formData.append("img", img);
      formData.append("email", email);
      formData.append("name", `${first_name} ${last_name}`);
      formData.append("latitude", coords.lat);
      formData.append("longitude", coords.lon);

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
        })
        .catch((err) => {
          ErrorAlert(err.response.data.res);
        });
    } catch (err) {
      ErrorAlert(err);
    }
    setUploading(false);
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
