import React, { useEffect, useRef, useState } from "react";
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
import { doc, getDoc, type DocumentData } from "firebase/firestore";
import db from "../../../db/firebase";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ChartDataPoint {
  year: string | number;
  events: number;
  members: number;
}

interface ChartProps {
  language: {
    type: "en" | "fr";
    content: any;
  };
}

const Chart: React.FC<ChartProps> = ({ language }) => {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchChartData();
  }, []);

  async function fetchChartData() {
    setIsLoading(true);
    try {
      const chartDocRef = doc(db, "content", "Chart");
      const docSnap = await getDoc(chartDocRef);

      if (docSnap.exists()) {
        const fetchedData = docSnap.data() as DocumentData;
        const stateData = fetchedData.stats;
        console.log(stateData)
        if (stateData) {
          // Transform the object { "0": {...}, "1": {...} } into a sorted array
          const transformedData: ChartDataPoint[] = Object.keys(stateData)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((key) => {
              return {
                year: stateData[key].year,
                events: stateData[key].events,
                members: stateData[key].members,
              };
            });
            console.log(transformedData)
          setChartData(transformedData);
        }
      } else {
        console.log("No 'Chart' document found!");
      }
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // --- GSAP Animation Logic (Unchanged) ---

  useEffect(() => {
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

    return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
  }, []);

  // --- Rendering ---

  return (
    <div className="w-full min-h-[80vh] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="w-full max-w-7xl mx-auto">
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
        >
          {language.content.title}
        </h2>
        <p
          ref={textRef}
          className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-12"
        >
          {language.content.content}
        </p>
        <div ref={chartRef} className="w-full overflow-x-auto">
          {isLoading ? (
            <div className="w-full h-[500px] flex items-center justify-center bg-gray-800 rounded-lg animate-pulse text-gray-400">
              Loading Chart Data...
            </div>
          ) : chartData.length === 0 ? (
            <div className="w-full h-[500px] flex items-center justify-center bg-gray-800 rounded-lg text-red-400">
              No chart data available.
            </div>
          ) : (
            <div className=" w-[700px] md:w-full">
              <ResponsiveContainer width="100%" height={500}>
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="year" // 🎯 CRITICAL FIX: Changed dataKey to "year"
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
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="line"
                  />
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Chart;
