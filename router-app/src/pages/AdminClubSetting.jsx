import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../db/firebase"; // adjust your path

export default function AdminClubSetting() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    instagram: "",
    facebook: "",
    tiktok: "",
    email: "",
    phone: "",
    location: "",
  });

  // Load settings
  useEffect(() => {
    const fetchSettings = async () => {
      const ref = doc(db, "clubSettings", "settings");
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setForm(snap.data());
      }
      setLoading(false);
    };

    fetchSettings();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save to Firestore
  const saveSettings = async () => {
    setSaving(true);
    const ref = doc(db, "clubSettings", "settings");

    await setDoc(
      ref,
      {
        ...form,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    setSaving(false);
    alert("Settings updated!");
  };

  if (loading) return <div className="text-gray-100">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight text-white mb-10">
          Club Settings
        </h1>

        <div className="space-y-5">
          {/* Instagram */}
          <div>
            <label className="text-sm mb-1 block">Instagram</label>
            <Input
              name="instagram"
              value={form.instagram}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-100"
              placeholder="https://instagram.com/club"
            />
          </div>

          {/* Facebook */}
          <div>
            <label className="text-sm mb-1 block">Facebook</label>
            <Input
              name="facebook"
              value={form.facebook}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-100"
              placeholder="https://facebook.com/club"
            />
          </div>

          {/* TikTok */}
          <div>
            <label className="text-sm mb-1 block">TikTok</label>
            <Input
              name="tiktok"
              value={form.tiktok}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-100"
              placeholder="https://tiktok.com/@club"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm mb-1 block">Email</label>
            <Input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className="bg-gray-800 border-gray-700 text-gray-100"
              placeholder="club@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm mb-1 block">Phone Number</label>
            <Input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-100"
              placeholder="+213 555 55 55 55"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm mb-1 block">Location</label>
            <Textarea
              name="location"
              value={form.location}
              onChange={handleChange}
              className="bg-gray-800 border-gray-700 text-gray-100"
              placeholder="University building, room number..."
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={saveSettings}
            className="bg-green-700 hover:bg-green-800 text-white"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
