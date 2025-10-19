

import gsap from "gsap";
import { useEffect, useRef } from "react";
function Bars() {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current

        const tween = gsap.to(el, {
          backgroundPosition: "50px 50px",
          duration: 5,
          repeat: -1,
          ease: "none",
        });
        return () => {
            tween.kill()
        }
    },[])

    return (
      <div
        ref={ref}
        className="absolute inset-0 z-30"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    );
}

export default Bars