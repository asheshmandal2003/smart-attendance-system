import { useState } from "react";
import Webcam from "react-webcam";
import { Button, Card, useMediaQuery } from "@mui/material";
import {
  AddAPhoto,
  AddAPhotoOutlined,
  CameraAlt,
  Send,
} from "@mui/icons-material";
import { FlexCenter } from "../partials/FlexCenter";
import { FlexBetween } from "../partials/FlexBetween";
import LoadingBtn from "../partials/LoadingBtn";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

export default function Camera({
  img,
  setImg,
  webcamRef,
  capture,
  matchFace,
  uploading,
}) {
  const [captureImg, setCaptureImg] = useState(false);
  const phone = useMediaQuery("(max-width:600px)");

  return (
    <Card
      sx={{
        width: phone ? "90%" : 600,
        mt: 5,
        mb: phone ? 0 : 7,
        pb: 4,
      }}
    >
      {img === null ? (
        <FlexCenter flexDirection="column" alignItems="center">
          {!captureImg ? (
            <>
              <AddAPhotoOutlined
                sx={{
                  height: phone ? "60%" : 300,
                  width: phone ? "60%" : 300,
                  color: "#9e9e9e",
                }}
              />
              <Button
                variant="contained"
                sx={{ mt: 4, width: phone ? "60%" : "40%" }}
                endIcon={<AddAPhotoOutlined />}
                onClick={() => setCaptureImg(!captureImg)}
              >
                Take Photo
              </Button>
            </>
          ) : (
            <>
              <Webcam
                audio={false}
                height={400}
                width={600}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
              />
              <Button
                variant="contained"
                endIcon={<AddAPhoto />}
                onClick={capture}
                sx={{ width: "40%" }}
              >
                Capture
              </Button>
            </>
          )}
        </FlexCenter>
      ) : (
        <FlexCenter flexDirection="column" alignItems="center">
          <img src={img} alt="photo" width={600} height={350} />
          <FlexBetween width="80%" p={4}>
            {uploading ? (
              <LoadingBtn
                width="45%"
                btnText="Upload"
                endIcon={<Send />}
                pos="end"
              />
            ) : (
              <Button
                variant="contained"
                color="success"
                endIcon={<Send />}
                sx={{ width: "45%" }}
                onClick={matchFace}
              >
                Upload
              </Button>
            )}
            <Button
              variant="contained"
              color="error"
              endIcon={<CameraAlt />}
              sx={{ width: "45%" }}
              onClick={() => setImg(null)}
            >
              Retake
            </Button>
          </FlexBetween>
        </FlexCenter>
      )}
    </Card>
  );
}
