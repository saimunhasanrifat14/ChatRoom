export const uploedCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ChatRoom");

  try {
    const Fetch = await fetch(
      "https://api.cloudinary.com/v1_1/df6bqehwu/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await Fetch.json();
    return data.secure_url; 
  } catch (err) {
    console.error("Upload failed", err);
    return null;
  }
};
