

export const uploadToCloudinary = async (file, imageField) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "innovation")

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/duw0bz1md/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return {
        success: true,
        url: data.secure_url,
        imageField: imageField,
        message: `${
          imageField === "image1" ? "Image 1" : "Image 2"
        } uploaded successfully!`,
      };
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      error: error.message,
      imageField: imageField,
    };
  }
};



export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "innovation"); // Keep your preset

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/duw0bz1md/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};