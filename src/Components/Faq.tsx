import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ({ language }: { language: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingRef = useRef(null);

  const toggleFAQ = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });

    const questions = gsap.utils.toArray(".faq-item");

    questions.forEach((el: any) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div >
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 text-center sm:text-left"
        >
          {language.FAQ.title}
        </h2>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {language.FAQ.questions.map((faq: any, index: number) => (
            <div
              key={index}
              className="faq-item border-b border-b-green-600/30 hover:border-b-green-600 transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full px-4 sm:px-5 py-4 sm:py-5 text-left group"
              >
                <span className="font-medium text-base sm:text-lg text-gray-100 pr-4 group-hover:text-green-400 transition-colors duration-300">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transform transition-all duration-300 group-hover:text-green-400 flex-shrink-0
                    ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === index && faq.answer && (
                <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
