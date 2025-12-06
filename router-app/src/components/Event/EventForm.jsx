// src/components/Events/EventForm.jsx
import React, { useState } from "react";
import { ArrowLeft, Image } from "lucide-react"; // Import Image for file preview
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Import the Cloudinary utility
import { uploadImage } from "@/lib/cloudinary";

export default function EventForm({ event = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    titleEn: event?.title.en || "",
    titleFr: event?.title.fr || "",
    descriptionEn: event?.description.en || "",
    descriptionFr: event?.description.fr || "",
    startDate: event?.startDate || "",
    tagsEn: event?.tags.en.join(", ") || "",
    tagsFr: event?.tags.fr.join(", ") || "",
    heroImage: event?.heroImage || "",
    attendees: event?.attendees || 0,
  });
  // New state to hold the file object for upload
  const [heroImageFile, setHeroImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeroImageFile(file);
      // Create a local URL for instant image preview
      setFormData({
        ...formData,
        heroImage: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.titleEn || !formData.titleFr || !formData.startDate) {
      return; // Basic validation
    }

    setIsUploading(true);
    setUploadError(null);
    let finalHeroImage = formData.heroImage;

    try {
      // 1. Handle Image Upload only if a new file is selected
      if (heroImageFile) {
        // Upload the image to Cloudinary
        finalHeroImage = await uploadImage(heroImageFile);
      } else if (event && event.heroImage === formData.heroImage) {
        // No new file, and URL is the existing one, so keep it.
        finalHeroImage = event.heroImage;
      } else if (formData.heroImage && !heroImageFile) {
        // User manually provided a URL (or cleared it) without a file.
        // We trust the URL input here if a file wasn't selected.
        finalHeroImage = formData.heroImage;
      } else {
        // Image was cleared by user and no new file was selected.
        finalHeroImage = "";
      }

      // 2. Prepare Event Data for Firestore
      const tagsEnArray = formData.tagsEn
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      const tagsFrArray = formData.tagsFr
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const eventData = {
        title: { en: formData.titleEn, fr: formData.titleFr },
        description: { en: formData.descriptionEn, fr: formData.descriptionFr },
        startDate: formData.startDate,
        tags: { en: tagsEnArray, fr: tagsFrArray },
        heroImage: finalHeroImage, // Use the uploaded URL or existing one
        attendees: Number(formData.attendees),
      };

      // 3. Submit Data to Parent (which will handle Firestore logic)
      onSubmit(eventData);
    } catch (error) {
      console.error("Submission error:", error);
      setUploadError("Failed to save event. Check console for details.");
    } finally {
      setIsUploading(false);
      setHeroImageFile(null); // Clear file state after upload attempt
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <Button onClick={onCancel} variant="outline" className="mb-3">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              {event ? "Edit Event" : "Create New Event"}
            </CardTitle>
            <p className="text-gray-400 text-sm mt-2">
              Fill in both English and French versions for bilingual support
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {/* Title Section (omitted for brevity) */}
              {/* ... existing Title Section ... */}
              {/* ... existing Description Section ... */}
              {/* ... existing Tags Section ... */}
              {/* ... existing Date and Attendees fields ... */}

              {/* Title Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold text-white">Title</h3>
                  <span className="text-red-500">*</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      English
                    </label>
                    <Input
                      value={formData.titleEn}
                      onChange={(e) =>
                        setFormData({ ...formData, titleEn: e.target.value })
                      }
                      placeholder="Event title in English"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      French
                    </label>
                    <Input
                      value={formData.titleFr}
                      onChange={(e) =>
                        setFormData({ ...formData, titleFr: e.target.value })
                      }
                      placeholder="Titre de l'événement en français"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Description
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      English
                    </label>
                    <Textarea
                      value={formData.descriptionEn}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          descriptionEn: e.target.value,
                        })
                      }
                      placeholder="Event description in English"
                      rows={6}
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      French
                    </label>
                    <Textarea
                      value={formData.descriptionFr}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          descriptionFr: e.target.value,
                        })
                      }
                      placeholder="Description de l'événement en français"
                      rows={6}
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Tags Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Tags (comma-separated)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      English
                    </label>
                    <Input
                      value={formData.tagsEn}
                      onChange={(e) =>
                        setFormData({ ...formData, tagsEn: e.target.value })
                      }
                      placeholder="Technology, Networking, Conference"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      French
                    </label>
                    <Input
                      value={formData.tagsFr}
                      onChange={(e) =>
                        setFormData({ ...formData, tagsFr: e.target.value })
                      }
                      placeholder="Technologie, Réseautage, Conférence"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Other Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Starting Date <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Attendees
                  </label>
                  <Input
                    type="number"
                    value={formData.attendees}
                    onChange={(e) =>
                      setFormData({ ...formData, attendees: e.target.value })
                    }
                    placeholder="0"
                    min="0"
                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Image Upload Field */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Hero Image</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      Upload File
                    </label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-gray-900 border-gray-700 text-white file:text-green-400 file:bg-gray-700 hover:file:bg-gray-600"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Priority given to uploaded file.
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">
                      OR Image URL
                    </label>
                    <Input
                      value={formData.heroImage}
                      onChange={(e) =>
                        setFormData({ ...formData, heroImage: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                      className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                {/* Image Preview */}
                {formData.heroImage && (
                  <div className="mt-4 relative h-48 bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
                    <img
                      src={formData.heroImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                        // Optionally show a placeholder if the URL is broken
                        e.target.parentElement.innerHTML =
                          '<div class="w-full h-full flex items-center justify-center text-gray-600">Image Preview Failed/URL Invalid</div>';
                      }}
                    />
                    {/* Placeholder for when no image source is valid */}
                    {!heroImageFile &&
                      !event?.heroImage &&
                      !formData.heroImage && (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-12 h-12 text-gray-600" />
                        </div>
                      )}
                  </div>
                )}
              </div>

              {uploadError && (
                <p className="text-red-500 text-sm">{uploadError}</p>
              )}

              <div className="flex gap-4 pt-4 border-t border-gray-700">
                <Button
                  onClick={handleSubmit}
                  disabled={
                    isUploading ||
                    !formData.titleEn ||
                    !formData.titleFr ||
                    !formData.startDate
                  }
                  className="bg-green-700 hover:bg-green-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading
                    ? event
                      ? "Updating..."
                      : "Creating..."
                    : event
                    ? "Update Event"
                    : "Create Event"}
                </Button>
                <Button
                  variant="outline"
                  onClick={onCancel}
                  disabled={isUploading}
                  className="border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
