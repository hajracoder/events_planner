

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./components/Sidebar";

// // Pages
// import Users from "./components/Users";
// import Locations from "./components/Locations";
// import Events from "./components/Events";
// import Dashboard from "./components/Dashboard";

// export default function App() {
//   return (
//     <Router basename="/events_planner">
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 p-6">
//           <Routes>
//             {/* Direct Dashboard for root path */}
//             <Route path="/" element={<Dashboard />} />
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




// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./components/Dashboard";
// import Events from "./components/Events";
// import Locations from "./components/Locations";
// import Users from "./components/Users";

// export default function App() {
//   return (
//     <Router basename="/events_planner/">
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
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import Locations from "./components/Locations";
import Users from "./components/Users";

export default function App() {
  // Detect environment: use basename only in production
  const basename = import.meta.env.PROD ? "/events_planner/" : "";

  return (
    <Router basename={basename}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
