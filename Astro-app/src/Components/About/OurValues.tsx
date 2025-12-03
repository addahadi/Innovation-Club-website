import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Lightbulb, Users, Target, Rocket, Heart, Award } from "lucide-react";
gsap.registerPlugin(ScrollTrigger);

interface ValueProps {
  language: {
    title: string;
    content: string;
    values: Array<{
      name: string;
      description: string;
    }>;
  };
}

const iconMap = {
  Innovation: Lightbulb,
  Collaboration: Users,
  Excellence: Target,
  Impact: Rocket,
  Passion: Heart,
  Integrity: Award,
} as const;


const ValuesComponent: React.FC<ValueProps> = ({ language }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  const iconMap = {
    Innovation: Lightbulb,
    Collaboration: Users,
    Excellence: Target,
    Impact: Rocket,
    Passion: Heart,
    Integrity: Award,
  };

useEffect(() => {
  const cards = gsap.utils.toArray(".value-card");

  gsap.from(headingRef.current, {
    scrollTrigger: {
      start: "top 80%",
      end: "top 20%",
      trigger: headingRef.current,
      scrub: true,
    },
    opacity: 0,
    y: 50,
  });

  gsap.from(textRef.current, {
    scrollTrigger: {
      start: "top 80%",
      end: "top 20%",
      trigger: textRef.current,
      scrub: true,
    },
    opacity: 0,
    y: 20,
  });

  gsap.from(cards, {
    opacity: 0,
    y: 50,
    duration: 1,

    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top 80%",
      end: "top 20%",
      scrub: true,
    },
  });
  return () => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  };
}, []);


  return (
    <div ref={sectionRef} className="w-full text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 lg:text-left">
          <h2 ref={headingRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            {language.title}
          </h2>
          <p ref={textRef} className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto lg:mx-0">
            {language.content}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {language.values.map((value, i) => {
            const IconComponent = iconMap[value.name as keyof typeof iconMap];
            if (!IconComponent) return null;

            return (
              <div key={i} className="value-card bg-zinc-900 rounded-lg p-6 sm:p-8 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 transition-all duration-300 group">
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500" strokeWidth={2} />
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  {value.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-400">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ValuesComponent;
