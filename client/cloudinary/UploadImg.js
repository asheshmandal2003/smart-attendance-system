import axios from "axios";

export const UploadImg = async(values, onSuccess, onError) => {
    const formdata = new FormData()

    formdata.append("file", values["picture"]);
    formdata.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );
    formdata.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);

    return await axios({
        method: "POST",
        url: `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/upload`,
        data: formdata,
      })
}