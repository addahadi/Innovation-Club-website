import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface HierarchyProps {
  language: {
    title: string;
    content: string;
  };
}

const members = [
  {
    name: "President",
    img: "/unknown.png",
    tasks: "Oversees club operations and represents the club externally.",
  },
  {
    name: "Vice President",
    img: "/unknown.png",
    tasks:
      "Assists the President and takes over their duties in their absence.",
  },
  {
    name: "Secretary",
    img: "/unknown.png",
    tasks: "Manages club communications and keeps meeting minutes.",
  },
  {
    name: "Treasurer",
    img: "/unknown.png",
    tasks: "Handles club finances and budgeting.",
  },
  {
    name: "Event Coordinator",
    img: "/unknown.png",
    tasks: "Plans and organizes club events.",
  },
  {
    name: "Marketing Head",
    img: "/unknown.png",
    tasks: "Oversees marketing strategies and promotions.",
  },
  {
    name: "Tech Lead",
    img: "/unknown.png",
    tasks: "Manages technical projects and development.",
  },
  {
    name: "Content Creator",
    img: "/unknown.png",
    tasks: "Produces content for club communications and marketing.",
  },
  {
    name: "Community Manager",
    img: "/unknown.png",
    tasks: "Builds and manages relationships within the community.",
  },
];

const ClubHierarchy: React.FC<HierarchyProps> = ({ language }) => {
  const [step, setStep] = useState(0);
  const [nodeSize, setNodeSize] = useState(55);
  const [bellSize, setBellSize] = useState(140);

  // Refs
  const svgRef = useRef<SVGSVGElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taskRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Connections between nodes
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

  const getRelativePositions = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      return {
        0: { x: 50, y: 12 },
        1: { x: 33, y: 42 },
        2: { x: 67, y: 42 },
        3: { x: 12, y: 76 },
        4: { x: 28, y: 76 },
        5: { x: 44, y: 76 },
        6: { x: 56, y: 76 },
        7: { x: 72, y: 76 },
        8: { x: 88, y: 76 },
      };
    }
    return {
      0: { x: 50, y: 12 },
      1: { x: 33, y: 42 },
      2: { x: 67, y: 42 },
      3: { x: 19, y: 76 },
      4: { x: 30, y: 76 },
      5: { x: 41, y: 76 },
      6: { x: 59, y: 76 },
      7: { x: 70, y: 76 },
      8: { x: 81, y: 76 },
    };
  };

  const relativePositions = getRelativePositions();

  const [positions, setPositions] = useState<
    Record<number, { x: number; y: number }>
  >({});

  useEffect(() => {
    const updatePositions = () => {
      const container = svgRef.current?.getBoundingClientRect();
      if (!container) return;

      const width = container.width;
      const height = container.height;

      const newPositions: Record<number, { x: number; y: number }> = {};
      for (const key in relativePositions) {
        const id = Number(key);
        newPositions[id] = {
          x: (relativePositions[id].x / 100) * width,
          y: (relativePositions[id].y / 100) * height,
        };
      }

      setPositions(newPositions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, []);

  // ✨ scroll-based fade for text and image
  useEffect(() => {
    if (!sectionRef.current) return;

    const nameEl = nameRef.current;
    const taskEl = taskRef.current;
    const imgEl = imgRef.current;

    gsap.from(nameEl, {
      scrollTrigger: {
        trigger: nameEl,
        start: "top 85%",
        end: "top 30%",
        scrub: true,
      },
      opacity: 0,
      duration: 0.8,
    });

    gsap.from(taskEl, {
      scrollTrigger: {
        trigger: taskEl,
        start: "top 90%",
        end: "top 30%",
        scrub: true,
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
    });

    gsap.from(imgEl, {
      scrollTrigger: {
        trigger: imgEl,
        start: "top 90%",
        end: "top 30%",
        scrub: true,
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Draw lines dynamically
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !Object.keys(positions).length) return;

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
  }, [step, positions]);

  

  // Animate header section and tree container
  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current.querySelector("h2"), {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
        opacity: 0,
        y: 50,
        duration: 1,
      });

      gsap.from(headerRef.current.querySelector("p"), {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 75%",
          end: "top 30%",
          scrub: true,
        },
        opacity: 0,
        y: 30,
        duration: 1,
      });
    }

    if (treeContainerRef.current) {
      gsap.from(treeContainerRef.current, {
        scrollTrigger: {
          trigger: treeContainerRef.current,
          start: "top 85%",
          end: "top 30%",
          scrub: true,
        },
        opacity: 0,
        duration: 1.2,
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Animate name/img/task on step change
  useEffect(() => {
    gsap.fromTo(
      [nameRef.current, imgRef.current, taskRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }
    );
  }, [step]);

  // Responsive sizing
  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;

      // Node circle size
      const newNodeSize = width < 640 ? 55 : width < 1024 ? 45 : 55;
      // Bell size
      const newBellSize = width < 640 ? 100 : width < 1024 ? 110 : 140;

      setNodeSize(newNodeSize);
      setBellSize(newBellSize);
    };

    updateSizes();
    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, []);

  const glowIntensity = Math.min(0.2 + step * 0.1, 1);

  return (
    <div className="max-w-6xl min-h-screen mx-auto">
      <div
        className="px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 mb-8 sm:mb-12"
        ref={headerRef}
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
          {language.title}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-8 sm:mb-12">
          {language.content}
        </p>
      </div>

      <div
        ref={sectionRef}
        className=" flex max-md:flex-col-reverse items-center justify-between  md:h-screen md:gap-10"
      >
        {/* Left Panel */}
        <div className="p-6 flex flex-col gap-3">
          <div className="max-md:w-full max-md:h-[150px]">
            <img
              ref={imgRef}
              src={members[step]?.img}
              alt={members[step]?.name}
              className="rounded-3xl shadow-lg max-w-[650px] w-full h-auto object-contain"
            />
          </div>
          <div className="mt-4 max-md:px-3">
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
        <div className="tree-area w-full flex-col justify-center items-center md:py-10 px-2">
          <div
            className="relative w-[700px] h-[550px] max-md:w-full bg-neutral-900 rounded-2xl shadow-lg overflow-visible"
            ref={treeContainerRef}
          >
            <svg
              ref={svgRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />

            {/* Root Node */}
            {positions[0] && (
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
                  width={bellSize}
                  height={bellSize}
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
            )}

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
                      width: nodeSize,
                      height: nodeSize,
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
          <div className="w-full p-3 flex items-center gap-3 justify-center">
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
    </div>
  );
};

export default ClubHierarchy;
