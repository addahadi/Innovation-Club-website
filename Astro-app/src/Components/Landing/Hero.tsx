import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import db from "../../../db/firebase";
import { doc, getDoc, type DocumentData } from "firebase/firestore";

function Hero({ language }: { language: any }) {

  const [HeroData , setHeroData] = useState<DocumentData | null>(null);
  
  useEffect(() => {
      fetchData();
  },[])


  const FilteredData = language.type === "en" ?  HeroData?.en : HeroData?.fr;
  
  async function fetchData() {
    try {

      const aboutDocRef = doc(db , "content", "Hero");

      const aboutDocSnap = await getDoc(aboutDocRef);

      if (aboutDocSnap.exists()) {
        const data = aboutDocSnap.data();
        setHeroData(data);
        console.log("Hero Data:", data);
      } else {
        console.log("No such document!");
        setHeroData(null);
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
      setHeroData(null);
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white font-bold mb-4 sm:mb-6 lg:mb-8 tracking-tight">
          {FilteredData?.title || language.content.hero.title}
        </h1>

        {/* Subtitle */}
        <p className=" max-w-2xl text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 lg:mb-12 mx-auto leading-relaxed px-4 sm:px-0">
         {
          FilteredData?.description
         }
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 px-4 sm:px-0">
          <button className="group cursor-pointer flex items-center justify-center gap-2 border border-green-500 text-green-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-green-700 hover:border-green-400 transition-all duration-300">
            <span>{FilteredData?.buttonText}</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
