import { useState, useEffect, useRef } from "react";

import {gsap} from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const EventsGrid = () => {
  const cardsRef = useRef([]);

  const events = [
    {
      id: 1,
      title: "Join us💚",
      date: "January 5, 2024",
      attendees: 140,
      image: "/join_us.jpg",
      description:
        "A welcoming highlight showcasing community spirit and new member engagement.",
      tags: ["Community", "Welcome", "Club"],
    },
    {
      id: 2,
      title: "🩷pink october🩷",
      date: "October 10, 2024",
      attendees: 220,
      image: "/octobre_rose.jpg",
      description:
        "Awareness campaign dedicated to breast cancer support and education.",
      tags: ["Health", "Awareness", "PinkOctober"],
    },
    {
      id: 5,
      title: "synapse festival",
      date: "March 20, 2024",
      attendees: 210,
      image: "/synpase.jpg",
      description:
        "Ramadan nights, charity events, and spiritual gatherings with members.",
      tags: ["tiaret", "clubs", "collaboration"],
    },
    {
      id: 6,
      title: "1O1✨4th edition",
      date: "February 14, 2024",
      attendees: 300,
      image: "/nova.jpg",
      description:
        "The 4th edition of the popular 101 program featuring workshops and talks.",
      tags: ["Workshop", "Program", "Education"],
    },
    {
      id: 9,
      title: "squid game",
      date: "September 12, 2024",
      attendees: 75,
      image: "/squid_game.jpg",
      description:
        "First aid and emergency response learning session for members.",
      tags: ["who we are", "Gamg", "explanatory"],
    },
  ];

 
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
    initAnimations();

 
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

  }, []);

  return (
    <div>
      {/* Events Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={event.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-green-500/50 transition-all duration-300 hover:scale-105"
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

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EventsGrid;
