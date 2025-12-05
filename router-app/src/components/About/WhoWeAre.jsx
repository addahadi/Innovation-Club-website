import { Edit2, Save, X } from "lucide-react";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WhoWeAre = ({ content = "", onUpdate = () => {} }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(content);

  const handleSave = () => {
    onUpdate(tempContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-2xl mt-10 p-6 mb-8 border border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-100">Who We Are</h2>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-green-700 hover:bg-green-600"
          >
            <Edit2 size={18} className="mr-2" />
            Edit
          </Button>
        )}
      </div>

      {isEditing ? (
        <div>
          <Textarea
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
            placeholder="Enter your organization's description..."
            className="bg-gray-700 text-gray-100 border-gray-600 placeholder-gray-400 min-h-[160px]"
          />
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleSave}
              className="bg-green-700 hover:bg-green-600"
            >
              <Save size={18} className="mr-2" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
            >
              <X size={18} className="mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-300 leading-relaxed">{content}</p>
      )}
    </div>
  );
};

export default WhoWeAre;
