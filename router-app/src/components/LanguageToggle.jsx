

import { Globe } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const LanguageToggle = ({
    setPreviewLang,
    previewLang
}) => {
  return (
    <div
      className="
        flex gap-2 
        bg-gray-900/40 
        backdrop-blur-md 
        border border-gray-700/60 
        rounded-2xl 
        px-3 py-1
        shadow-[0_4px_20px_rgba(0,0,0,0.25)]
        transition-all"
    >
      {" "}
      <Button
        size="sm"
        onClick={() => setPreviewLang("en")}
        className={
          previewLang === "en"
            ? " backdrop-blur-xl bg-green-700/30 hover:bg-green-700/40 text-white shadow-inner shadow-green-900/20"
            : " bg-transparent text-gray-400 hover:text-white hover:bg-gray-700/40 backdrop-blur-sm"

        }
      >
        <Globe className="w-4 h-4 mr-1" />
        EN
      </Button>
      <Button
        size="sm"
        onClick={() => setPreviewLang("fr")}
        className={
          previewLang === "fr"
            ? " backdrop-blur-xl bg-green-700/30 hover:bg-green-700/40 text-white shadow-inner shadow-green-900/20"
            : "bg-transparent text-gray-400 hover:text-white hover:bg-gray-700/40 backdrop-blur-sm"

        }
      >
        <Globe className="w-4 h-4 mr-1" />
        FR
      </Button>
    </div>
  );
}

export default LanguageToggle