import axios from "axios";

export const uploadImageToImgBB = async (imgFile) => {
  const formData = new FormData();
  formData.append("image", imgFile);
  

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_BB_API_KEY}`,
      formData
    );

 
    return response.data.data.url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};


// You can add more utility functions here as needed

//   cloudinary upload

//https://api.cloudinary.com/v1_1/<cloud name>/<resource_type>/upload


export const uploadImageToCloudinary = async (imgFile) => {
  const formData = new FormData();
  formData.append("file", imgFile);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    // ক্লাউডিনারি সরাসরি secure_url এ ইমেজের লিংক দেয়
    return response.data.secure_url; 
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};