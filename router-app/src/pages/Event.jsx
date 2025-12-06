// src/pages/Event.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Plus, Calendar, Image, Globe, Loader2 } from "lucide-react"; // Added Loader2
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventForm from "@/components/Event/EventForm";
import EventCard from "@/components/Event/EventCard";
import DeleteConfirmDialog from "@/components/Event/DeleteConfirmDialog";

// Import Firestore CRUD utilities
import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../../db/firebase";
import LanguageToggle from "@/components/LanguageToggle";

export default function Event() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("list"); // 'list' or 'form'
  const [editingEvent, setEditingEvent] = useState(null);
  const [previewLang, setPreviewLang] = useState("en");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  // New state for loading
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch events from Firestore
  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      console.error("Failed to load events:", err);
      setError("Failed to load events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load events on component mount
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleOpenForm = (event = null) => {
    setEditingEvent(event);
    setView("form");
  };

  const handleCancel = () => {
    setView("list");
    setEditingEvent(null);
  };

  // Update handleSubmit to use Firestore
  const handleSubmit = async (eventData) => {
    setIsLoading(true);
    try {
      if (editingEvent) {
        // UPDATE existing event in Firestore
        await updateEvent(editingEvent.id, eventData);
      } else {
        // ADD new event to Firestore
        await addEvent(eventData);
      }
      // Re-fetch events to update the list
      await loadEvents();
    } catch (err) {
      console.error("Firestore submission failed:", err);
      setError(
        `Failed to ${editingEvent ? "update" : "create"} event in Firestore.`
      );
    } finally {
      setView("list");
      setEditingEvent(null);
      setIsLoading(false);
    }
  };

  // Update handleDelete to use Firestore
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      // DELETE event from Firestore
      await deleteEvent(id);
      // Re-fetch events to update the list
      await loadEvents();
    } catch (err) {
      console.error("Firestore deletion failed:", err);
      setError("Failed to delete event from Firestore.");
    } finally {
      setDeleteConfirm(null);
      setIsLoading(false);
    }
  };

  if (view === "form") {
    return (
      <EventForm
        event={editingEvent}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-white">
              Event Management
            </h1>
            <p className="text-gray-400 mt-1">
              Create, edit, and manage bilingual events
            </p>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle previewLang={previewLang} setPreviewLang={setPreviewLang} />

            {/* Create Button */}
            <Button
              onClick={() => handleOpenForm()}
              disabled={isLoading}
              className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-4 py-2"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
            <p className="text-gray-300 ml-3 text-lg">Loading events...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-900/40 border border-red-600 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && events.length === 0 && (
          <Card className="bg-gray-800/60 backdrop-blur border border-gray-700 rounded-xl">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Calendar className="w-16 h-16 text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg mb-6">No events added yet</p>

              <Button
                onClick={() => handleOpenForm()}
                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-xl"
              >
                Create Your First Event
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Event List */}
        {!isLoading && events.length > 0 && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                language={previewLang}
                onEdit={handleOpenForm}
                onDelete={(id) => setDeleteConfirm(id)}
              />
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <DeleteConfirmDialog
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          onConfirm={() => handleDelete(deleteConfirm)}
        />
      </div>
    </div>
  );

}
