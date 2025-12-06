import React, { useState, useEffect } from "react";
import { Plus, Save, X, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// FIREBASE IMPORTS
import { db } from "../../../db/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

function AddValueForm({ onAdd, onCancel, onMessage }) {
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
    <div className="bg-gray-700 rounded-lg p-6 mb-6 border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">
        Add New Value
      </h3>
      <div className="space-y-6">
        {/* English Section */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <h4 className="text-lg font-semibold text-blue-400 mb-3">English</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Value Title *
              </label>
              <Input
                type="text"
                value={formData.en.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    en: { ...formData.en, title: e.target.value },
                  })
                }
                className="bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <Textarea
                value={formData.en.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    en: { ...formData.en, description: e.target.value },
                  })
                }
                className="bg-gray-700 text-gray-100 border-gray-600 min-h-[80px]"
              />
            </div>
          </div>
        </div>

        {/* French Section */}
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <h4 className="text-lg font-semibold text-green-400 mb-3">French</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Value Title *
              </label>
              <Input
                type="text"
                value={formData.fr.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fr: { ...formData.fr, title: e.target.value },
                  })
                }
                className="bg-gray-700 text-gray-100 border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <Textarea
                value={formData.fr.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fr: { ...formData.fr, description: e.target.value },
                  })
                }
                className="bg-gray-700 text-gray-100 border-gray-600 min-h-[80px]"
              />
            </div>
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
            className="border-gray-600 text-gray-300 hover:bg-gray-600"
          >
            <X size={18} className="mr-2" /> Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ value, onEdit, onDelete }) {
  return (
    <div className=" rounded-lg p-5 border border-gray-600">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="mb-4">
            <p className="text-xs text-gray-400 uppercase mb-1">English</p>
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              {value.en.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {value.en.description}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase mb-1">French</p>
            <h3 className="text-lg font-semibold text-gray-100 mb-2">
              {value.fr.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {value.fr.description}
            </p>
          </div>
        </div>
        <div className="flex gap-2 ml-4 flex-shrink-0">
          <Button
            onClick={() => onEdit(value)}
            size="sm"
            className="bg-transparent  hover:bg-gray-700 text-green-400 hover:text-green-300 transition-colors p-2"
          >
            <Edit2 size={18} />
          </Button>
          <Button
            onClick={() => onDelete(value.id)}
            size="sm"
            className="bg-transparent  hover:bg-gray-700 text-red-400 hover:text-red-300 transition-colors p-2"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ValueEditForm({ value, onSave, onCancel, onMessage }) {
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
    <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Edit Value</h3>
      {/* Same fields as AddForm, just using formData state initialized with value */}
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <h4 className="text-lg font-semibold text-blue-400 mb-3">English</h4>
          <div className="space-y-3">
            <Input
              value={formData.en.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  en: { ...formData.en, title: e.target.value },
                })
              }
              className="bg-gray-700 text-gray-100 border-gray-600"
            />
            <Textarea
              value={formData.en.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  en: { ...formData.en, description: e.target.value },
                })
              }
              className="bg-gray-700 text-gray-100 border-gray-600 min-h-[80px]"
            />
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-600">
          <h4 className="text-lg font-semibold text-green-400 mb-3">French</h4>
          <div className="space-y-3">
            <Input
              value={formData.fr.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fr: { ...formData.fr, title: e.target.value },
                })
              }
              className="bg-gray-700 text-gray-100 border-gray-600"
            />
            <Textarea
              value={formData.fr.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fr: { ...formData.fr, description: e.target.value },
                })
              }
              className="bg-gray-700 text-gray-100 border-gray-600 min-h-[80px]"
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
            className="border-gray-600 text-gray-300 hover:bg-gray-600"
          >
            <X size={18} className="mr-2" /> Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// MAIN COMPONENT
function OurValues() {
  const [values, setValues] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingValueId, setEditingValueId] = useState(null);
  const [message, setMessage] = useState("");

  const docRef = doc(db, "content", "Value");

  // 1. FETCH DATA ON LOAD
  useEffect(() => {
    const fetchValues = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Assuming the field name inside the document is 'valuesList'
          setValues(docSnap.data().valuesList || []);
        } else {
          // If document doesn't exist, we can initialize it later on first add
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

  // HELPER TO SYNC WITH FIRESTORE
  const updateFirestore = async (newValuesList) => {
    try {
      // We use setDoc with merge: true to handle cases where doc might not exist yet
      await setDoc(docRef, { valuesList: newValuesList }, { merge: true });
      setValues(newValuesList); // Update local state only after successful DB write
      return true;
    } catch (error) {
      console.error("Error updating database:", error);
      showMessage("Failed to save changes to database", true);
      return false;
    }
  };

  const handleAddValue = async (newValue) => {
    const itemToAdd = { ...newValue, id: Date.now() };
    const updatedList = [...values, itemToAdd];

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
    if (success) {
      showMessage("Value deleted successfully!");
    }
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
    <div className="bg-gray-800 rounded-2xl mt-10 p-6 border border-gray-700">
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

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-100">Our Values</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-green-700 hover:bg-green-600"
        >
          <Plus size={18} className="mr-2" /> Add Value
        </Button>
      </div>

      {showAddForm && (
        <AddValueForm
          onAdd={handleAddValue}
          onCancel={() => setShowAddForm(false)}
          onMessage={showMessage}
        />
      )}

      <div className="space-y-4">
        {values.map((value) => (
          <div key={value.id}>
            {editingValueId === value.id ? (
              <ValueEditForm
                value={value}
                onSave={handleSaveValue}
                onCancel={() => setEditingValueId(null)}
                onMessage={showMessage}
              />
            ) : (
              <ValueCard
                value={value}
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
