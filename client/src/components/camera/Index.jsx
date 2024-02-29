import Camera from "./Camera";
import { getCookie } from "../cookie/Csrf";
import { useCallback, useState, useRef, useEffect } from "react";
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

  async function matchFace(lat, lon) {
    const formData = new FormData();
    formData.append("img", img);
    formData.append("email", email);
    formData.append("name", `${first_name} ${last_name}`);
    formData.append("latitude", lat);
    formData.append("longitude", lon);

    await axios({
      method: "POST",
      url: `${import.meta.env.VITE_BACKEND_BASE_URL}/match-face`,
      data: formData,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": getCookie("csrftoken"),
      },
    })
      .then((result) => {
        setUploading(false);
        return SuccessAlert(result.data.res);
      })
      .catch((err) => {
        setUploading(false);
        return ErrorAlert(err.response.data.res);
      });
  }

  async function submitAttendance() {
    setUploading(true);
    if (!coords) {
      await parseLocation()
        .then((res) => {
          setCoords(res);
          return matchFace(res.lat, res.lon);
        })
        .catch((err) => ErrorAlert(err));
    } else {
      return matchFace(coords.lat, coords.lon);
    }
  }

  return (
    <>
      <Camera
        img={img}
        setImg={setImg}
        webcamRef={webcamRef}
        capture={capture}
        matchFace={submitAttendance}
        uploading={uploading}
      />
    </>
  );
}
