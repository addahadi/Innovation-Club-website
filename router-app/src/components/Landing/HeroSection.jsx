import { Languages } from "lucide-react";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";
import { useEffect } from "react";

const HeroSection = () => {
  const [heroData, setHeroData] = useState({
    en: {
      title: "Welcome to Our Platform",
      description:
        "Transform your ideas into reality with our innovative solutions.",
      buttonText: "Get Started",
    },
    fr: {
      title: "Bienvenue sur notre plateforme",
      description:
        "Transformez vos idées en réalité avec nos solutions innovantes.",
      buttonText: "Commencer",
    },
    buttonUrl: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(heroData)
    fetchHeroData();
    console.log(heroData)
  }, []);

  const fetchHeroData = async () => {
    try {
      setLoading(true);
      const docRef = doc(db, "content", "Hero");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setHeroData(docSnap.data());
      }
  
    } 
    catch (error) {
      console.error("Error fetching data:", error);
      setMessage("Error loading data: " + error.message);
    } 
    finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const saveHeroData = async () => {
    try {
      setSaving(true);
      const docRef = doc(db, "content", "Hero");
      await setDoc(docRef, heroData);
      setMessage("Data saved successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage("Error saving data: " + error.message);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  function handleHeroChange(language, field, value) {
    if (language === null) {
      setHeroData((prev) => ({ ...prev, [field]: value }));
    } else {
      setHeroData((prev) => ({
        ...prev,
        [language]: { ...prev[language], [field]: value },
      }));
    }
  }

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
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="">
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error")
                ? "bg-red-500/20 text-red-300 border border-red-500"
                : "bg-green-500/20 text-green-300 border border-green-500"
            }`}
          >
            {message}
          </div>
        )}

        <div className="space-y-6">
          {/* English Version */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Languages className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">
                Hero Section - English
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <Input
                  type="text"
                  value={heroData.en.title}
                  onChange={(e) =>
                    handleHeroChange("en", "title", e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <Textarea
                  value={heroData.en.description}
                  onChange={(e) =>
                    handleHeroChange("en", "description", e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Button Text
                </label>
                <Input
                  type="text"
                  value={heroData.en.buttonText}
                  onChange={(e) =>
                    handleHeroChange("en", "buttonText", e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* French Version */}
          <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-6">
              <Languages className="w-6 h-6 text-green-400" />
              <h2 className="text-2xl font-bold text-white">
                Hero Section - French
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title
                </label>
                <Input
                  type="text"
                  value={heroData.fr.title}
                  onChange={(e) =>
                    handleHeroChange("fr", "title", e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <Textarea
                  value={heroData.fr.description}
                  onChange={(e) =>
                    handleHeroChange("fr", "description", e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Button Text
                </label>
                <Input
                  type="text"
                  value={heroData.fr.buttonText}
                  onChange={(e) =>
                    handleHeroChange("fr", "buttonText", e.target.value)
                  }
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Shared Button URL */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">
              Button URL
            </h3>
            <Input
              type="text"
              value={heroData.buttonUrl}
              onChange={(e) =>
                handleHeroChange(null, "buttonUrl", e.target.value)
              }
              placeholder="Enter button URL"
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>

          <Button
            onClick={saveHeroData}
            disabled={saving}
            className="w-full bg-green-600 hover:bg-green-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Hero Section Data"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;