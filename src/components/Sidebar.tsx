import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Calendar, MapPin, Users, Menu, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Events", path: "/events", icon: Calendar },
  { label: "Locations", path: "/locations", icon: MapPin },
  { label: "Users", path: "/users", icon: Users },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <section className="font-[Montserrat]">
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          {mobileOpen ? <ChevronLeft size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          ${isOpen ? "w-64" : "w-20"}
          bg-green-200 text-white shadow-lg h-screen flex flex-col p-4
          transition-all duration-300
          fixed top-0 left-0 z-40 lg:relative
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Desktop Toggle */}
        <div className="hidden lg:flex justify-end mb-6">
          <button onClick={() => setIsOpen(!isOpen)} className="text-green-900">
            {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center mb-10 cursor-default space-x-2">
          <img src={logo} alt="Event Planner Logo" className="h-20 w-18 -mt-6 transition-all" />
          {isOpen && <h3 className="text-lg font-bold text-green-900 -mt-6">Event Planner</h3>}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2">
          {navItems.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <NavLink
                key={path}
                to={path}
                end={path === "/dashboard"}
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-base cursor-pointer transition-all
                  ${isActive
                    ? "bg-white text-green-700 font-semibold border-l-4 border-green-900"
                    : "hover:bg-green-600 hover:text-white text-green-900"
                  }`}
              >
                <Icon size={isOpen ? 20 : 26} />
                {isOpen && <span>{label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </section>
  );
}
