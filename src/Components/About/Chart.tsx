import React, { useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", events: 12, members: 145 },
  { month: "Feb", events: 18, members: 178 },
  { month: "Mar", events: 25, members: 210 },
  { month: "Apr", events: 22, members: 245 },
  { month: "May", events: 30, members: 289 },
  { month: "Jun", events: 35, members: 325 },
  { month: "Jul", events: 28, members: 358 },
  { month: "Aug", events: 32, members: 392 },
  { month: "Sep", events: 40, members: 430 },
  { month: "Oct", events: 38, members: 475 },
  { month: "Nov", events: 45, members: 520 },
  { month: "Dec", events: 42, members: 568 },
];

interface ChartProps {
  language: {
    title: string;
    content: string;
  };
}


const  Chart: React.FC<ChartProps> = ({ language }) => {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const chartRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    import("gsap").then((gsapModule) => {
      const gsap = gsapModule.default;

      import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
        const ScrollTrigger = ScrollTriggerModule.default;
        gsap.registerPlugin(ScrollTrigger);

        // Heading animation - slide from left with fade
        gsap.fromTo(
          headingRef.current,
          {
            opacity: 0,
            x: -20,
            scale: 0.9,
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
              end: "top 50%",
              scrub: 1,
            },
          }
        );

        // Text animation - slide from right with fade
        gsap.fromTo(
          textRef.current,
          {
            opacity: 0,
            x: 20,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );

        // Chart animation - scale up with fade and rotation
        gsap.fromTo(
          chartRef.current,
          {
            opacity: 0,
            scale: 0.8,
            rotationX: 15,
          },
          {
            opacity: 1,
            scale: 1,
            rotationX: 0,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: chartRef.current,
              start: "top 80%",
              end: "top 40%",
              scrub: 1.5,
            },
          }
        );
      });
    });

    return () => {
      // Clean up ScrollTrigger instances
      import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
        const ScrollTrigger = ScrollTriggerModule.default;
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      });
    };
  }, []);

  return (
    <div className="w-full min-h-[80vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-6xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
        >
          {language.title}
        </h2>
        <p
          ref={textRef}
          className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12"
        >
          {language.content}
        </p>
        <div ref={chartRef} className="w-full overflow-x-auto">
          <div className=" w-[700px]">
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="month"
                  stroke="#9CA3AF"
                  style={{ fontSize: "14px", fontWeight: 500 }}
                />
                <YAxis
                  yAxisId="left"
                  stroke="#9CA3AF"
                  style={{ fontSize: "14px" }}
                  label={{
                    value: "Events",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#ff6b6b",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#9CA3AF"
                  style={{ fontSize: "14px" }}
                  label={{
                    value: "Members",
                    angle: 90,
                    position: "insideRight",
                    fill: "#4ecdc4",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#e5e7eb",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="line" />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="events"
                  stroke="#ff6b6b"
                  strokeWidth={3}
                  dot={{ fill: "#ff6b6b", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Events Number"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="members"
                  stroke="#4ecdc4"
                  strokeWidth={3}
                  dot={{ fill: "#4ecdc4", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Member Number"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Chart