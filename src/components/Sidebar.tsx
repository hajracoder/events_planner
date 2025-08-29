// import { useState } from "react";
// import { Home, Calendar, Users, Settings, Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react";
// import { cn } from "../lib/utils";

// interface SidebarProps {
//   isOpen: boolean;
//   toggleSidebar: () => void;
//   setActivePage: React.Dispatch<React.SetStateAction<string>>;
// }

// export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
//   const [active, setActive] = useState<string>("Dashboard");
//   const [darkMode, setDarkMode] = useState<boolean>(false);

//   return (
//     <div
//       className={cn(
//         "flex flex-col transition-all duration-300 h-screen relative",
//         darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-purple-500 to-indigo-500 text-white",
//         isOpen ? "w-64" : "w-16"
//       )}
//     >
//       {/* Logo & Dark Mode Toggle */}
//       <div className="flex items-center justify-between p-4">
//         <span className="font-bold text-lg">{isOpen ? " Events" : ""}</span>
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="p-1 rounded hover:bg-white/20 transition-colors"
//         >
//           {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 mt-6 space-y-2">
//         {[
//           { name: "Dashboard", icon: <Home className="w-5 h-5" /> },
//           { name: "Events", icon: <Calendar className="w-5 h-5" /> },
//           { name: "Clients", icon: <Users className="w-5 h-5" /> },
//           { name: "Settings", icon: <Settings className="w-5 h-5" /> },
//         ].map((item) => (
//           <button
//             key={item.name}
//             onClick={() => setActive(item.name)}
//             className={cn(
//               "flex items-center gap-3 w-full p-2 rounded-lg transition-colors",
//               active === item.name
//                 ? "bg-white/20 text-yellow-300"
//                 : "hover:bg-white/10"
//             )}
//           >
//             {item.icon} {isOpen && item.name}
//           </button>
//         ))}
//       </nav>

//       {/* Collapse/Expand Button */}
//       <div className="absolute bottom-4 right-4">
//         <button
//           onClick={toggleSidebar}
//           className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
//         >
//           {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import {
  Home,
  Calendar,
  Users,
  Settings,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "../lib/utils";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  setActivePage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  setActivePage,
}: SidebarProps) {
  const [active, setActive] = useState<string>("Dashboard");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleClick = (page: string) => {
    setActive(page);
    setActivePage(page);
  };

  const navItems = [
    { name: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Events", icon: <Calendar className="w-5 h-5" /> },
    { name: "Clients", icon: <Users className="w-5 h-5" /> },
    { name: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-purple-600 text-white rounded-lg shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
     <div
  className={cn(
    "flex flex-col transition-all duration-300 h-screen",
    darkMode
      ? "bg-gray-900 text-white"
      : "bg-gradient-to-b from-purple-500 to-indigo-500 text-white",

    // ✅ Desktop ke liye normal width
    isOpen ? "w-64" : "w-16",

    // ✅ Mobile & tablet ke liye overlay
    "fixed md:relative top-0 left-0 z-50"
  )}
>

        {/* Logo & Dark Mode Toggle */}
        <div className="flex items-center justify-between p-4">
          <span className="font-bold text-lg hidden md:block">
            {isOpen ? "Events" : ""}
          </span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1 rounded hover:bg-white/20 transition-colors"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleClick(item.name)}
              className={cn(
                "flex items-center gap-3 w-full p-2 rounded-lg transition-colors relative group",
                active === item.name
                  ? "bg-white/20 text-yellow-300"
                  : "hover:bg-white/10"
              )}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}

              {/* Tooltip when collapsed */}
              {!isOpen && (
                <span className="absolute left-14 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded-md transition-opacity">
                  {item.name}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Collapse/Expand Button (only desktop) */}
        <div className="absolute bottom-4 right-4 hidden md:block">
  <button
    onClick={toggleSidebar}
    className="p-2 bg-white/20 rounded-full hover:bg-white/40 transition-colors"
  >
    {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
  </button>
</div>

      </div>
    </>
  );
}
