import React from "react";
import { LoadingButton } from "@mui/lab";

export default function LoadingBtn({ btnText, loadingTxt, pos }) {
  return (
    <LoadingButton loading loadingIndicator={loadingTxt} loadingPosition={pos} variant="outlined">
      {btnText}
    </LoadingButton>
  );
}
