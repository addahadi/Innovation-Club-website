import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { doc, getDoc, type DocumentData } from "firebase/firestore";
// Assume 'db' is correctly imported from your firebase config
import db from "../../../db/firebase";

gsap.registerPlugin(ScrollTrigger);

const WhoWeAreSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:py-16 lg:py-20 animate-pulse">
    <div className="h-10 bg-green-600 rounded w-1/3 mb-4 sm:mb-8"></div>

    <div className="space-y-4">
      <div className="h-5 bg-green-600 rounded w-full"></div>
      <div className="h-5 bg-green-600 rounded w-11/12"></div>
      <div className="h-5 bg-green-600 rounded w-10/12"></div>
      <div className="h-5 bg-green-600 rounded w-full"></div>
    </div>
  </div>
);

interface WhoWeAreProps {
  language: {
    type: "en" | "fr";
    content: {
      title: string; 
    };
  };
}

export default function WhoWeAre({ language }: WhoWeAreProps) {
  const headingRef = useRef(null);
  const textRef = useRef(null);

  const [data, setData] = useState<DocumentData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // FilteredData is now a string (the main body content)
  const FilteredData: string | undefined =
    language.type === "en" ? data?.en : data?.fr;

  useEffect(() => {
    fetchWhoWeAreData();
  }, [language.type]); // Dependency on language.type added here

  async function fetchWhoWeAreData() {
    setIsLoading(true);
    try {
      const whoWeAreDocRef = doc(db, "content", "Whoweare");
      const docSnap = await getDoc(whoWeAreDocRef);

      if (docSnap.exists()) {
        const fetchedData = docSnap.data();
        setData(fetchedData);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching 'Who We Are' data:", error);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // GSAP only runs when loading is done AND FilteredData (the string) exists
    // We check if FilteredData is a non-empty string.
    if (
      isLoading ||
      typeof FilteredData !== "string" ||
      FilteredData.length === 0
    ) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    // GSAP animation for heading
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
        end: "top 30%",
        scrub: true,
      },
      opacity: 0,
      y: 40,
    });

    // GSAP animation for text content
    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 90%",
        end: "top 40%",
        scrub: true,
      },
      opacity: 0,
      y: 20,
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, FilteredData]); // Dependency is now the content string

  if (isLoading) {
    return <WhoWeAreSkeleton />;
  }

  if (!FilteredData || FilteredData.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-xl text-red-400">
          Error: Content for this section is unavailable.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:py-16 lg:py-20">
      <h1
        ref={headingRef}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-8"
      >
        {language.content.title}
      </h1>

      <p
        ref={textRef}
        className="text-sm sm:text-lg lg:text-xl text-gray-400 max-sm:leading-[40px] leading-[50px]"
      >
        {FilteredData}
      </p>
    </div>
  );
}
