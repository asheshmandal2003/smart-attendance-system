import axios from "axios";
import { sha1 } from "crypto-hash";

export const DeleteImg = async (public_id) => {
  if (public_id) {
    const timestamp = new Date().getTime();
    const string = `public_id=${public_id}&timestamp=${timestamp}${
      import.meta.env.VITE_CLOUDINARY_API_SECRET
    }`;
    const signature = await sha1(string);

    const formData = new FormData();

    formData.append("public_id", public_id);
    formData.append("signature", signature);
    formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append("timestamp", timestamp);

    return await axios({
      method: "POST",
      url: `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUD_NAME
      }/image/destroy`,
      data: formData,
    });
  }
};
