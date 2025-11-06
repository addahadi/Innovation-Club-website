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
         <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 
          ref={headingRef}
          
          className="text-6xl font-bold text-white mb-8">
            {language.title}
          </h2>
          
          <p 

          ref={textRef}
          className="text-2xl text-gray-400 mb-8 leading-relaxed ">
            {
              language.content
            }
          </p>

        </div>
      </section>
    )
}