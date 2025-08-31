

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./components/Dashboard";
// import Events from "./components/Events";
// import Locations from "./components/Locations";
// import Users from "./components/Users";

// export default function App() {
//   return (
//     <Router basename="/events_planner">
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 p-6">
//           <Routes>
//             <Route path="/" element={<Navigate to="/dashboard" replace />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/events" element={<Events />} />
//             <Route path="/locations" element={<Locations />} />
//             <Route path="/users" element={<Users />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }



import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import Locations from "./components/Locations";
import Users from "./components/Users";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
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
