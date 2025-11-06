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
    <div className="w-full mt-32">
        <ElectricBorder
          color="#37f04a"
          speed={0.2}
          chaos={0.4}
          thickness={3}
          style={{ borderRadius: 0 }}
          client:visible
        >
          <Footer />
        </ElectricBorder>
      </div>
  );
}
