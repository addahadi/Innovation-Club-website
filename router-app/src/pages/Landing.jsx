import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const sections = [
  { id: "hero", title: "Hero Section" },
  { id: "faq", title: "FAQ" },
  { id: "get-to-know-us", title: "Get To Know Us" },
];

const Landing = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="p-6 text-white">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-10">
        <h1 className="font-semibold text-5xl tracking-tight text-white">
          Landing Page
        </h1>
        <p className="text-gray-400 text-lg">
          Manage your landing page content
        </p>
      </div>

      {/* Elegant Tab Navigation */}
      <div className="flex gap-6 border-b border-gray-800 pb-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => {
              setSelectedSection(section.id);
              navigate(`/landing/${section.id}`);
            }}
            className={`
              relative pb-3 px-1 text-sm font-medium transition-all
              ${
                selectedSection === section.id
                  ? "text-white"
                  : "text-gray-400 hover:text-gray-200"
              }
            `}
          >
            {section.title}

            {/* Active underline animation */}
            <span
              className={`
                absolute left-0 right-0 -bottom-[2px] h-[2px] rounded-full transition-all
                ${
                  selectedSection === section.id
                    ? "bg-green-600"
                    : "bg-transparent group-hover:bg-gray-600"
                }
              `}
            ></span>
          </button>
        ))}
      </div>

      {/* Content Outlet */}
      <main className="mt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Landing;
