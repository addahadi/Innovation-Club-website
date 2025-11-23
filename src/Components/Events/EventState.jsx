import { useEffect, useRef } from "react";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EventStats = ({
  language
}) => {
  const statsRef = useRef([]);

  const stats = [
    { number: 50, label: language["1"], suffix: "+" },
    { number: 2000, label: language["4"], suffix: "+" },
    { number: 30, label: language["2"], suffix: "+" },
    { number: 15, label: language["3"], suffix: "+" },
  ];

  useEffect(() => {
    statsRef.current.forEach((stat, index) => {
      if (!stat) return;

      gsap.fromTo(
        stat,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={(el) => (statsRef.current[index] = el)}
              className="text-center p-6 opacity-0 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-green-500/50 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                {stat.number}
                {stat.suffix}
              </div>
              <div className="text-zinc-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventStats;
