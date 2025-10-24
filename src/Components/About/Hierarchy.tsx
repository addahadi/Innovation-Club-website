import gsap from "gsap";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const members = [
  {
    name: "President",
    img: "../../../public/unknown.png",
    tasks: "Oversees club operations and represents the club externally.",
  },
  {
    name: "Vice President",
    img: "../../../public/unknown.png",
    tasks:
      "Assists the President and takes over their duties in their absence.",
  },
  {
    name: "Secretary",
    img: "../../../public/unknown.png",
    tasks: "Manages club communications and keeps meeting minutes.",
  },
  {
    name: "Treasurer",
    img: "../../../public/unknown.png",
    tasks: "Handles club finances and budgeting.",
  },
  {
    name: "Event Coordinator",
    img: "../../../public/unknown.png",
    tasks: "Plans and organizes club events.",
  },
  {
    name: "Marketing Head",
    img: "../../../public/unknown.png",
    tasks: "Oversees marketing strategies and promotions.",
  },
  {
    name: "Tech Lead",
    img: "../../../public/unknown.png",
    tasks: "Manages technical projects and development.",
  },
  {
    name: "Content Creator",
    img: "../../../public/unknown.png",
    tasks: "Produces content for club communications and marketing.",
  },
  {
    name: "Community Manager",
    img: "../../../public/unknown.png",
    tasks: "Builds and manages relationships within the community.",
  },
];

export default function ClubHierarchy() {
  const [step, setStep] = useState(0);

  // 🔗 Refs for DOM elements
  const svgRef = useRef<SVGSVGElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taskRef = useRef<HTMLParagraphElement>(null);

  // 🎬 Refs for tweens (persistent GSAP animations)
  const nameTweenRef = useRef<gsap.core.Tween | null>(null);
  const imgTweenRef = useRef<gsap.core.Tween | null>(null);
  const taskTweenRef = useRef<gsap.core.Tween | null>(null);

  const connections = [
    [0, 1],
    [0, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 6],
    [2, 7],
    [2, 8],
  ];

  const positions: Record<number, { x: number; y: number }> = {
    0: { x: 350, y: 80 },
    1: { x: 230, y: 230 },
    2: { x: 470, y: 230 },
    3: { x: 130, y: 420 },
    4: { x: 210, y: 420 },
    5: { x: 290, y: 420 },
    6: { x: 410, y: 420 },
    7: { x: 490, y: 420 },
    8: { x: 570, y: 420 },
  };

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    svg.innerHTML = "";

    connections.forEach(([from, to], index) => {
      const { x: x1, y: y1 } = positions[from];
      const { x: x2, y: y2 } = positions[to];
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", x1.toString());
      line.setAttribute("y1", (y1 + 30).toString());
      line.setAttribute("x2", x2.toString());
      line.setAttribute("y2", (y2 - 30).toString());
      line.setAttribute("stroke", index < step ? "#10b981" : "#475569");
      line.setAttribute("stroke-width", "4");
      line.setAttribute("stroke-linecap", "round");
      svg.appendChild(line);
    });
  }, [step]);

  // 🎞️ Initialize tweens once
  useEffect(() => {
    const nameEl = nameRef.current;
    const imgEl = imgRef.current;
    const taskEl = taskRef.current;

    if (!nameEl || !imgEl || !taskEl) return;

    nameTweenRef.current = gsap.from(nameEl, {
      x: -20,
      opacity: 0,
      duration: 0.5,
      paused: true,
    });

    imgTweenRef.current = gsap.from(imgEl, {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
      paused: true,
    });

    taskTweenRef.current = gsap.from(taskEl, {
      y: 10,
      opacity: 0,
      duration: 0.5,
      delay: 0.1,
      paused: true,
    });

    return () => {
      nameTweenRef.current?.kill();
      imgTweenRef.current?.kill();
      taskTweenRef.current?.kill();
    };
  }, []);

  // 💫 Replay animations when step changes
  useEffect(() => {
    nameTweenRef.current?.restart();
    imgTweenRef.current?.restart();
    taskTweenRef.current?.restart();
  }, [step]);

  const glowIntensity = Math.min(0.2 + step * 0.1, 1);

  return (
    <div className="max-w-6xl mx-auto flex flex-row items-center justify-between">
      {/* Left Panel */}
      <div className="p-6 flex flex-col gap-3">
        <div>
          <img
            ref={imgRef}
            src={members[step]?.img}
            alt={members[step]?.name}
            width={650}
            className="rounded-3xl shadow-lg"
          />
        </div>
        <div className="mt-4">
          <h2 ref={nameRef} className="text-4xl font-bold text-white mb-3">
            {members[step]?.name}
          </h2>
          <p
            ref={taskRef}
            className="text-lg text-gray-400 leading-relaxed max-w-md"
          >
            {members[step]?.tasks}
          </p>
        </div>
      </div>

      {/* Tree Container */}
      <div className="w-full flex-col justify-center items-center py-10">
        <div className="relative w-[700px] h-[550px] bg-neutral-900 rounded-2xl shadow-lg overflow-visible">
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Root Node */}
          <div
            className="absolute flex items-center justify-center transition-all duration-700 ease-in-out"
            style={{
              left: `${positions[0].x}px`,
              top: `${positions[0].y}px`,
              transform: "translate(-50%, -50%)",
              filter: `drop-shadow(0 0 ${
                15 + step * 3
              }px rgba(16,185,129,${glowIntensity}))`,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 600 800"
              width="140"
              height="140"
            >
              <path
                d="M300 60
                C210 60 150 120 150 210
                C150 320 210 380 230 430
                C230 460 245 490 300 490
                C355 490 370 460 370 430
                C390 380 450 320 450 210
                C450 120 390 60 300 60 Z"
                fill="#00f37a"
              />
            </svg>
          </div>

          {/* Child Nodes */}
          {Object.entries(positions)
            .filter(([id]) => id !== "0")
            .map(([id, pos]) => {
              const active = connections
                .slice(0, step)
                .some((c) => c.includes(Number(id)));
              return (
                <div
                  key={id}
                  className={`absolute rounded-full shadow-lg transition-all duration-700 ease-out ${
                    active
                      ? "bg-emerald-400 blur-[2px]"
                      : "bg-slate-600 blur-[4px] opacity-70"
                  }`}
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    width: "55px",
                    height: "55px",
                    transform: "translate(-50%, -50%)",
                    filter: active
                      ? "drop-shadow(0 0 10px #10b981)"
                      : "drop-shadow(0 0 6px #334155)",
                  }}
                />
              );
            })}
        </div>

        {/* Navigation */}
        <div className="w-full p-3 flex items-center gap-3">
          <button
            onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
            className="cursor-pointer border border-white rounded-full w-[50px] aspect-square flex justify-center items-center p-2 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white hover:text-neutral-950" />
          </button>
          <button
            onClick={() =>
              setStep((prev) => Math.min(prev + 1, members.length - 1))
            }
            className="cursor-pointer border border-white rounded-full w-[50px] aspect-square flex justify-center items-center p-2 hover:bg-white transition-colors"
          >
            <ArrowRight className="w-5 h-5 text-white hover:text-neutral-950" />
          </button>
        </div>
      </div>
    </div>
  );
}
