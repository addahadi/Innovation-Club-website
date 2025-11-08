import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target } from "lucide-react"
import { useEffect, useRef } from "react";



export default function WhoWeAre({
    language
} : {
    language : Record<string , any>
}) {
    const headingRef = useRef(null)
    const textRef = useRef(null)
    useEffect(() => {
        gsap.from(headingRef.current , {
          scrollTrigger : {
            start : "top 80%",
            end:  "top 20%",
            trigger : headingRef.current,
            scrub : true
          },
          opacity : 0,
          y : 50
        })
        gsap.from(textRef.current, {
          scrollTrigger: {
            start: "top 80%",
            end: "top 20%",
            trigger: textRef.current,
            scrub: true,
          },
          opacity: 0,
          y: 20,
        });
            return () => {
                ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        
            }
    
      }, [])
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-12 sm:py-16 lg:py-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 sm:mb-8">
            {language.title}
          </h1>
          <p className="text-base  sm:text-lg lg:text-xl text-gray-400 leading-relaxed max-w-4xl">
            {language.content}
          </p>
        </div>
      </div>
    );
}