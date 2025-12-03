import { ArrowRight } from "lucide-react";

function Hero({ language }: { language: any }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-white font-bold mb-4 sm:mb-6 lg:mb-8 tracking-tight">
          {language.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
          {language.hero.subtitle}
          <span className="text-white font-semibold">
            {language.hero.subtitle_2}
          </span>{" "}
          {language.hero.subtitle_3}.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-10 px-4 sm:px-0">
          <button className="group cursor-pointer flex items-center justify-center gap-2 border border-green-500 text-green-400 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-green-700 hover:border-green-400 transition-all duration-300">
            <span>{language.hero.joinButton}</span>
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
