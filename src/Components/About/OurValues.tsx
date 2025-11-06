import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lightbulb, Users, Target, Rocket, Heart, Award } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ValuesComponent = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null)
  const textRef = useRef(null)
  const values = [
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We embrace creativity and bold thinking to push boundaries and explore new possibilities in technology.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork, where diverse perspectives unite to create extraordinary solutions.",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for the highest quality in everything we do, continuously learning and improving our craft.",
    },
    {
      icon: Rocket,
      title: "Impact",
      description:
        "We focus on creating meaningful change that empowers individuals and communities through technology.",
    },
    {
      icon: Heart,
      title: "Passion",
      description:
        "We are driven by genuine enthusiasm for technology and its potential to transform the world around us.",
    },
    {
      icon: Award,
      title: "Integrity",
      description:
        "We maintain honesty, transparency, and ethical practices in all our projects and interactions.",
    },
  ];
  
  useEffect(() => {
    const cards = gsap.utils.toArray(".value-card");


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

    gsap.from(cards, {
      opacity: 0,
      y: 50,
      duration: 1,

      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end : "top 20%",
        scrub : true
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <h2 
          
          ref={headingRef}
          className="text-5xl font-bold mb-6">Our Values</h2>
          <p 
          ref={textRef}
          
          className="text-gray-400 text-lg max-w-3xl mx-auto md:mx-0">
            These core principles guide our actions, decisions, and the way we
            work together to achieve our mission.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={i}
                className="value-card bg-zinc-900 rounded-lg p-8 border border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-800 transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <Icon
                      className="w-7 h-7 text-emerald-500"
                      strokeWidth={2}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-emerald-500 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>

                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-500 to-emerald-400 group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ValuesComponent;
