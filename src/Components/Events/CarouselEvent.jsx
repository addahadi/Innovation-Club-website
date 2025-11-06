import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import {gsap} from "gsap";

gsap.registerPlugin(ScrollTrigger);





export default function CarouselEvent() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const carouselRef = useRef(null);
  const indicatorsRef = useRef(null);

  const items = [
    {
      id: 1,
      title: "Synapse Festival",
      img_url: "../../public/all_club.jpg",
      description: "Breathtaking mountain scenery",
    },
    {
      id: 2,
      title: "Octobre rose",
      img_url: "../../public/octobre_rose.jpg",
      description: "Peaceful coastal views",
    },
    {
      id: 3,
      title: "101 of graduation",
      img_url: "../../public/innovtech.jpg",
      description: "Serene woodland trails",
    },
  ];

  useEffect(() => {
    
    // Heading animation
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
      opacity: 0,
      y: 100,
      duration: 1,
    });

    // Description animation
    gsap.from(descriptionRef.current, {
      scrollTrigger: {
        trigger: descriptionRef.current,
        start: "top 80%",
        end: "top 30%",
        scrub: true,
      },
      opacity: 0,
      y: 80,
      duration: 1,
    });

    // Carousel animation
    gsap.from(carouselRef.current, {
      scrollTrigger: {
        trigger: carouselRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      },
      opacity: 0,
      scale: 0.8,
      y: 100,
      duration: 1.5,
    });

    // Indicators animation
    gsap.from(indicatorsRef.current, {
      scrollTrigger: {
        trigger: indicatorsRef.current,
        start: "top 90%",
        end: "top 40%",
        scrub: 1,
      },
      opacity: 0,
      y: 50,
      duration: 1,
    });
     

    return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    }
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className=" min-h-screen px-8 max-w-7xl mx-auto mt-20">
      <div className=" flex flex-col gap-2 mb-20">
        <h1 ref={headingRef} className="text-6xl text-white font-bold mb-6">
          Innovation Events
        </h1>
        <p ref={descriptionRef} className="text-lg text-gray-400">
          Learn more about our exciting events — from workshops and hackathons
          to talks and conferences. Each event helps students share ideas, build
          new projects, and learn more about innovation together.
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-full max-w-6xl">
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* Carousel Container */}
            <div className="relative h-[600px] flex items-center justify-center">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                    index === currentIndex
                      ? "opacity-100 translate-x-0"
                      : index < currentIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div
                    className={` h-full flex  items-end w-full justify-start relative`}
                    style={{
                      backgroundImage: `url('/path/to/${item.img_url}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <div className=" flex flex-col p-6 relative z-10">
                      <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
                        {item.title}
                      </h2>
                      <p className="text-xl text-gray-100 drop-shadow-md">
                        {item.description}
                      </p>
                      <div className="mt-6 text-lg font-semibold text-white drop-shadow-md">
                        {index + 1} / {items.length}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute cursor-pointer z-20 left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={goToNext}
              className="absolute cursor-pointer z-20 right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Dot Indicators */}
          <div ref={indicatorsRef} className="flex justify-center gap-3 mt-8">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-12 h-3 bg-white"
                    : "w-3 h-3 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
