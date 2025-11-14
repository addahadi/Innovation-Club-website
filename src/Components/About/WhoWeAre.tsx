import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target } from "lucide-react"
import { useEffect, useRef } from "react";


export default function WhoWeAre({
  language,
}: {
  language: Record<string, any>;
}) {
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:py-16 lg:py-20">
      <h1
        ref={headingRef}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-8"
      >
        {language.title}
      </h1>

      <p
        ref={textRef}
        className="text-sm sm:text-lg lg:text-xl text-gray-400 leading-relaxed"
      >
        {language.content}
      </p>
    </div>
  );
}
