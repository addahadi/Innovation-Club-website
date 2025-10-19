import { ArrowRight } from "lucide-react";

function Hero({
  language
}: {
  language: Record<string , Record<string , string>>
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Grid pattern background */}

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
          {language.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {language.hero.subtitle}
          <span className="text-white font-semibold">
            {language.hero.subtitle_2}
          </span>{" "}
          {language.hero.subtitle_3}.
        </p>

        <div className=" flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            className="  cursor-pointer flex flex-row gap-2 items-center border border-green-500 text-green-400 px-8 py-3 rounded hover:bg-green-700 hover:border-green-400 transition"
          >
            {language.hero.joinButton}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;