import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import db from "../../../db/firebase";

gsap.registerPlugin(ScrollTrigger);

const EventCarouselSkeleton = () => (
  <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 animate-pulse">
    <div className="flex flex-col gap-2 mb-8 sm:mb-12">
      <div className="h-10 bg-green-700 rounded w-1/3 mb-4"></div>
      <div className="h-5 bg-green-700 rounded w-2/3 max-w-3xl"></div>
    </div>

    <div className="w-full max-w-6xl mx-auto">
      <div className="relative h-[300px] sm:h-[400px] lg:h-[600px] bg-green-900 rounded-lg sm:rounded-2xl shadow-2xl">
        <div className="absolute inset-0 flex items-end p-4 sm:p-6 lg:p-8">
          <div className="w-full">
            <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-5 bg-gray-700 rounded w-3/4 mb-6"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3 mt-6">
        <div className="w-12 h-3 bg-green-700 rounded-full"></div>
        <div className="w-3 h-3 bg-green-700 rounded-full"></div>
        <div className="w-3 h-3 bg-green-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

export default function CarouselEvent({ language }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const carouselRef = useRef(null);
  const indicatorsRef = useRef(null);

  useEffect(() => {
    fetchEventsData();
  }, [language.type]);

  async function fetchEventsData() {
    setIsLoading(true);
    try {
      const eventsColRef = collection(db, "events");
      const eventsQuery = query(
        eventsColRef,
        orderBy("startDate", "desc"),
        limit(3)
      );
      const eventSnapshot = await getDocs(eventsQuery);

      const fetchedEvents = eventSnapshot.docs.map((doc) => {
        const data = doc.data();
        const lang = language.type;

        return {
          id: doc.id,
          title: data.title?.[lang] || data.title?.en || "Event Title",
          description:
            data.description?.[lang] ||
            data.description?.en ||
            "Event description.",
          img_url:
            data.heroImage ||
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
        };
      });

      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events for carousel:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isLoading || events.length === 0) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      return;
    }

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    const timeoutId = setTimeout(() => {
      gsap.set(headingRef.current, { opacity: 0, y: -50 });
      gsap.set(descriptionRef.current, { opacity: 0, y: -30 });
      gsap.set(carouselRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(indicatorsRef.current, { opacity: 0, y: 30 });

      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: descriptionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(carouselRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.4,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 80%",
          end: "bottom 100%",
          toggleActions: "play none none none",
          scrub: true,
        },
      });

      gsap.to(indicatorsRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        scrollTrigger: {
          trigger: indicatorsRef.current,
          start: "top 90%",
          end: "bottom 100%",
          toggleActions: "play none none none",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, events.length]);
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  if (isLoading) {
    return <EventCarouselSkeleton />;
  }

  if (events.length === 0) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-20 text-center text-xl text-gray-400">
        No recent events found.
      </div>
    );
  }

  const headerTitle = language.content?.title || "Our Events";
  const headerDescription =
    language.content?.content ||
    "Discover our amazing collection of events and experiences";

  return (
    <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-12 sm:py-16 lg:py-20">
      {/* Header Section */}
      <div className="flex flex-col gap-2 mb-8 sm:mb-12">
        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold mb-4"
        >
          {headerTitle}
        </h1>
        <p
          ref={descriptionRef}
          className="text-base sm:text-lg text-gray-400 max-w-3xl"
        >
          {headerDescription}
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
              {events.map((item, index) => (
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
                        {index + 1} / {events.length}
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
            {events.map((_, index) => (
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
