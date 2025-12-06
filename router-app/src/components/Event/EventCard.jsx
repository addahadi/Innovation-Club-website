// src/components/Events/EventCard.jsx
import React from "react";
import { Pencil, Trash2, Calendar, Users, Tag, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventCard({ event, language, onEdit, onDelete }) {
  return (
    <Card
      className="
  bg-gray-900/60 
  border border-gray-800 
  rounded-2xl 
  overflow-hidden 
  hover:border-green-700/70
  transition-all duration-300
  backdrop-blur-lg
"
    >
      <div className="relative h-48 bg-gray-800">
        {event.heroImage ? (
          <img
            src={event.heroImage}
            alt={event.title[language]}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-600" />
          </div>
        )}

        {/* Glass gradient overlay */}
        <div className="absolute inset-0  from-gray-900/70 via-gray-900/20 to-transparent pointer-events-none"></div>

        {/* Edit/Delete Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="icon"
            onClick={() => onEdit(event)}
            className="
          h-8 w-8 p-0 
          bg-gray-900/70 
          hover:bg-green-700/70 
          border border-green-700/40 
          backdrop-blur-md 
          text-white
        "
          >
            <Pencil className="w-4 h-4" />
          </Button>

          <Button
            size="icon"
            onClick={() => onDelete(event.id)}
            className="
          h-8 w-8 p-0 
          bg-gray-900/70 
          hover:bg-red-600/80 
          text-white
        "
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Language Badge */}
        <div className="absolute top-3 left-3">
          <span
            className="
        px-2 py-1 
        bg-gray-900/80 
        text-white text-xs 
        rounded-full 
      "
          >
            {language.toUpperCase()}
          </span>
        </div>
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-white text-lg font-semibold tracking-wide">
          {event.title[language]}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <p className="text-gray-400 line-clamp-2 leading-relaxed">
          {event.description[language]}
        </p>

        {/* Date */}
        <div className="flex items-center text-gray-300">
          <Calendar className="w-4 h-4 mr-2 text-green-700" />
          {new Date(event.startDate).toLocaleDateString()}
        </div>

        {/* Attendees */}
        <div className="flex items-center text-gray-300">
          <Users className="w-4 h-4 mr-2 text-green-700" />
          {event.attendees} attendees
        </div>

        {/* Tags */}
        {event.tags[language].length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {event.tags[language].map((tag, idx) => (
              <span
                key={idx}
                className="
              inline-flex items-center 
              px-2 py-1 
              rounded-full 
              text-xs 
              bg-green-700/20 
              text-green-400 
              border border-green-700/40
              shadow-[inset_0_0_8px_rgba(0,150,70,0.25)]
            "
              >
                <Tag className="w-3 h-3 mr-1 text-green-600" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
