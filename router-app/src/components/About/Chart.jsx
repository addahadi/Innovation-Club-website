import React, { useState, useEffect } from "react";
import { Plus, Save, X, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// FIREBASE IMPORTS
import { db } from "../../../db/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Chart() {
  const [chartData, setChartData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingYear, setEditingYear] = useState(null);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    members: "",
    events: "",
  });

  const sortedData = [...chartData].sort((a, b) => a.year - b.year);
  const existingYears = chartData.map((d) => d.year);

  const docRef = doc(db, "content", "Chart");

  // 1. FETCH DATA
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Assuming field name is 'stats'
          setChartData(docSnap.data().stats || []);
        } else {
          setChartData([]);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
        showMessage("Error loading data", true);
      }
    };
    fetchChartData();
  }, []);

  const showMessage = (msg, isError = false) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // HELPER TO UPDATE FIRESTORE
  const updateFirestore = async (newData) => {
    try {
      await setDoc(docRef, { stats: newData }, { merge: true });
      setChartData(newData);
      return true;
    } catch (error) {
      console.error("Error updating chart:", error);
      showMessage("Failed to save to database", true);
      return false;
    }
  };

  const handleAddYear = async () => {
    if (
      !formData.year ||
      !formData.members ||
      !formData.events ||
      existingYears.includes(formData.year)
    ) {
      if (existingYears.includes(formData.year)) {
        showMessage("Error: This year already exists", true);
      } else {
        showMessage("Error: Please fill in all fields", true);
      }
      return;
    }

    const newItem = {
      year: formData.year,
      members: parseInt(formData.members),
      events: parseInt(formData.events),
    };

    const newData = [...chartData, newItem];
    const success = await updateFirestore(newData);

    if (success) {
      setFormData({
        year: new Date().getFullYear(),
        members: "",
        events: "",
      });
      setShowAddForm(false);
      showMessage("Year data added successfully!");
    }
  };

  const handleEditYear = (year) => {
    const data = chartData.find((d) => d.year === year);
    setFormData(data);
    setEditingYear(year);
  };

  const handleSaveEdit = async () => {
    if (!formData.members || !formData.events) {
      showMessage("Error: Please fill in all fields", true);
      return;
    }

    const newData = chartData.map((data) =>
      data.year === editingYear
        ? {
            ...data,
            members: parseInt(formData.members),
            events: parseInt(formData.events),
          }
        : data
    );

    const success = await updateFirestore(newData);

    if (success) {
      setEditingYear(null);
      setFormData({
        year: new Date().getFullYear(),
        members: "",
        events: "",
      });
      showMessage("Year data updated successfully!");
    }
  };

  const handleDeleteYear = async (year) => {
    if (!window.confirm("Are you sure?")) return;

    const newData = chartData.filter((data) => data.year !== year);
    const success = await updateFirestore(newData);

    if (success) {
      showMessage("Year data deleted successfully!");
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
        <div>
          <h2 className="text-2xl font-semibold text-gray-100">
            Club Statistics
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage members and events data by year
          </p>
        </div>
        <Button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingYear(null);
          }}
          className="bg-green-700 hover:bg-green-600"
        >
          <Plus size={18} className="mr-2" />
          Add Year
        </Button>
      </div>

      {/* Add/Edit Form - Minimal Row */}
      {(showAddForm || editingYear) && (
        <div className="mb-6 bg-gray-700 border border-gray-600 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Year
              </label>
              <Input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
                disabled={editingYear !== null}
                className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
                min="2016"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Members
              </label>
              <Input
                type="number"
                value={formData.members}
                onChange={(e) =>
                  setFormData({ ...formData, members: e.target.value })
                }
                className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
                min="0"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                Events
              </label>
              <Input
                type="number"
                value={formData.events}
                onChange={(e) =>
                  setFormData({ ...formData, events: e.target.value })
                }
                className="bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400"
                min="0"
              />
            </div>

            <div className="flex gap-2">
              <Button
                onClick={editingYear ? handleSaveEdit : handleAddYear}
                className="bg-green-700 hover:bg-green-600 flex-1"
                size="sm"
              >
                <Save size={16} className="mr-1" />
                {editingYear ? "Save" : "Add"}
              </Button>
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingYear(null);
                  setFormData({
                    year: new Date().getFullYear(),
                    members: "",
                    events: "",
                  });
                }}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-600"
                size="sm"
              >
                <X size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="text-left py-3 px-4 text-gray-300 font-semibold text-sm">
                Year
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold text-sm">
                Members
              </th>
              <th className="text-left py-3 px-4 text-gray-300 font-semibold text-sm">
                Events
              </th>
              <th className="text-right py-3 px-4 text-gray-300 font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No data added yet. Click "Add Year" to get started.
                </td>
              </tr>
            ) : (
              sortedData.map((data) => (
                <tr
                  key={data.year}
                  className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors"
                >
                  <td className="py-3 px-4 text-gray-100 font-medium">
                    {data.year}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300">
                      {data.members}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                      {data.events}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={() => handleEditYear(data.year)}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-gray-600"
                      >
                        <Edit2 size={16} className="text-green-400" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteYear(data.year)}
                        variant="ghost"
                        size="sm"
                        className="hover:bg-gray-600"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      {chartData.length > 0 && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs">Total Years</p>
            <p className="text-2xl font-bold text-gray-100 mt-1">
              {chartData.length}
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs">Total Members</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">
              {chartData.reduce((sum, d) => sum + d.members, 0)}
            </p>
          </div>
          <div className="bg-gray-700 rounded-lg p-3 text-center">
            <p className="text-gray-400 text-xs">Total Events</p>
            <p className="text-2xl font-bold text-green-400 mt-1">
              {chartData.reduce((sum, d) => sum + d.events, 0)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chart;
