import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import {gsap} from "gsap";

gsap.registerPlugin(ScrollTrigger);




const faqs = [
  {
    question: "What is our club about?",
    answer:
      "We are a student-led organization that aims to promote collaboration, learning, and innovation through workshops, events, and projects.",
  },
  {
    question: "How can I join the club?",
    answer:
      "You can join by filling out our membership form on the website. Once you apply, our team will contact you via email with next steps.",
  },
  {
    question: "Do I need prior experience to join?",
    answer:
      "Not at all! We welcome all students — whether you’re a beginner or an experienced member. We focus on learning together.",
  },
  {
    question: "When and where do we meet?",
    answer:
      "We usually hold weekly meetings every Thursday at 5 PM in Room 210. Check our social media or the events page for updates.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headingRef = useRef(null)
  const questionRef = useRef(null)
  const toggleFAQ = (index : number | null) => {
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

     questions.forEach((el : any) => {
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
     
         }
   }, []);

  return (
    <section className="max-w-7xl mx-auto px-8 min-h-screen mt-40">
      <h2 ref={headingRef} className="text-5xl font-bold  text-white mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4 flex flex-col gap-3">
        {faqs.map((faq, index) => (
          <div
            ref={questionRef}
            key={index}
            className="faq-item border-b border-b-green-600 py-2"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full px-5 py-4 text-left"
            >
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
