import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Check if device is mobile
    const isMobile = window.innerWidth < 768;

    // Timeline for left side
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
      .from(titleRef.current, {
        opacity: 0,
        y: isMobile ? 30 : 50,
        duration: isMobile ? 0.6 : 1,
        ease: "power2.out",
      })
      .from(
        leftTextRef.current,
        {
          opacity: 0,
          y: isMobile ? 20 : 30,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        leftImageRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: isMobile ? 20 : 30,
          duration: isMobile ? 0.6 : 1,
          ease: "power2.out",
        },
        "-=0.3"
      );

    // Timeline for right side
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
      .from(rightImageRef.current, {
        opacity: 0,
        scale: 0.95,
        x: isMobile ? 0 : 50,
        y: isMobile ? 20 : 0,
        duration: isMobile ? 0.6 : 1,
        ease: "power2.out",
      })
      .from(
        rightTextRef.current,
        {
          opacity: 0,
          y: isMobile ? 20 : 30,
          duration: isMobile ? 0.5 : 0.8,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        buttonRef.current,
        {
          opacity: 0,
          y: isMobile ? 15 : 20,
          duration: isMobile ? 0.4 : 0.6,
          ease: "power2.out",
          clearProps: "all",
        },
        "-=0.2"
      );

    // Ensure button is visible after animations complete
    gsap.set(buttonRef.current, { clearProps: "all" });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Left Column */}
        <div className="bg-neutral-950 p-6 sm:p-8 lg:p-12 rounded-2xl flex flex-col justify-center">
          <h1
            ref={titleRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8"
          >
            {language.Get_to.title}
          </h1>

          <p
            ref={leftTextRef}
            className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed"
          >
            {language.Get_to.left_content}
          </p>

          <div
            ref={leftImageRef}
            className="rounded-2xl overflow-hidden mb-6 sm:mb-8"
          >
            <img
              src="/about1.jpg"
              alt="Innovation Team"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-neutral-950 p-6 sm:p-8 lg:p-12 rounded-2xl flex flex-col justify-between">
          <div className="rounded-2xl overflow-hidden mb-6 sm:mb-8">
            <img
              ref={rightImageRef}
              src="/about1.jpg"
              alt="Innovation Team"
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
            />
          </div>

          <div>
            <p
              ref={rightTextRef}
              className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed"
            >
              {language.Get_to.right_content}
            </p>

            <button
              ref={buttonRef}
              className="w-full sm:w-auto border border-green-500 text-green-400 px-6 sm:px-8 py-3 rounded-lg hover:bg-green-700 hover:border-green-400 transition-all duration-300 text-base sm:text-lg"
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
