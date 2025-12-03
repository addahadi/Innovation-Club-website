import { useState, useEffect, useRef } from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EventsHero = ({
  language
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Animate title
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate paragraph
    gsap.fromTo(
      textRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
        delay: 0.2,
      }
    );

    return () => {
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
            {language.title} <span className="text-green-500">{language.subtitle}</span>
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
