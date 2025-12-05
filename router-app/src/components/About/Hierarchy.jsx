import React, { useState } from "react";
import { Plus, Save, X, Edit2, Trash2, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { uploadToCloudinary } from "../../lib/cloudinary";

function AddDepartmentForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    lead: { name: "", picture: "" },
  });

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e, field) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      setUploading(true);
      const result = await uploadToCloudinary(file, `lead-${field}`);

      if (result.success) {
        setFormData({
          ...formData,
          lead: { ...formData.lead, picture: result.url },
        });
      } else {
        alert("Error uploading image: " + result.error);
      }
      setUploading(false);
    }
  };

  const handleSubmit = () => {
    if (formData.name && formData.description && formData.lead.name) {
      onAdd(formData);
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-6 mb-6 border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">
        New Department
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Department Name *
          </label>
          <Input
            type="text"
            placeholder="Enter department name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description *
          </label>
          <Textarea
            placeholder="Enter department description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400 min-h-[96px]"
          />
        </div>

        <div className="border-t border-gray-600 pt-4">
          <h4 className="text-lg font-medium text-gray-100 mb-3">
            Department Lead *
          </h4>
          <div className="space-y-3">
            <Input
              type="text"
              placeholder="Lead Name"
              value={formData.lead.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lead: { ...formData.lead, name: e.target.value },
                })
              }
              className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lead Picture
              </label>
              {formData.lead.picture && (
                <div className="relative mb-3">
                  <img
                    src={formData.lead.picture}
                    alt="Lead preview"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <Button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        lead: { ...formData.lead, picture: "" },
                      })
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
                onChange={(e) => handleImageUpload(e, "picture")}
                disabled={uploading}
                className="bg-gray-800 text-gray-100 border-gray-600"
              />
              {uploading && (
                <p className="text-sm text-blue-400 mt-2">Uploading...</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSubmit}
            disabled={uploading}
            className="bg-green-700 hover:bg-green-600 disabled:opacity-50"
          >
            <Save size={18} className="mr-2" />
            Add Department
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-600"
            disabled={uploading}
          >
            <X size={18} className="mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// Department Card Component (View Mode)
function DepartmentCard({ department, onEdit, onDelete }) {
  return (
    <div className="bg-gray-700 rounded-2xl mt-10 p-5 border border-gray-600">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-100 mb-2">
            {department.name}
          </h3>
          {department.description && (
            <p className="text-gray-400 text-sm">{department.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => onEdit(department)}
            variant="outline"
            size="sm"
            className="border-gray-600 hover:bg-gray-600"
          >
            <Edit2 size={18} />
          </Button>
          <Button
            onClick={() => onDelete(department.id)}
            variant="destructive"
            size="sm"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>

      <div className="border-t border-gray-600 pt-4">
        <h4 className="text-sm font-medium text-gray-100 mb-3">
          Department Lead
        </h4>
        <div className="flex items-center gap-3">
          <img
            src={
              department.lead.picture ||
              "https://api.dicebear.com/7.x/avataaars/svg?seed=default"
            }
            alt={department.lead.name}
            className="w-12 h-12 rounded-full bg-gray-600 object-cover"
          />
          <span className="text-gray-300">{department.lead.name}</span>
        </div>
      </div>
    </div>
  );
}

// Department Edit Form Component
function DepartmentEditForm({ department, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...department });
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      setUploading(true);
      const result = await uploadToCloudinary(file, "lead-picture");

      if (result.success) {
        setFormData({
          ...formData,
          lead: { ...formData.lead, picture: result.url },
        });
      } else {
        alert("Error uploading image: " + result.error);
      }
      setUploading(false);
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Department Name *
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description *
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400 min-h-[96px]"
          />
        </div>

        <div className="border-t border-gray-600 pt-4">
          <h4 className="text-lg font-medium text-gray-100 mb-3">
            Department Lead
          </h4>
          <div className="space-y-3">
            <Input
              type="text"
              value={formData.lead.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lead: { ...formData.lead, name: e.target.value },
                })
              }
              className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Lead Picture
              </label>
              {formData.lead.picture && (
                <div className="relative mb-3">
                  <img
                    src={formData.lead.picture}
                    alt="Lead preview"
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <Button
                    onClick={() =>
                      setFormData({
                        ...formData,
                        lead: { ...formData.lead, picture: "" },
                      })
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
                onChange={handleImageUpload}
                disabled={uploading}
                className="bg-gray-800 text-gray-100 border-gray-600"
              />
              {uploading && (
                <p className="text-sm text-blue-400 mt-2">Uploading...</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => onSave(formData)}
            disabled={uploading}
            className="bg-green-700 hover:bg-green-600 disabled:opacity-50"
          >
            <Save size={18} className="mr-2" />
            Save
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-600"
            disabled={uploading}
          >
            <X size={18} className="mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// Departments Section Component
function Hierarchy({ departments = [], onUpdate = () => {} }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingDeptId, setEditingDeptId] = useState(null);

  const handleAddDepartment = (newDept) => {
    onUpdate([...departments, { ...newDept, id: Date.now() }]);
    setShowAddForm(false);
  };

  const handleDeleteDepartment = (id) => {
    onUpdate(departments.filter((dept) => dept.id !== id));
  };

  const handleSaveDepartment = (updatedDept) => {
    onUpdate(
      departments.map((dept) =>
        dept.id === updatedDept.id ? updatedDept : dept
      )
    );
    setEditingDeptId(null);
  };

  return (
    <div className="bg-gray-800 rounded-2xl mt-10 p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-100">
          Club Hierarchy / Departments
        </h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-green-700 hover:bg-green-600"
        >
          <Plus size={18} className="mr-2" />
          Add Department
        </Button>
      </div>

      {showAddForm && (
        <AddDepartmentForm
          onAdd={handleAddDepartment}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.id}>
            {editingDeptId === dept.id ? (
              <DepartmentEditForm
                department={dept}
                onSave={handleSaveDepartment}
                onCancel={() => setEditingDeptId(null)}
              />
            ) : (
              <DepartmentCard
                department={dept}
                onEdit={(dept) => setEditingDeptId(dept.id)}
                onDelete={handleDeleteDepartment}
              />
            )}
          </div>
        ))}
      </div>

      {departments.length === 0 && !showAddForm && (
        <div className="text-center py-12 text-gray-500">
          <p>
            No departments added yet. Click "Add Department" to get started.
          </p>
        </div>
      )}
    </div>
  );
}

export default Hierarchy;
