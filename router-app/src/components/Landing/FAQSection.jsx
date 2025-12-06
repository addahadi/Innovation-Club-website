import { Edit2, Languages, Plus, Save, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";


import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../db/firebase";
import { collection, getDocs, deleteDoc } from "firebase/firestore";
import LanguageToggle from "../LanguageToggle";

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [editingFaq, setEditingFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [previewLang, setPreviewLang] = useState("en");

  // Fetch FAQs from Firestore on component mount
  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const faqsCollection = collection(db, "faqs");
      const faqsSnapshot = await getDocs(faqsCollection);
      const faqsList = faqsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFaqs(faqsList);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      setMessage("Error loading FAQs: " + error.message);
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const saveFaq = async (faq) => {
    try {
      setSaving(true);
      const faqDoc = doc(db, "faqs", faq.id);
      await setDoc(faqDoc, {
        en: faq.en,
        fr: faq.fr,
      });
      setMessage("FAQ saved successfully!");
      setEditingFaq(null);
    } catch (error) {
      console.error("Error saving FAQ:", error);
      setMessage("Error saving FAQ: " + error.message);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const deleteFaq = async (id) => {
    try {
      setSaving(true);
      await deleteDoc(doc(db, "faqs", id));
      setFaqs(faqs.filter((faq) => faq.id !== id));
      setMessage("FAQ deleted successfully!");
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      setMessage("Error deleting FAQ: " + error.message);
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const updateFaq = (id, language, field, value) => {
    setFaqs(
      faqs.map((faq) =>
        faq.id === id
          ? { ...faq, [language]: { ...faq[language], [field]: value } }
          : faq
      )
    );
  };

  const addFaq = () => {
    const newFaq = {
      id: Date.now().toString(),
      en: { question: "", answer: "" },
      fr: { question: "", answer: "" },
    };
    setFaqs([...faqs, newFaq]);
    setEditingFaq(newFaq.id);
  };

  const cancelEdit = (faq) => {
    setEditingFaq(null);
    // If it's a new FAQ with empty fields, remove it
    if (
      !faq.en.question &&
      !faq.fr.question &&
      !faq.en.answer &&
      !faq.fr.answer
    ) {
      setFaqs(faqs.filter((f) => f.id !== faq.id));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl">Loading FAQs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div>
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes("Error")
                ? "bg-red-500/20 text-red-300 border border-red-500"
                : "bg-green-500/20 text-green-300 border border-green-500"
            }`}
          >
            {message}
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold tracking-tight  text-white">
              Frequently Asked Questions
            </h2>
            <div className="flex items-center gap-3">
              <LanguageToggle
                previewLang={previewLang}
                setPreviewLang={setPreviewLang}
              />
              <Button
                onClick={addFaq}
                className="bg-green-600 hover:bg-green-700"
                disabled={saving}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add FAQ
              </Button>
            </div>
          </div>

          {faqs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg mb-2">No FAQs yet</p>
              <p className="text-sm">
                Click "Add FAQ" to create your first question
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className=" bg-gray-800 border border-gray-700 rounded-lg p-4"
                >
                  {editingFaq === faq.id ? (
                    <div className="">
                      {/* English */}
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Question
                          </label>
                          <div className=" flex flex-row gap-3">
                            <Input
                              type="text"
                              value={faq.en.question}
                              onChange={(e) =>
                                updateFaq(
                                  faq.id,
                                  "en",
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="Question"
                              className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
                            />
                            <Input
                              type="text"
                              value={faq.fr.question}
                              onChange={(e) =>
                                updateFaq(
                                  faq.id,
                                  "fr",
                                  "question",
                                  e.target.value
                                )
                              }
                              placeholder="Question"
                              className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
                            />
                          </div>
                        </div>
                      </div>

                      {/* French */}
                      <div className="bg-gray-750 px-4 pb-4 rounded-lg">
                        <div className="mb-3">
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Answer
                          </label>
                          <div className=" flex flex-row gap-3">
                            <Textarea
                              value={faq.en.answer}
                              onChange={(e) =>
                                updateFaq(
                                  faq.id,
                                  "en",
                                  "answer",
                                  e.target.value
                                )
                              }
                              placeholder="Answer"
                              className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
                            />
                            <Textarea
                              value={faq.fr.answer}
                              onChange={(e) =>
                                updateFaq(
                                  faq.id,
                                  "fr",
                                  "answer",
                                  e.target.value
                                )
                              }
                              placeholder="Réponse"
                              className="bg-gray-900 border-gray-600 text-white placeholder-gray-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => saveFaq(faq)}
                          className="bg-green-600 hover:bg-green-700"
                          disabled={saving}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {saving ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          onClick={() => cancelEdit(faq)}
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          disabled={saving}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          {previewLang === "fr" ? (
                            <div>
                              <span className="text-sm text-gray-400 uppercas mb-8">
                                French
                              </span>
                              <h3 className="font-semibold text-white">
                                {faq.fr.question || "(Pas de question)"}
                              </h3>
                              <p className="text-gray-400 text-sm mt-1">
                                {faq.fr.answer || "(Pas de réponse)"}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <span className="text-sm text-gray-400 uppercase mb-8">
                                English
                              </span>
                              <h3 className="font-semibold text-white">
                                {faq.en.question || "(no question)"}
                              </h3>
                              <p className="text-gray-400 text-sm mt-1">
                                {faq.en.answer || "(no answer)"}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            onClick={() => setEditingFaq(faq.id)}
                            className="bg-transparent hover:bg-gray-700 text-green-400 hover:text-green-300 transition-colors p-2"
                            disabled={saving}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => deleteFaq(faq.id)}
                            className="bg-transparent hover:bg-gray-700 text-red-400 hover:text-red-300 transition-colors p-2"
                            disabled={saving}
                          >
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
