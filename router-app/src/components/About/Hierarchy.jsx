import React, { useState, useEffect } from "react";
import { Plus, Save, X, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// FIREBASE IMPORTS
import { db } from "../../../db/firebase"; // Adjust path to your firebase config
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// CLOUDINARY IMPORT
import { uploadImage } from "../../lib/cloudinary";

const emptyDepartment = () => ({
  en: { name: "", description: "", lead: { name: "", picture: "" } },
  fr: { name: "", description: "", lead: { name: "", picture: "" } },
});

// --- SUB-COMPONENT: ADD FORM ---
function AddDepartmentForm({ onAdd, onCancel, onMessage }) {
  const [formData, setFormData] = useState(emptyDepartment());
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      // Update picture for both EN and FR (assuming same person/pic)
      setFormData((prev) => ({
        ...prev,
        en: { ...prev.en, lead: { ...prev.en.lead, picture: url } },
        fr: { ...prev.fr, lead: { ...prev.fr.lead, picture: url } },
      }));
      onMessage("Image uploaded successfully!");
    } catch (error) {
      onMessage("Error uploading image", true);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.en.name.trim() ||
      !formData.fr.name.trim() ||
      !formData.en.description.trim() ||
      !formData.fr.description.trim() ||
      !formData.en.lead.name.trim() ||
      !formData.fr.lead.name.trim()
    ) {
      onMessage("Error: Fill all fields for both EN & FR", true);
      return;
    }

    // Pass data up to parent to handle Firestore
    onAdd(formData);
    setFormData(emptyDepartment());
  };

  return (
    <div className=" rounded-lg p-6 mb-6 border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">
        New Department
      </h3>

      <label className="block text-sm text-gray-300 mb-2">Name *</label>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Input
          placeholder="Name (EN)"
          value={formData.en.name}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              en: { ...prev.en, name: e.target.value },
            }))
          }
          className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
        />
        <Input
          placeholder="Nom (FR)"
          value={formData.fr.name}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              fr: { ...prev.fr, name: e.target.value },
            }))
          }
          className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
        />
      </div>

      <label className="block text-sm text-gray-300 mb-2">Description *</label>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Textarea
          placeholder="Description (EN)"
          value={formData.en.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              en: { ...prev.en, description: e.target.value },
            }))
          }
          className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400 min-h-[96px]"
        />
        <Textarea
          placeholder="Description (FR)"
          value={formData.fr.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              fr: { ...prev.fr, description: e.target.value },
            }))
          }
          className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400 min-h-[96px]"
        />
      </div>

      <div className="border-t border-gray-600 pt-4">
        <h4 className="text-lg text-gray-100 mb-3">Department Lead *</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Input
            placeholder="Lead Name (EN)"
            value={formData.en.lead.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                en: {
                  ...prev.en,
                  lead: { ...prev.en.lead, name: e.target.value },
                },
              }))
            }
            className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
          />
          <Input
            placeholder="Nom du Lead (FR)"
            value={formData.fr.lead.name}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                fr: {
                  ...prev.fr,
                  lead: { ...prev.fr.lead, name: e.target.value },
                },
              }))
            }
            className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
          />
        </div>

        <label className="block text-sm text-gray-300 mb-2">Lead Picture</label>
        {formData.en.lead.picture && (
          <div className="relative mb-3">
            <img
              src={formData.en.lead.picture}
              alt="Lead preview"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <Button
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  en: { ...prev.en, lead: { ...prev.en.lead, picture: "" } },
                  fr: { ...prev.fr, lead: { ...prev.fr.lead, picture: "" } },
                }))
              }
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1"
            >
              <X size={14} />
            </Button>
          </div>
        )}

        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="bg-gray-800 text-gray-100 border-gray-600"
        />
        {uploading && (
          <p className="text-sm text-blue-400 mt-2">
            Uploading to Cloudinary...
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-6">
        <Button
          onClick={handleSubmit}
          disabled={uploading}
          className="bg-green-700 hover:bg-green-600 disabled:opacity-50"
        >
          <Save size={18} className="mr-2" /> Add
        </Button>
        <Button onClick={onCancel} variant="outline">
          <X size={18} className="mr-2" /> Cancel
        </Button>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: CARD ---
function DepartmentCard({ department, onEdit, onDelete, lang }) {
  // Guard clause in case lang data is missing
  if (!department[lang]) return null;

  return (
    <div className=" rounded-2xl p-5 border border-gray-600 mt-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-100">
            {department[lang].name}
          </h3>
          <p className="text-gray-400 text-sm">
            {department[lang].description}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(department)}
            size="sm"
            className="bg-transparent  hover:bg-gray-700 text-green-400 hover:text-green-300 transition-colors p-2"
          >
            <Edit2 size={18} />
          </Button>
          <Button
            onClick={() => onDelete(department.id)}
            size="sm"
            className="bg-transparent  hover:bg-gray-700 text-red-400 hover:text-red-300 transition-colors p-2"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <h4 className="text-sm text-gray-100 mb-3">Lead</h4>
        <div className="flex items-center gap-3">
          <img
            src={
              department[lang].lead.picture ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
            }
            alt={department[lang].lead.name}
            className="w-12 h-12 rounded-full object-cover bg-gray-600"
          />
          <span className="text-gray-300">{department[lang].lead.name}</span>
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: EDIT FORM ---
function DepartmentEditForm({ department, onSave, onCancel, onMessage }) {
  const [formData, setFormData] = useState({ ...department });
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        en: { ...prev.en, lead: { ...prev.en.lead, picture: url } },
        fr: { ...prev.fr, lead: { ...prev.fr.lead, picture: url } },
      }));
      onMessage("New image uploaded successfully!");
    } catch (error) {
      onMessage("Error uploading image", true);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (
      !formData.en.name.trim() ||
      !formData.fr.name.trim() ||
      !formData.en.description.trim() ||
      !formData.fr.description.trim() ||
      !formData.en.lead.name.trim() ||
      !formData.fr.lead.name.trim()
    ) {
      onMessage("Error: Fill all fields for both EN & FR", true);
      return;
    }
    onSave(formData);
  };

  return (
    <div className=" rounded-lg p-6 border border-gray-600 mt-6">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">
        Edit Department
      </h3>
      {/* (Form inputs are identical to Add Form, abbreviated here for brevity but logic is same) */}

      <label className="block text-sm text-gray-300 mb-2">Name *</label>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Input
          value={formData.en.name}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              en: { ...p.en, name: e.target.value },
            }))
          }
          className="bg-gray-800 text-gray-100 border-gray-600"
        />
        <Input
          value={formData.fr.name}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              fr: { ...p.fr, name: e.target.value },
            }))
          }
          className="bg-gray-800 text-gray-100 border-gray-600"
        />
      </div>

      <label className="block text-sm text-gray-300 mb-2">Description *</label>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Textarea
          value={formData.en.description}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              en: { ...p.en, description: e.target.value },
            }))
          }
          className="bg-gray-800 text-gray-100 border-gray-600 min-h-[96px]"
        />
        <Textarea
          value={formData.fr.description}
          onChange={(e) =>
            setFormData((p) => ({
              ...p,
              fr: { ...p.fr, description: e.target.value },
            }))
          }
          className="bg-gray-800 text-gray-100 border-gray-600 min-h-[96px]"
        />
      </div>

      <div className="border-t border-gray-600 pt-4">
        <h4 className="text-lg text-gray-100 mb-3">Department Lead *</h4>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Input
            value={formData.en.lead.name}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                en: { ...p.en, lead: { ...p.en.lead, name: e.target.value } },
              }))
            }
            className="bg-gray-800 text-gray-100 border-gray-600"
          />
          <Input
            value={formData.fr.lead.name}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                fr: { ...p.fr, lead: { ...p.fr.lead, name: e.target.value } },
              }))
            }
            className="bg-gray-800 text-gray-100 border-gray-600"
          />
        </div>

        <label className="block text-sm text-gray-300 mb-2">Lead Picture</label>
        {formData.en.lead.picture && (
          <div className="relative mb-3">
            <img
              src={formData.en.lead.picture}
              alt="Lead preview"
              className="w-24 h-24 rounded-lg object-cover"
            />
            <Button
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  en: { ...p.en, lead: { ...p.en.lead, picture: "" } },
                  fr: { ...p.fr, lead: { ...p.fr.lead, picture: "" } },
                }))
              }
              variant="destructive"
              size="sm"
              className="absolute top-1 right-1"
            >
              <X size={14} />
            </Button>
          </div>
        )}

        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="bg-gray-800 text-gray-100 border-gray-600"
        />
        {uploading && (
          <p className="text-sm text-blue-400 mt-2">Uploading...</p>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          onClick={handleSubmit}
          disabled={uploading}
          className="bg-green-700 hover:bg-green-600 disabled:opacity-50"
        >
          <Save size={18} className="mr-2" /> Save
        </Button>
        <Button onClick={onCancel} variant="outline">
          <X size={18} className="mr-2" /> Cancel
        </Button>
      </div>
    </div>
  );
}

