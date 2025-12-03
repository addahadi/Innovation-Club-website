import { useEffect, useRef } from "react";
import Footer from "./Footer";
import ElectricBorder from "../../Components/Ui/ElectricBorder";

export default function FooterSection({language}) {
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
          <Footer language = {language} />
        </ElectricBorder>
      </div>
  );
}
