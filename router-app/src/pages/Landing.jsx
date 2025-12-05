import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';


const sections = [
    { id: 'hero' , title : "Hero Section"},
    { id: 'faq' , title : "FAQ"},
    { id: 'get-to-know-us' , title : "Get To Know Us"},
]


const Landing = () => {
    const navigate = useNavigate();
    const [selectedSection , setSelectedSection] = useState(null)
    
    return (
    <div className="p-6">
      <div className='flex flex-col gap-4'>
        <h1 className=' font-bold text-6xl text-white'>Landing Page</h1>
        <p className='text-gray-400 text-lg'>Manage your landing page content</p>
      </div>
      <div className=' flex flex-row gap-8 w-full mt-10 border-b border-gray-700 '>
        {sections.map((section) => (
          <div key={section.id} 
          onClick={() => {
            setSelectedSection(section.id);
            navigate(`/landing/${section.id}`);
          }}
          className = {` py-5 text-gray-400 font-semibold ${selectedSection === section.id ? "border-b-2 border-green-600 text-white" : "hover:text-white hover:border-b-2 hover:border-gray-600"} cursor-pointer inline-block mr-6 pb-2 mt-6`}>
            {section.title}
          </div>
        ))}
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Landing