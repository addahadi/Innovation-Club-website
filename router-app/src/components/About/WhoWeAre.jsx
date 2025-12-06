import { Edit2, Save, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// FIREBASE IMPORTS
import { db } from "../../../db/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import LanguageToggle from "../LanguageToggle";

const WhoWeAre = () => {
  const [content, setContent] = useState({
    en: "",
    fr: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState({ en: "", fr: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [previewLang, setPreviewLang] = useState("en");

  // Reference to the specific document
  const docRef = doc(db, "content", "Whoweare");

  // 1. FETCH DATA ON MOUNT
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContent(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching WhoWeAre content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEdit = () => {
    setTempContent({ ...content });
    setIsEditing(true);
  };

  // 2. SAVE DATA TO FIRESTORE
  const handleSave = async () => {
    if (!tempContent.en.trim() || !tempContent.fr.trim()) {
      showMessage("Error: Please fill in both languages", true);
      return;
    }

    try {
      // Use setDoc with merge: true so it creates the doc if it doesn't exist
      await setDoc(docRef, tempContent, { merge: true });

      setContent(tempContent);
      setIsEditing(false);
      showMessage("Content updated successfully!");
    } catch (error) {
      console.error("Error updating content:", error);
      showMessage("Error saving content to database", true);
    }
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <Card className=" mt-10">
        <CardContent className="pt-6">
          <p className="text-gray-400">Loading content...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className=" border-none bg-gray-900  mt-10">
      {message && (
        <div
          className={`m-6 mb-0 p-4 rounded-lg ${
            message.includes("Error")
              ? "bg-red-500/20 text-red-300 border border-red-500"
              : "bg-green-500/20 text-green-300 border border-green-500"
          }`}
        >
          {message}
        </div>
      )}

      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl text-gray-100 tracking-tight">
          Who We Are
        </CardTitle>
        {!isEditing && (
          <div className=" flex items-center gap-3">
            <LanguageToggle
              previewLang={previewLang}
              setPreviewLang={setPreviewLang}
            />
            <Button
              onClick={handleEdit}
              className="bg-transparent hover:bg-gray-700 text-green-400 hover:text-green-300 transition-colors p-2"
            >
              <Edit2 size={18} />
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {isEditing ? (
          <div className="space-y-6">
            {/* English Section */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <div className=" flex flex-row gap-3">
                <Textarea
                  value={tempContent.en}
                  onChange={(e) =>
                    setTempContent({ ...tempContent, en: e.target.value })
                  }
                  placeholder="Enter your organization's description in English..."
                  className="bg-gray-900 text-gray-100 border-gray-600 placeholder-gray-400 min-h-[120px]"
                />
                <Textarea
                  value={tempContent.fr}
                  onChange={(e) =>
                    setTempContent({ ...tempContent, fr: e.target.value })
                  }
                  placeholder="Entrez la description de votre organisation en français..."
                  className="bg-gray-900 text-gray-100 border-gray-600 placeholder-gray-400 min-h-[120px]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                className="bg-green-700 hover:bg-green-600 text-white"
              >
                <Save size={18} className="mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X size={18} className="mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {previewLang === "en" ? (
              <div className=" bg-gray-800 border-gray-600 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  English
                </h3>
                <p className="text-gray-300 leading-relaxed">{content.en}</p>
              </div>
            ) : (
              <div className=" bg-gray-800 border-gray-600 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">
                  French
                </h3>
                <p className="text-gray-300 leading-relaxed">{content.fr}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WhoWeAre;
