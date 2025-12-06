import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

import db from "../../db/firebase";
import { collection, getDocs, type DocumentData } from "firebase/firestore";

gsap.registerPlugin(ScrollTrigger);

interface FaqItem {
  question: string;
  answer: string;
}

// --- Skeleton Component (Green Theme) ---
const FaqSkeleton = () => (
  <div className="space-y-4 animate-pulse">
    {/* Skeleton items simulating FAQ accordion structure */}
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="border-b border-b-green-600/30 py-4 px-4 sm:px-5">
        {/* Question line */}
        <div className="h-5 bg-green-700 rounded-md w-full"></div>
        {/* Answer space (optional, to mimic the height if it were open) */}
        {i === 1 && (
          <div className="mt-4 space-y-2">
            <div className="h-3 bg-green-700/80 rounded-md w-5/6"></div>
            <div className="h-3 bg-green-700/80 rounded-md w-full"></div>
            <div className="h-3 bg-green-700/80 rounded-md w-3/4"></div>
          </div>
        )}
      </div>
    ))}
  </div>
);
// --- End Skeleton Component ---

export default function FAQ({ language }: { language: any }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqData, setFaqData] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const headingRef = useRef(null);
  const faqContainerRef = useRef(null);

  const toggleFAQ = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    fetchData();
  }, [language.type]);

  async function fetchData() {
    setIsLoading(true);
    try {
      const faqsCollectionRef = collection(db, "faqs");
      const faqsSnapshot = await getDocs(faqsCollectionRef);

      const fetchedFaqs: FaqItem[] = [];
      faqsSnapshot.forEach((doc) => {
        const data = doc.data() as DocumentData;
        const langKey = language.type === "en" ? "en" : "fr";

        if (data[langKey]) {
          fetchedFaqs.push({
            question: data[langKey].question,
            answer: data[langKey].answer,
          });
        }
      });

      setFaqData(fetchedFaqs);
      console.log("FAQ Data:", fetchedFaqs);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
      setFaqData([]);
    } finally {
      setIsLoading(false);
    }
  }

  // Updated GSAP useEffect with fixes
  useEffect(() => {
    if (isLoading || faqData.length === 0) {
      return;
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Set initial state for heading before animating
      if (headingRef.current) {
        gsap.set(headingRef.current, { opacity: 0, y: 100 });

        gsap.to(headingRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
            toggleActions: "play none none reverse",
            // markers: true, // Uncomment for debugging
          },
        });
      }

      // Animate FAQ items
      const questions = gsap.utils.toArray(".faq-item");

      questions.forEach((el: any) => {
        // Set initial state before animating
        gsap.set(el, { opacity: 0, y: 50 });

        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            scrub: 1,
            toggleActions: "play none none reverse",
            // markers: true, // Uncomment for debugging
          },
        });
      });

      // Refresh ScrollTrigger after all animations are set up
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, faqData.length]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div ref={faqContainerRef}>
        {/* Heading */}
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12"
        >
          {language.content.FAQ.title}
        </h2>

        {/* Conditional Rendering */}
        {isLoading ? (
          <FaqSkeleton />
        ) : faqData.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {faqData.map((faq, index: number) => (
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
        ) : (
          <div className="text-gray-500 text-center py-10">
            No Frequently Asked Questions are currently available.
          </div>
        )}
      </div>
    </section>
  );
}
