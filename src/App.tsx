import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import Locations from "./components/Locations";
import Users from "./components/Users";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">
        <Routes>
          {/* Root khulte hi Dashboard pe redirect karega */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<Events />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
