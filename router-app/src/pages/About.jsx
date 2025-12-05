import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const sections = [
  { id: "who-we-are", title: "Who We Are" },
  { id: "hierarchy", title: "Hierarchy" },
  { id: "our-values", title: "Our Values" },
  { id:"chart" , title : "Chart" },
];

const About = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <h1 className=" font-bold text-6xl text-white">About page</h1>
        <p className="text-gray-400 text-lg">
          Manage your about page content
        </p>
      </div>
      <div className=" flex flex-row gap-8 w-full mt-10 border-b border-gray-700 ">
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={() => {
              setSelectedSection(section.id);
              navigate(`/about/${section.id}`);
            }}
            className={` py-5 text-gray-400 font-semibold ${
              selectedSection === section.id
                ? "border-b-2 border-green-600 text-white"
                : "hover:text-white hover:border-b-2 hover:border-gray-600"
            } cursor-pointer inline-block mr-6 pb-2 mt-6`}
          >
            {section.title}
          </div>
        ))}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default About;
