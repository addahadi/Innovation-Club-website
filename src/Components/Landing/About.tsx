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

    // Timeline for left side
    const leftTl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    leftTl
      .from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        leftTextRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        leftImageRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 30,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );

    // Timeline for right side
    const rightTl = gsap.timeline({
      scrollTrigger: {
        trigger: rightImageRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    rightTl
      .from(rightImageRef.current, {
        opacity: 0,
        scale: 0.9,
        x: 50,
        duration: 1,
        ease: "power3.out",
      })
      .from(
        rightTextRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        buttonRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );

    // Hover animation for button
    const button = buttonRef.current;
    if (button) {
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup
      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-40">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div className="bg-neutral-950 p-12 flex flex-col justify-center">
          <h1 ref={titleRef} className="text-6xl font-bold mb-8">
            {language.Get_to.title}
          </h1>

          <p
            ref={leftTextRef}
            className="text-gray-400 text-lg mb-8 leading-relaxed"
          >
            {language.Get_to.left_content}
          </p>

          <div ref={leftImageRef} className="rounded-2xl overflow-hidden mb-8">
            <img
              src="../../../public/about1.jpg"
              alt="Innovation Team"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="bg-neutral-950 p-12 flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center mb-8">
            <img
              ref={rightImageRef}
              src="../../../public/about2.jpg"
              alt="Innovation Team"
              className="w-full h-auto rounded-lg"
            />
          </div>

          <div>
            <p
              ref={rightTextRef}
              className="text-gray-400 text-lg mb-8 leading-relaxed"
            >
              {language.Get_to.right_content}
            </p>

            <button
              ref={buttonRef}
              className="border border-green-500 text-green-400 px-8 py-3 rounded hover:bg-green-700 hover:border-green-400 transition cursor-pointer"
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
