import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { doc, getDoc, type DocumentData } from "firebase/firestore";
import db from "../../../db/firebase";


const AboutSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8 animate-pulse">
    {/* Left Column Skeleton */}
    <div className="flex flex-col">
      <div className="h-10 bg-green-700 rounded w-3/4 mb-6 sm:mb-8"></div>{" "}
      {/* Title */}
      <div className="space-y-3 mb-6 sm:mb-8">
        <div className="h-4 bg-green-700 rounded w-full"></div>
        <div className="h-4 bg-green-700 rounded w-5/6"></div>
        <div className="h-4 bg-green-700 rounded w-full"></div>
      </div>{" "}
      {/* Text block */}
      <div className="h-96 bg-green-700 rounded-2xl"></div> {/* Image block */}
    </div>

    {/* Right Column Skeleton */}
    <div className="flex flex-col">
      <div className="h-96 bg-green-700 rounded-2xl mb-6 sm:mb-8"></div>{" "}
      {/* Image block */}
      <div className="space-y-3 mb-6 sm:mb-8">
        <div className="h-4 bg-green-700 rounded w-full"></div>
        <div className="h-4 bg-green-700 rounded w-5/6"></div>
      </div>{" "}
      {/* Text block */}
      <div className="h-12 w-32 bg-green-700 rounded-lg"></div>{" "}
      {/* Button block */}
    </div>
  </div>
);
// --- End Skeleton Component ---

interface AboutProps {
  language: Record<string, any>;
}

function About({ language }: AboutProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftTextRef = useRef<HTMLParagraphElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLImageElement>(null);
  const rightTextRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [Aboutdata, setAboutData] = useState<DocumentData | null>(null);
  // 1. Add loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const FilteredData = language.type === "en" ? Aboutdata?.en : Aboutdata?.fr;

  async function fetchData() {
    // Set loading to true before the fetch starts
    setIsLoading(true);
    try {
      const aboutDocRef = doc(db, "content", "Hero");
      const aboutDocSnap = await getDoc(aboutDocRef);

      if (aboutDocSnap.exists()) {
        const data = aboutDocSnap.data();
        setAboutData(data);
        console.log("Hero Data:", data);
      } else {
        console.log("No such document!");
        setAboutData(null);
      }
    } catch (error) {
      console.error("Error fetching hero data:", error);
      setAboutData(null);
    } finally {
      // Set loading to false when the fetch is complete (success or error)
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLoading || !FilteredData) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const timeoutId = setTimeout(() => {
      const isMobile = window.innerWidth < 768;

      gsap.set(titleRef.current, { opacity: 0, y: isMobile ? 30 : 50 });
      gsap.set(leftTextRef.current, { opacity: 0, y: isMobile ? 20 : 30 });
      gsap.set(leftImageRef.current, { opacity: 0, y: isMobile ? 20 : 30 });
      gsap.set(rightImageRef.current, {
        opacity: 0,
        x: isMobile ? 0 : 50,
        y: isMobile ? 20 : 0,
      });
      gsap.set(rightTextRef.current, { opacity: 0, y: isMobile ? 20 : 30 });
      gsap.set(buttonRef.current, { opacity: 0, y: isMobile ? 15 : 20 });

      const leftTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
          end: isMobile ? "top 30%" : "bottom 20%",
          scrub: isMobile ? 0.5 : true,
          toggleActions: "play none none none",
          once: false,
        },
      });

      leftTl
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: isMobile ? 0.6 : 1,
          ease: "power2.out",
        })
        .to(
          leftTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          leftImageRef.current,
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.6 : 1,
            ease: "power2.out",
          },
          "-=0.3"
        );

      const rightTl = gsap.timeline({
        scrollTrigger: {
          trigger: rightImageRef.current,
          start: "top 85%",
          end: isMobile ? "top 30%" : "bottom 20%",
          scrub: isMobile ? 0.5 : true,
          toggleActions: "play none none none",
          once: false,
        },
      });

      rightTl
        .to(rightImageRef.current, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: isMobile ? 0.6 : 1,
          ease: "power2.out",
        })
        .to(
          rightTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.5 : 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .to(
          buttonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.4 : 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [FilteredData, isLoading]);

  // 3. Conditional Rendering
  if (isLoading) {
    return (
      <div className="min-h-screen text-white">
        <AboutSkeleton />
      </div>
    );
  }

  // Handle case where data fetching failed and Aboutdata is null
  if (!FilteredData) {
    return (
      <div className="min-h-screen text-white flex justify-center items-center">
        <p className="text-xl text-red-400">
          Error loading content. Please try again later.
        </p>
      </div>
    );
  }

  // Render actual content once data is loaded
  return (
    <div className="min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6 lg:px-8">
        {/* Left Column */}
        <div className=" rounded-2xl flex flex-col ">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8"
          >
            {language.content.Get_to.title}
          </h1>

          <p
            ref={leftTextRef}
            className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed"
          >
            {FilteredData.leftText}
          </p>

          <div
            ref={leftImageRef}
            className="rounded-2xl overflow-hidden mb-6 sm:mb-8"
          >
            <img
              src={FilteredData.leftImage}
              alt="Innovation Team"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className=" rounded-2xl flex flex-col ">
          <div className="rounded-2xl overflow-hidden mb-6 sm:mb-8">
            <img
              ref={rightImageRef}
              src={FilteredData.rightImage}
              alt="Innovation Team"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div>
            <p
              ref={rightTextRef}
              className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed"
            >
              {FilteredData.rightText}
            </p>

            <button
              ref={buttonRef}
              className="w-full mt-auto sm:w-auto border border-green-500 text-green-400 px-6 sm:px-8 py-3 rounded-lg hover:bg-green-700 hover:border-green-400 transition-all duration-300 text-base sm:text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
