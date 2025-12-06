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
  // 1. Add loading state
  const [isLoading, setIsLoading] = useState(true);
  const headingRef = useRef(null);

  const toggleFAQ = (index: number | null) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    fetchData();
  }, [language.type]);

  async function fetchData() {
    // Set loading to true before the fetch starts
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
      // Set loading to false when the fetch is complete (success or error)
      setIsLoading(false);
    }
  }

  // Update GSAP useEffect to depend on loading state and data
  useEffect(() => {
    // Stop animation setup if data is still loading
    if (isLoading) {
      return;
    }

    // GSAP animation logic
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

    // Cleanup function for ScrollTrigger
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, faqData.length]); // Dependencies added

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div>
        {/* Heading remains the same */}
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 sm:mb-12"
        >
          {language.content.FAQ.title}
        </h2>

        {/* 3. Conditional Rendering */}
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
          // Handle case where data loading is complete but no FAQs were found
          <div className="text-gray-500 text-center py-10">
            No Frequently Asked Questions are currently available.
          </div>
        )}
      </div>
    </section>
  );
}
