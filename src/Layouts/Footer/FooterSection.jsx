import { useEffect, useRef } from "react";
import Footer from "./Footer";
import ElectricBorder from "../../Components/Ui/ElectricBorder";

export default function FooterSection() {
  /*
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = "#37f04a";
      ctx.shadowColor = "#37f04a";
      ctx.shadowBlur = 10;
      ctx.lineWidth = 2;

      ctx.beginPath();
      // Random jitter to simulate electricity
      const points = 20;
      const step = h / points;
      let x = w / 2;

      ctx.moveTo(x, 0);
      for (let i = 0; i < points; i++) {
        const jitter = (Math.random() - 0.5) * 30;
        ctx.lineTo(x + jitter, i * step);
      }
      ctx.stroke();
    };

    const animate = () => {
      draw();
      requestAnimationFrame(animate);
    };

    animate();

    // Resize handling
    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  */

  return (
    <div className="w-full flex flex-col justify-center items-center mt-32 relative">
      <div className="max-w-6xl w-full px-6 flex flex-col relative">
        {/*<div className="flex justify-between w-full relative">
          <img
            src="/logo.jpg"
            alt="Graphy Logo"
            className="mb-6 w-32 h-32 object-contain rounded-full border-4 border-green-500 shadow-lg z-10"
          />

          <canvas
            ref={canvasRef}
            className="absolute top-32 left-16 w-[2px] h-[24px] pointer-events-none"
          ></canvas>
          <div></div>
        </div>
        */}

        <ElectricBorder
          color="#37f04a"
          speed={0.2}
          chaos={0.4}
          thickness={3}
          style={{ borderRadius: 16 }}
          client:visible
        >
          <Footer />
        </ElectricBorder>
      </div>
    </div>
  );
}
