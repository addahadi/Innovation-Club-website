import React, { useState, useEffect } from "react";
import { Plus, Save, X, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// FIREBASE IMPORTS
import { db } from "../../../db/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// LANGUAGE TOGGLE
import LanguageToggle from "@/components/LanguageToggle";

// ------------------------- AddValueForm -------------------------
function AddValueForm({ onAdd, onCancel, onMessage, lang }) {
  const [formData, setFormData] = useState({
    en: { title: "", description: "" },
    fr: { title: "", description: "" },
  });

  const handleSubmit = () => {
    if (
      !formData.en.title.trim() ||
      !formData.en.description.trim() ||
      !formData.fr.title.trim() ||
      !formData.fr.description.trim()
    ) {
      onMessage("Error: Please fill in all fields", true);
      return;
    }
    onAdd(formData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">
        Add New Value
      </h3>

      {/* Show only selected language */}
      <div className=" p-4 rounded-lg mt-10">
        <label className=" text-gray-300">Title</label>
        <div className=" flex flex-row gap-3">
          <Input
            placeholder="Title (En)"
            value={formData.en.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                en: { ...formData.en, title: e.target.value },
              })
            }
            className="bg-gray-900 text-gray-100 border-gray-600"
          />
          <Input
            placeholder="Titre (Fr)"
            value={formData.fr.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                fr: { ...formData.fr, title: e.target.value },
              })
            }
            className="bg-gray-900 text-gray-100 border-gray-600 "
          />
        </div>
      </div>
      <div className=" p-4 rounded-lg  mb-6 ">
        <label className=" text-gray-300">Description</label>
        <div className=" flex flex-row gap-3">
          <Textarea
            placeholder="Description (En)"
            value={formData.en.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                en: { ...formData.en, description: e.target.value },
              })
            }
            className="bg-gray-900 text-gray-100 border-gray-600 min-h-[80px]"
          />
          <Textarea
            placeholder="Description (Fr)"
            value={formData.fr.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                fr: { ...formData.fr, description: e.target.value },
              })
            }
            className="bg-gray-900 text-gray-100 border-gray-600 min-h-[80px]"
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleSubmit}
          className="bg-green-700 hover:bg-green-600"
        >
          <Save size={18} className="mr-2" /> Add Value
        </Button>
        <Button
          onClick={onCancel}
          variant="outline"
        >
          <X size={18} className="mr-2" /> Cancel
        </Button>
      </div>
    </div>
  );
}

// ------------------------- ValueCard -------------------------
function ValueCard({ value, lang, onEdit, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-600">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-xs text-gray-400 uppercase mb-1">
            {lang === "en" ? "English" : "French"}
          </p>

          <h3 className="text-lg font-semibold text-gray-100 mb-2">
            {value[lang].title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed">
            {value[lang].description}
          </p>
        </div>

        <div className="flex gap-2 ml-4 flex-shrink-0">
          <Button
            onClick={() => onEdit(value)}
            size="sm"
            className="bg-transparent hover:bg-gray-700 text-green-400 hover:text-green-300 p-2"
          >
            <Edit2 size={18} />
          </Button>

          <Button
            onClick={() => onDelete(value.id)}
            size="sm"
            className="bg-transparent hover:bg-gray-700 text-red-400 hover:text-red-300 p-2"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ------------------------- ValueEditForm -------------------------
function ValueEditForm({ value, onSave, onCancel, onMessage, lang }) {
  const [formData, setFormData] = useState({ ...value });

  const handleSubmit = () => {
    if (
      !formData.en.title.trim() ||
      !formData.en.description.trim() ||
      !formData.fr.title.trim() ||
      !formData.fr.description.trim()
    ) {
      onMessage("Error: Please fill in all fields", true);
      return;
    }
    onSave(formData);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Edit Value</h3>

      <div className=" p-4 rounded-lg mt-10">
        <label className=" text-gray-300">Title</label>
        <div className=" flex flex-row gap-3">
          <Input
            placeholder="Title (En)"
            value={formData.en.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                en: { ...formData.en, title: e.target.value },
              })
            }
            className="bg-gray-900 text-gray-100 border-gray-600"
          />
          <Input
            placeholder="Titre (Fr)"
            value={formData.fr.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                fr: { ...formData.fr, title: e.target.value },
              })
            }
            className="bg-gray-900 text-gray-100 border-gray-600 "
          />
        </div>
      </div>
      <div className=" p-4 rounded-lg  mb-6 ">
        <label className=" text-gray-300">Description</label>
        <div className=" flex flex-row gap-3">
          <Textarea
            placeholder="Description (En)"
            value={formData.en.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                en: { ...formData.en, description: e.target.value },
              })
            }
            className="bg-gray-900 text-gray-100 border-gray-600 min-h-[80px]"
          />
          <Textarea
            placeholder="Description (Fr)"
            value={formData.fr.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                fr: { ...formData.fr, description: e.target.value },
              })
            }
            className="bg-gray-900 text-gray-100 border-gray-600 min-h-[80px]"
          />
        </div>
      </div>
      <div className="flex gap-3 pt-4">
        <Button
          onClick={handleSubmit}
          className="bg-green-700 hover:bg-green-600"
        >
          <Save size={18} className="mr-2" /> Save Changes
        </Button>

        <Button
          onClick={onCancel}
          variant="outline"

        >
          <X size={18} className="mr-2" /> Cancel
        </Button>
      </div>
    </div>
  );
}

