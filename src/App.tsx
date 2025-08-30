// import { Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
// import Sidebar from "./components/Sidebar";

// // Pages
// import Users from "./components/Users";
// import Locations from "./components/Locations";
// import Events from "./components/Events";
// import Dashboard from "./components/Dashboard";

// export default function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     <div className="flex">
//       <Sidebar
//         // isOpen={isSidebarOpen}
//         // toggleSidebar={toggleSidebar}
//         // setActivePage={() => {}} // abhi placeholder hai
//       />
//       <main className="flex-1 p-6">
//         <Routes>
//           <Route path="/" element={<Navigate to="/dashboard" />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/locations" element={<Locations />} />
//           <Route path="/users" element={<Users />} />
//         </Routes>
//       </main>
//     </div>
//   );
// }



import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Pages

import Users from "./components/Users";
import Locations from "./components/Locations";
import Events from "./components/Events";
import Dashboard from "./components/Dashboard";


export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/events" element={<Events />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}