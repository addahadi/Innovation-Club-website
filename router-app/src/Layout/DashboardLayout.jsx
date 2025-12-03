import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Menu, Home, BarChart, Settings, Users } from "lucide-react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/analytics", icon: BarChart, label: "Analytics" },
    { path: "/users", icon: Users, label: "Users" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-neutral-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 bg-neutral-900 border-r border-neutral-800 transition-all duration-300 z-40 ${
          isSidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="h-16 flex items-center px-4 border-b border-neutral-800">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          {isSidebarOpen && (
            <span className="ml-3 text-white font-light text-lg">
              Dashboard
            </span>
          )}
        </div>

        <nav className="p-3 mt-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${
                    isActive(item.path)
                      ? "bg-green-700 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {isSidebarOpen && (
                    <span className="text-sm font-light">{item.label}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        {/* Top Navbar */}
        <header className="h-16 bg-green-700 flex items-center justify-end px-6 border-b border-green-600">
          <div className="flex items-center gap-3">
            <span className="text-white text-sm font-light">Admin</span>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-6 bg-neutral-900 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
