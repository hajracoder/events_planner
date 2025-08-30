

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Pages
import Users from "./components/Users";
import Locations from "./components/Locations";
import Events from "./components/Events";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <Router basename="/events_planner">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Routes>
            {/* Direct Dashboard for root path */}
            <Route path="/" element={<Dashboard />} />
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
