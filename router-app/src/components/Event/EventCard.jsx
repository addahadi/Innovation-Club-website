// src/components/Events/EventCard.jsx
import React from "react";
import { Pencil, Trash2, Calendar, Users, Tag, Image } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventCard({ event, language, onEdit, onDelete }) {
  return (
    <Card className="bg-gray-800 border-gray-700 overflow-hidden hover:border-green-700 transition-colors">
      <div className="relative h-48 bg-gray-700">
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
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            size="sm"
            onClick={() => onEdit(event)}
            className="bg-green-700 hover:bg-green-800 text-white h-8 w-8 p-0"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => onDelete(event.id)}
            className="bg-red-600 hover:bg-red-700 text-white h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-gray-900/80 text-white text-xs rounded-full font-medium">
            {language.toUpperCase()}
          </span>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-white">{event.title[language]}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-400 text-sm line-clamp-2">
          {event.description[language]}
        </p>

        <div className="flex items-center text-gray-400 text-sm">
          <Calendar className="w-4 h-4 mr-2 text-green-700" />
          {new Date(event.startDate).toLocaleDateString()}
        </div>

        <div className="flex items-center text-gray-400 text-sm">
          <Users className="w-4 h-4 mr-2 text-green-700" />
          {event.attendees} attendees
        </div>

        {event.tags[language].length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.tags[language].map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-700/20 text-green-400 border border-green-700/50"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
