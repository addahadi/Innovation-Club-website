import React, { useState } from "react";
import { Plus, Save, X, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

function AddValueForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = () => {
    if (formData.title.trim() && formData.description.trim()) {
      onAdd(formData);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-6 mb-6 border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">
        Add New Value
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Value Title *
          </label>
          <Input
            type="text"
            placeholder="Enter value title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description *
          </label>
          <Textarea
            placeholder="Enter value description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400 min-h-[96px]"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-600"
          >
            <Save size={18} className="mr-2" />
            Add Value
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-600"
          >
            <X size={18} className="mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// Value Card Component (View Mode)
function ValueCard({ value, onEdit, onDelete }) {
  return (
    <div className="bg-gray-700 rounded-lg p-5 border border-gray-600">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-100 mb-2">
            {value.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {value.description}
          </p>
        </div>
        <div className="flex gap-2 ml-4 flex-shrink-0">
          <Button
            onClick={() => onEdit(value)}
            variant="outline"
            size="sm"
            className="border-gray-600 hover:bg-gray-600"
          >
            <Edit2 size={18} />
          </Button>
          <Button
            onClick={() => onDelete(value.id)}
            variant="destructive"
            size="sm"
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}

// Value Edit Form Component
function ValueEditForm({ value, onSave, onCancel }) {
  const [formData, setFormData] = useState({ ...value });

  const handleSubmit = () => {
    if (formData.title.trim() && formData.description.trim()) {
      onSave(formData);
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">Edit Value</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Value Title *
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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

        <div className="flex gap-3 pt-4">
          <Button
            onClick={handleSubmit}
            className="bg-green-700 hover:bg-green-600"
          >
            <Save size={18} className="mr-2" />
            Save Changes
          </Button>
          <Button
            onClick={onCancel}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-600"
          >
            <X size={18} className="mr-2" />
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

// Our Values Section Component
function OurValues({ values = [], onUpdate = () => {} }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingValueId, setEditingValueId] = useState(null);

  const handleAddValue = (newValue) => {
    onUpdate([...values, { ...newValue, id: Date.now() }]);
    setShowAddForm(false);
  };

  const handleDeleteValue = (id) => {
    onUpdate(values.filter((value) => value.id !== id));
  };

  const handleSaveValue = (updatedValue) => {
    onUpdate(
      values.map((value) =>
        value.id === updatedValue.id ? updatedValue : value
      )
    );
    setEditingValueId(null);
  };

  return (
    <div className="bg-gray-800 rounded-2xl mt-10 p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-100">Our Values</h2>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-green-700 hover:bg-green-600"
        >
          <Plus size={18} className="mr-2" />
          Add Value
        </Button>
      </div>

      {showAddForm && (
        <AddValueForm
          onAdd={handleAddValue}
          onCancel={() => setShowAddForm(false)}
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