// --- MAIN COMPONENT ---
function Hierarchy() {
  const [departments, setDepartments] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [message, setMessage] = useState("");
  const [lang, setLang] = useState("en"); // Toggle this based on your app's global context if needed

  const departmentsCollectionRef = collection(db, "departments");

  // 1. FETCH DEPARTMENTS ON MOUNT
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const data = await getDocs(departmentsCollectionRef);
        setDepartments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error("Error fetching departments:", error);
        showMessage("Failed to load departments", true);
      }
    };

    getDepartments();
  }, []);

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // 2. HANDLE ADD (CREATE)
  const handleAddDepartment = async (newDept) => {
    try {
      // Remove temporary ID if present, let Firestore generate one
      const { id, ...deptData } = newDept;

      const docRef = await addDoc(departmentsCollectionRef, deptData);

      // Update local state to avoid refetching
      setDepartments((prev) => [...prev, { ...deptData, id: docRef.id }]);
      setShowAddForm(false);
      showMessage("Department added successfully!");
    } catch (error) {
      console.error("Error adding department:", error);
      showMessage("Error adding department to database", true);
    }
  };

  // 3. HANDLE DELETE
  const handleDeleteDepartment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this department?"))
      return;

    try {
      const departmentDoc = doc(db, "departments", id);
      await deleteDoc(departmentDoc);

      setDepartments((prev) => prev.filter((d) => d.id !== id));
      showMessage("Department deleted successfully!");
    } catch (error) {
      console.error("Error deleting department:", error);
      showMessage("Error deleting department", true);
    }
  };

  const handleStartEdit = (dept) => {
    setEditingDepartment(dept);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. HANDLE SAVE (UPDATE)
  const handleSaveDepartment = async (updatedDept) => {
    try {
      const departmentDoc = doc(db, "departments", updatedDept.id);

      // We don't want to save the ID inside the document fields
      const { id, ...dataToUpdate } = updatedDept;

      await updateDoc(departmentDoc, dataToUpdate);

      setDepartments((prev) =>
        prev.map((d) => (d.id === updatedDept.id ? updatedDept : d))
      );
      setEditingDepartment(null);
      showMessage("Department updated successfully!");
    } catch (error) {
      console.error("Error updating department:", error);
      showMessage("Error updating department", true);
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
        <h2 className="text-2xl font-semibold text-gray-100">
          Club Hierarchy / Departments
        </h2>

        <div className="flex items-center gap-3">
          {/* Simple Lang Toggle for Demo Purposes */}
          <Button
            variant="ghost"
            onClick={() => setLang((l) => (l === "en" ? "fr" : "en"))}
            className="text-gray-400 hover:text-white"
          >
            {lang.toUpperCase()}
          </Button>

          <Button
            onClick={() => {
              setShowAddForm(true);
              setEditingDepartment(null);
            }}
            className="bg-green-700 hover:bg-green-600"
          >
            <Plus size={18} className="mr-2" /> Add Department
          </Button>
        </div>
      </div>

      {showAddForm && (
        <AddDepartmentForm
          onAdd={handleAddDepartment}
          onCancel={() => setShowAddForm(false)}
          onMessage={showMessage}
        />
      )}

      {editingDepartment && (
        <DepartmentEditForm
          department={editingDepartment}
          onSave={handleSaveDepartment}
          onCancel={() => setEditingDepartment(null)}
          onMessage={showMessage}
        />
      )}

      <div className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.id}>
            <DepartmentCard
              department={dept}
              onEdit={handleStartEdit}
              onDelete={handleDeleteDepartment}
              lang={lang}
            />
          </div>
        ))}
      </div>

      {departments.length === 0 && !showAddForm && !editingDepartment && (
        <div className="text-center py-12 text-gray-500">
          <p>No departments found. Click "Add Department" to get started.</p>
        </div>
      )}
    </div>
  );
}

export default Hierarchy;
