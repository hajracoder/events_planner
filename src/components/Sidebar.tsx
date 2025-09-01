

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MapPin,
  Users,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Events", path: "/events", icon: Calendar },
  { label: "Locations", path: "/locations", icon: MapPin },
  { label: "Users", path: "/users", icon: Users },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close sidebar on mobile when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="font-[Montserrat]">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md border"
        >
          {mobileOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          ${isOpen ? "w-64" : "w-20"}
          shadow-lg h-screen flex flex-col p-4
          transition-all duration-300
          fixed top-0 left-0 z-40
          bg-white
          transform
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:relative
        `}
      >
        {/* Desktop Toggle */}
        <div className="hidden lg:flex justify-end mb-6">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>

       {/* Logo and Title */}
<div
  className={`flex flex-col items-center justify-center mb-10 transition-all duration-300 ${
    isOpen ? "-mt-8" : "mt-4"
  }`}
>
  <img
    src={logo}
    alt="Event Planner Logo"
    className={`transition-all duration-300 ${
      isOpen ? "h-44 w-44" : "h-20 w-20"
    }`}
  />
  <h3
    className={`text-center font-bold transition-all duration-300 ${
      isOpen ? "text-xl -mt-12" : "text-sm -mt-6"
    }`}
  >
    Event Planner
  </h3>
</div>


        {/* Navigation */}
        <nav className="flex flex-col text-md space-y-2">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/dashboard"}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-all
                ${
                  isActive
                    ? "bg-black text-white font-semibold border-l-4 border-gray-500"
                    : "hover:bg-black hover:text-white"
                }
              `}
              onClick={() => setMobileOpen(false)} // auto-close on mobile nav
            >
              <Icon size={isOpen ? 20 : 26} />
              {isOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </section>
  );
}






