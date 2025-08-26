import { useState } from "react";
import { Home, Calendar, Users, Settings, Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [active, setActive] = useState<string>("Dashboard");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div
      className={cn(
        "flex flex-col transition-all duration-300 h-screen relative",
        darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-purple-500 to-indigo-500 text-white",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Logo & Dark Mode Toggle */}
      <div className="flex items-center justify-between p-4">
        <span className="font-bold text-lg">{isOpen ? " Events" : ""}</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-1 rounded hover:bg-white/20 transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 space-y-2">
        {[
          { name: "Dashboard", icon: <Home className="w-5 h-5" /> },
          { name: "Events", icon: <Calendar className="w-5 h-5" /> },
          { name: "Clients", icon: <Users className="w-5 h-5" /> },
          { name: "Settings", icon: <Settings className="w-5 h-5" /> },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setActive(item.name)}
            className={cn(
              "flex items-center gap-3 w-full p-2 rounded-lg transition-colors",
              active === item.name
                ? "bg-white/20 text-yellow-300"
                : "hover:bg-white/10"
            )}
          >
            {item.icon} {isOpen && item.name}
          </button>
        ))}
      </nav>

      {/* Collapse/Expand Button */}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
        >
          {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
