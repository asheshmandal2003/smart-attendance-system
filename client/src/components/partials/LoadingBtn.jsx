import React from "react";
import { LoadingButton } from "@mui/lab";

export default function LoadingBtn({
  width,
  btnText,
  loadingTxt,
  pos,
  startIcon,
  endIcon,
}) {
  return (
    <LoadingButton
      loading
      loadingIndicator={loadingTxt}
      loadingPosition={pos}
      endIcon={endIcon}
      startIcon={startIcon}
      variant="contained"
      sx={{ width: width }}
    >
      {btnText}
    </LoadingButton>
  );
}
