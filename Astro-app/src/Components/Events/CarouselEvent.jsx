import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CarouselEvent({ language }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const carouselRef = useRef(null);
  const indicatorsRef = useRef(null);

  const items = [
    {
      id: 1,
      title: "Synapse Festival",
      img_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
      description: "Breathtaking mountain scenery",
    },
    {
      id: 2,
      title: "Octobre rose",
      img_url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
      description: "Peaceful coastal views",
    },
    {
      id: 3,
      title: "101 of graduation",
      img_url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
      description: "Serene woodland trails",
    },
  ];

  useEffect(() => {
    // Animate heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: -50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate description
    gsap.fromTo(
      descriptionRef.current,
      { opacity: 0, y: -30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate carousel
    gsap.fromTo(
      carouselRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          scrub : true,
        },
      }
    );

    // Animate indicators
    gsap.fromTo(
      indicatorsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        scrollTrigger: {
          trigger: indicatorsRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
          scrub : true,
        },
      }
    );
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
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-8 sm:mb-12">
        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold mb-4"
        >
          Our Events
        </h1>
        <p
          ref={descriptionRef}
          className="text-base sm:text-lg text-gray-400 max-w-3xl"
        >
          Discover our amazing collection of events and experiences
        </p>
      </div>

      {/* Carousel Section */}
      <div className="flex justify-center items-center">
        <div className="w-full max-w-6xl">
          <div
            ref={carouselRef}
            className="relative overflow-hidden rounded-lg sm:rounded-2xl shadow-2xl"
          >
            {/* Carousel Container */}
            <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] flex items-center justify-center">
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
                    className="h-full flex items-end w-full justify-start relative"
                    style={{
                      backgroundImage: `url('${item.img_url}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                    <div className="flex flex-col p-4 sm:p-6 lg:p-8 relative z-10">
                      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg">
                        {item.title}
                      </h2>
                      <p className="text-base sm:text-lg lg:text-xl text-gray-100 drop-shadow-md">
                        {item.description}
                      </p>
                      <div className="mt-4 sm:mt-6 text-base sm:text-lg font-semibold text-white drop-shadow-md">
                        {index + 1} / {items.length}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={goToPrevious}
              className="absolute cursor-pointer z-20 left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} className="sm:w-8 sm:h-8" />
            </button>

            <button
              onClick={goToNext}
              className="absolute cursor-pointer z-20 right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-200 hover:scale-110"
              aria-label="Next slide"
            >
              <ChevronRight size={24} className="sm:w-8 sm:h-8" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div
            ref={indicatorsRef}
            className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6"
          >
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 sm:w-12 h-2 sm:h-3 bg-white"
                    : "w-2 sm:w-3 h-2 sm:h-3 bg-white/40 hover:bg-white/60"
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
