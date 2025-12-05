import React, { useState, useEffect } from "react";
import { Image, Upload, X, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";

const GetToKnowUs = () => {
  const [aboutUs, setAboutUs] = useState({
    en: { leftText: "", rightText: "" },
    fr: { leftText: "", rightText: "" },
    image1: "",
    image2: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({ image1: false, image2: false });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "content", "Gettoknowus");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) setAboutUs(docSnap.data());
    } catch (error) {
      console.error("Error fetching data:", error);
      showMessage("Error loading data: " + error.message, true);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, isError = false) => {
    setMessage({ text: msg, error: isError });
    setTimeout(() => setMessage(""), 3000);
  };

  const handleImageChange = async (e, imageField) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/"))
      return showMessage("Please select an image file", true);

    setUploading((prev) => ({ ...prev, [imageField]: true }));

    try {
      const result = await uploadToCloudinary(file, imageField);
      if (result.success) {
        setAboutUs((prev) => ({ ...prev, [imageField]: result.url }));
        showMessage(result.message);
      } else showMessage("Error uploading image: " + result.error, true);
    } catch (err) {
      showMessage("Upload failed: " + err.message, true);
    } finally {
      setUploading((prev) => ({ ...prev, [imageField]: false }));
    }
  };

  const handleTextChange = (language, field, value) => {
    setAboutUs((prev) => ({
      ...prev,
      [language]: { ...prev[language], [field]: value },
    }));
  };

  const removeImage = (imageField) => {
    setAboutUs((prev) => ({ ...prev, [imageField]: "" }));
  };

  const saveData = async () => {
    try {
      setSaving(true);
      const docRef = doc(db, "content", "Gettoknowus");
      await setDoc(docRef, aboutUs);
      showMessage("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      showMessage("Error saving data: " + error.message, true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 space-y-8">
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.error
              ? "bg-red-500/20 text-red-300 border border-red-500"
              : "bg-green-500/20 text-green-300 border border-green-500"
          }`}
        >
          {message.text || message}
        </div>
      )}

      {/* Images Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {["image1", "image2"].map((img) => (
          <ImageUpload
            key={img}
            image={aboutUs[img]}
            uploading={uploading[img]}
            onImageChange={(e) => handleImageChange(e, img)}
            onRemoveImage={() => removeImage(img)}
            label={`Image ${img === "image1" ? "1" : "2"}`}
          />
        ))}
      </div>

      {/* English Section */}
      <LanguageSection
        language="English"
        leftText={aboutUs.en.leftText}
        rightText={aboutUs.en.rightText}
        onLeftTextChange={(val) => handleTextChange("en", "leftText", val)}
        onRightTextChange={(val) => handleTextChange("en", "rightText", val)}
      />

      {/* French Section */}
      <LanguageSection
        language="French"
        leftText={aboutUs.fr.leftText}
        rightText={aboutUs.fr.rightText}
        onLeftTextChange={(val) => handleTextChange("fr", "leftText", val)}
        onRightTextChange={(val) => handleTextChange("fr", "rightText", val)}
      />

      <Button
        onClick={saveData}
        disabled={saving || uploading.image1 || uploading.image2}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? "Saving..." : "Save Get to Know Us Data"}
      </Button>
    </div>
  );
};

export default GetToKnowUs;

// ------------------------
// Reusable Components
// ------------------------
const ImageUpload = ({
  image,
  uploading,
  onImageChange,
  onRemoveImage,
  label,
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    {image ? (
      <div className="relative">
        <img
          src={image}
          alt="Preview"
          className="w-full h-48 object-cover rounded-lg"
        />
        <Button
          onClick={onRemoveImage}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 p-2"
          disabled={uploading}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    ) : (
      <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
        <Image className="w-12 h-12 mx-auto text-gray-500 mb-2" />
        <p className="text-gray-400 text-sm mb-3">
          {uploading ? "Uploading..." : "Click to upload image"}
        </p>
        <Input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
          id={`upload-${label}`}
          disabled={uploading}
        />
        <label htmlFor={`upload-${label}`}>
          <Button
            type="button"
            className="bg-green-600 hover:bg-green-700"
            disabled={uploading}
            onClick={() => document.getElementById(`upload-${label}`).click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? "Uploading..." : "Select Image"}
          </Button>
        </label>
      </div>
    )}
  </div>
);

const LanguageSection = ({
  language,
  leftText,
  rightText,
  onLeftTextChange,
  onRightTextChange,
}) => (
  <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 space-y-6">
    <div className="flex items-center gap-2 mb-6">
      <Globe className="w-6 h-6 text-green-400" />
      <h2 className="text-2xl font-bold text-white">{language} Section</h2>
    </div>

    <div >
       <label className="block text-sm font-medium text-gray-300 mb-2">Left Text</label>
      <Textarea
        value={leftText}
        onChange={(e) => onLeftTextChange(e.target.value)}
        placeholder="Enter your text here..."
        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
      />
    </div>

    <div >
       <label className="block text-sm font-medium text-gray-300 mb-2">Right Text</label>
      <Textarea
        value={rightText}
        onChange={(e) => onRightTextChange(e.target.value)}
        placeholder="Enter your text here..."
        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
      />
    </div>
  </div>
);
