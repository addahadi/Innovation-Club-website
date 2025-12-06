import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EventsHero = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Set initial state and animate title
      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 50 });

        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Set initial state and animate paragraph
      if (textRef.current) {
        // Get the computed opacity from the text-zinc-400 class
        const computedStyle = window.getComputedStyle(textRef.current);
        const targetOpacity = computedStyle.opacity;

        gsap.set(textRef.current, { opacity: 0, y: 30 });

        gsap.to(textRef.current, {
          opacity: targetOpacity, // Animate to the actual zinc-400 opacity
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        });
      }

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="relative pb-10 px-4 sm:px-6 lg:px-8 pt-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        <div>
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {language.title}{" "}
            <span className="text-green-500">{language.subtitle}</span>
          </h1>

          <p ref={textRef} className="text-xl text-zinc-400 max-w-3xl mb-8">
            {language.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
