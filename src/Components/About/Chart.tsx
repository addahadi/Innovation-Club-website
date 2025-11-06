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

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


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

export default function Chart() {
  
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
    <div className="w-full  py-8 h-screen flex items-center mt-32 justify-center">
      <div className="w-full max-w-6xl">
        <h2 ref={headingRef} className="text-5xl font-bold  text-white  mb-8">
          Events & Members Over Time
        </h2>
        <p  ref={textRef} className="text-xl text-gray-400 mb-8">
          Track the growth of events and member count throughout the year
        </p>

        <ResponsiveContainer width="100%" height={500}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="month" stroke="#666" style={{ fontSize: "12px" }} />
            <YAxis yAxisId="left" stroke="#666" style={{ fontSize: "12px" }} />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#666"
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "4px",
                color: "#e5e7eb",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="events"
              stroke="#ff6b6b"
              strokeWidth={3}
              dot={false}
              name="Events Number"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="members"
              stroke="#4ecdc4"
              strokeWidth={3}
              dot={false}
              name="Member Number"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