// ------------------------- MAIN COMPONENT -------------------------
function OurValues() {
  const [values, setValues] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingValueId, setEditingValueId] = useState(null);
  const [message, setMessage] = useState("");
  const [previewLang, setPreviewLang] = useState("en");

  const docRef = doc(db, "content", "Value");

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setValues(docSnap.data().valuesList || []);
        } else {
          setValues([]);
        }
      } catch (error) {
        console.error("Error fetching values:", error);
        showMessage("Error loading data from database", true);
      }
    };
    fetchValues();
  }, []);

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const updateFirestore = async (newValuesList) => {
    try {
      await setDoc(docRef, { valuesList: newValuesList }, { merge: true });
      setValues(newValuesList);
      return true;
    } catch (error) {
      console.error("Error updating database:", error);
      showMessage("Failed to save changes to database", true);
      return false;
    }
  };

  const handleAddValue = async (newValue) => {
    const item = { ...newValue, id: Date.now() };
    const updatedList = [...values, item];

    const success = await updateFirestore(updatedList);
    if (success) {
      setShowAddForm(false);
      showMessage("Value added successfully!");
    }
  };

  const handleDeleteValue = async (id) => {
    if (!window.confirm("Delete this value?")) return;

    const updatedList = values.filter((value) => value.id !== id);

    const success = await updateFirestore(updatedList);
    if (success) showMessage("Value deleted successfully!");
  };

  const handleSaveValue = async (updatedValue) => {
    const updatedList = values.map((value) =>
      value.id === updatedValue.id ? updatedValue : value
    );

    const success = await updateFirestore(updatedList);
    if (success) {
      setEditingValueId(null);
      showMessage("Value updated successfully!");
    }
  };

  return (
    <div className="mt-10 p-6">
      {message && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            message.includes("Error") || message.includes("Failed")
              ? "bg-red-500/20 text-red-300 border border-red-500"
              : "bg-green-500/20 text-green-300 border border-green-500"
          }`}
        >
          {message}
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-gray-100">
          Our Values
        </h2>

        <div className="flex items-center gap-3">
          <LanguageToggle
            previewLang={previewLang}
            setPreviewLang={setPreviewLang}
          />

          <Button
            onClick={() => setShowAddForm(true)}
            className="bg-green-700 hover:bg-green-600"
          >
            <Plus size={18} className="mr-2" /> Add Value
          </Button>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <AddValueForm
          lang={previewLang}
          onAdd={handleAddValue}
          onCancel={() => setShowAddForm(false)}
          onMessage={showMessage}
        />
      )}

      {/* Values List */}
      <div className="space-y-4">
        {values.map((value) => (
          <div key={value.id}>
            {editingValueId === value.id ? (
              <ValueEditForm
                value={value}
                lang={previewLang}
                onSave={handleSaveValue}
                onCancel={() => setEditingValueId(null)}
                onMessage={showMessage}
              />
            ) : (
              <ValueCard
                value={value}
                lang={previewLang}
                onEdit={(value) => setEditingValueId(value.id)}
                onDelete={handleDeleteValue}
              />
            )}
          </div>
        ))}
      </div>

      {values.length === 0 && !showAddForm && (
        <div className="text-center py-12 text-gray-500">
          <p>No values added yet. Click "Add Value" to get started.</p>
        </div>
      )}
    </div>
  );
}

export default OurValues;
