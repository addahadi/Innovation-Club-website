import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import db from "../../../db/firebase";

gsap.registerPlugin(ScrollTrigger);

// --- Skeleton Component ---
const EventSkeleton = () => (
  <div className="w-full py-12">
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 h-[450px]"
        >
          {/* Image Skeleton */}
          <div className="h-48 bg-zinc-800"></div>

          {/* Content Skeleton */}
          <div className="p-6">
            <div className="h-4 bg-zinc-700 w-1/3 mb-4 rounded"></div>
            <div className="h-6 bg-zinc-700 w-full mb-3 rounded"></div>
            <div className="h-4 bg-zinc-700 w-5/6 mb-4 rounded"></div>
            <div className="h-4 bg-zinc-700 w-2/3 mb-6 rounded"></div>

            {/* Tags Skeleton */}
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-zinc-800 w-12 rounded-md"></div>
              <div className="h-6 bg-zinc-800 w-16 rounded-md"></div>
            </div>

            {/* Footer Skeleton */}
            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <div className="h-4 bg-zinc-700 w-1/3 rounded"></div>
              <div className="h-4 bg-green-500/30 w-1/4 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const EventsGrid = ({ language }) => {
  const cardsRef = useRef([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Helper to format date
  const formatDate = (dateValue) => {
    if (dateValue?.toDate) {
      return dateValue
        .toDate()
        .toLocaleDateString(language.type === "fr" ? "fr-FR" : "en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
    }
    return dateValue ? String(dateValue) : "Date N/A";
  };

  useEffect(() => {
    fetchEventsData();
  }, []);

  async function fetchEventsData() {
    setIsLoading(true);
    try {
      const eventsColRef = collection(db, "events");
      const eventSnapshot = await getDocs(eventsColRef);

      const fetchedEvents = eventSnapshot.docs.map((doc) => {
        const data = doc.data();
        const lang = language.type;

        return {
          id: doc.id,
          title: data.title?.[lang] || data.title?.en || "No Title",
          description:
            data.description?.[lang] ||
            data.description?.en ||
            "No description provided.",
          tags: data.tags?.[lang] || data.tags?.en || [],
          image: data.heroImage || "/default_event.jpg",
          date: formatDate(data.startDate),
          attendees: data.attendees || 0,
        };
      });

      setEvents(fetchedEvents);
    } catch (error) {
      console.error("Error fetching events data:", error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {


    const initAnimations = () => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "ease-out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
            delay: index * 0.1,
          }
        );
      });
    };

    // Ensure cardsRef.current is cleaned up before assignment
    cardsRef.current = cardsRef.current.slice(0, events.length);
    initAnimations();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isLoading, events.length]);

  if (isLoading) {
    return <EventSkeleton />;
  }

  if (events.length === 0) {
    return (
      <div className="w-full text-center py-20 text-xl text-red-400">
        No events found in the database.
      </div>
    );
  }

  return (
    <div className="py-12">
      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={event.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-green-500/50 transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
            </div>

            {/* Event Content */}
            <div className="p-6">
              <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {event.date}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                {event.title}
              </h3>

              <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                {event.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {event.attendees} attendees
                </div>

                <button className="text-green-400 hover:text-green-300 font-medium text-sm flex items-center gap-1 transition-colors">
                  Learn More
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsGrid;
