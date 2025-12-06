import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { doc, getDoc, type DocumentData } from "firebase/firestore";
import db from "../../../db/firebase";

import {
  Lightbulb,
  Users,
  Target,
  Rocket,
  Heart,
  Award,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ValueSkeleton = () => (
  <div className="w-full text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 animate-pulse">
    <div className="max-w-7xl mx-auto">
      {/* Heading Skeleton */}
      <div className="mb-12 sm:mb-16 lg:text-left">
        <div className="h-10 bg-zinc-800 rounded w-1/3 mb-4 sm:mb-6"></div>
        <div className="h-5 bg-zinc-800 rounded w-2/3 max-w-3xl"></div>
      </div>

      {/* Cards Skeleton Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-zinc-900 rounded-lg p-6 sm:p-8 border border-zinc-800 h-[180px]"
          >
            <div className="mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                {/* Icon placeholder */}
              </div>
            </div>
            <div className="h-6 bg-zinc-800 rounded w-3/4 mb-2 sm:mb-3"></div>
            <div className="h-4 bg-zinc-800 rounded w-full"></div>
            <div className="h-4 bg-zinc-800 rounded w-5/6 mt-1"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const VALUE_KEYS = [
  "Innovation",
  "Collaboration",
  "Excellence",
  "Impact",
  "Passion",
  "Integrity",
] as const;

// Ensure this single iconMap is used
const iconMap: Record<(typeof VALUE_KEYS)[number], any> = {
  Innovation: Lightbulb,
  Collaboration: Users,
  Excellence: Target,
  Impact: Rocket,
  Passion: Heart,
  Integrity: Award,
} as const;

interface ValueProps {
  language: {
    type: "en" | "fr";
    content: any; 
  };
}

interface FetchedValue {
  name: string; // Translated title
  description: string;
  iconKey: (typeof VALUE_KEYS)[number]; // English key for icon lookup
}

const ValuesComponent: React.FC<ValueProps> = ({ language }) => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  const [valuesData, setValuesData] = useState<FetchedValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Data Fetching ---
  useEffect(() => {
    fetchValuesData();
  }, [language.type]); // Dependency on language.type for translation changes

  async function fetchValuesData() {
    setIsLoading(true);
    try {
      const valueDocRef = doc(db, "content", "Value");
      const docSnap = await getDoc(valueDocRef);

      if (docSnap.exists()) {
        const fetched = docSnap.data() as DocumentData;
        const valuesList = fetched.valuesList as Record<string, any>;

        if (valuesList) {
          const transformed: FetchedValue[] = Object.keys(valuesList)
            .sort((a, b) => parseInt(a) - parseInt(b)) // Sort by numerical key ("0", "1", ...)
            .map((key) => {
              const langData = valuesList[key][language.type];
              const index = parseInt(key);

              const englishKey = VALUE_KEYS[index];

              if (!langData || !englishKey) {
                console.error(
                  `Missing data for key ${key} in language ${language.type}`
                );
                return null;
              }

              return {
                name: langData.title, 
                description: langData.description,
                iconKey: englishKey, 
              };
            })
            .filter((item): item is FetchedValue => item !== null); // Remove null entries
            console.log(transformed)
          setValuesData(transformed);
        }
      }
    } catch (error) {
      console.error("Error fetching 'Value' data:", error);
      setValuesData([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLoading || valuesData.length === 0) return;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const cards = gsap.utils.toArray(".value-card");

      // Set initial state explicitly
      gsap.set(headingRef.current, { opacity: 0, y: 50 });
      gsap.set(textRef.current, { opacity: 0, y: 20 });
      gsap.set(cards, { opacity: 0, y: 50 });

      gsap.to(headingRef.current, {
        scrollTrigger: {
          start: "top 80%",
          end: "top 20%",
          trigger: headingRef.current,
          scrub: true,
        },
        opacity: 1,
        y: 0,
      });

      gsap.to(textRef.current, {
        scrollTrigger: {
          start: "top 80%",
          end: "top 20%",
          trigger: textRef.current,
          scrub: true,
        },
        opacity: 1,
        y: 0,
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.1,

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 80%",
          scrub: true,
        },
      });

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, valuesData]);

  if (isLoading) {
    return <ValueSkeleton />;
  }

  return (
    <div
      ref={sectionRef}
      className="w-full text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 lg:text-left">
          <h2
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
          >
            {language.content.title}
          </h2>
          <p
            ref={textRef}
            className="text-base sm:text-lg text-gray-400 max-w-3xl mx-auto lg:mx-0"
          >
            {language.content.content}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {valuesData.map((value, i) => {
            const IconComponent = iconMap[value.iconKey];
            if (!IconComponent) return null;
            console.log(value)
            return (
              <div
                key={i}
                className="value-card bg-zinc-900 rounded-lg p-6 sm:p-8 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 transition-all duration-300 group"
              >
                <div className="mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <IconComponent
                      className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-500"
                      strokeWidth={2}
                    />
                  </div>
                </div>
                {/* Use the translated name (title from Firestore) */}
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                  {value.name}
                </h3>
                {/* Use the translated description */}
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
