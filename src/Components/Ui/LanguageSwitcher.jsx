import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Detect current language from URL
    const path = window.location.pathname;
    if (path.startsWith("/fr")) {
      setCurrentLang("fr");
    } else {
      setCurrentLang("en");
    }
  }, []);

  const switchLanguage = () => {
    const currentPath = window.location.pathname;
    let newPath;

    if (currentLang === "en") {
      // Switch to French
      if (currentPath.startsWith("/en")) {
        newPath = currentPath.replace("/en", "/fr");
      } else if (currentPath === "/") {
        newPath = "/fr";
      } else {
        newPath = "/fr" + currentPath;
      }
    } else {
      // Switch to English
      if (currentPath.startsWith("/fr")) {
        newPath = currentPath.replace("/fr", "/en");
      } else {
        newPath = currentPath;
      }
    }

    window.location.href = newPath;
  };

  return (
    <button
      onClick={switchLanguage}
      className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-2.5 px-4 rounded-lg border border-green-600 transition-all duration-200 hover:border-green-500/50"
    >
      <span className="uppercase font-semibold">
        {currentLang === "en" ? "EN" : "FR"}
      </span>
    </button>
  );
}
