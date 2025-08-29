
// import { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./components/dashboard/Dashboard";
// import EngagementsPage from "./components/dashboard/EngagementsPage";
// import BirthdayPage from "./components/dashboard/BirthdayPage";
// import BusinessPage from "./components/dashboard/BusinessPage";
// import FamilyPage from "./components/dashboard/FamilyPage";
// import PartyPage from "./components/dashboard/PartyPage";
// import Weddingpage from "./components/dashboard/Weddingpage";
// import Booking from "./components/dashboard/Booking";

// function App() {
//   const [activePage, setActivePage] = useState("Dashboard");
  
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="flex h-screen">
//       <Sidebar 
//         isOpen={sidebarOpen}
//         toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//         setActivePage={setActivePage}
//       />

//       <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800">
//         {activePage === "Dashboard" && <Dashboard setActivePage={setActivePage} />}
//         {activePage === "Engagement" && <EngagementsPage setActivePage={setActivePage} />}
//         {activePage === "Birthday" && <BirthdayPage setActivePage={setActivePage} />}
//         {activePage === "Party" && <PartyPage setActivePage={setActivePage} />}
//         {activePage === "Business" && <BusinessPage setActivePage={setActivePage} />}
//         {activePage === "Family" && <FamilyPage setActivePage={setActivePage} />}
//         {activePage === "Wedding" && <Weddingpage setActivePage={setActivePage} />}
//       {activePage === "Booking" && <Booking setActivePage={setActivePage} />}
//       </div>
//     </div>
//   );
// }

// export default App;


// -------------------------------------------------




import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/dashboard/Dashboard";
import Events from "./components/Events"; // 👈 missing import add kiya
import EngagementsPage from "./components/dashboard/EngagementsPage";
import BirthdayPage from "./components/dashboard/BirthdayPage";
import BusinessPage from "./components/dashboard/BusinessPage";
import FamilyPage from "./components/dashboard/FamilyPage";
import PartyPage from "./components/dashboard/PartyPage";
import Weddingpage from "./components/dashboard/Weddingpage";
import Booking from "./components/dashboard/Booking";

function App() {
  const [activePage, setActivePage] = useState<string>("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        setActivePage={setActivePage}
      />

      {/* Main content */}
      <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-800">
        {activePage === "Events" && <Dashboard setActivePage={setActivePage} />}
        {activePage === "Dashboard" && <Events/>}
        {activePage === "Engagement" && <EngagementsPage setActivePage={setActivePage} />}
        {activePage === "Birthday" && <BirthdayPage setActivePage={setActivePage} />}
        {activePage === "Party" && <PartyPage setActivePage={setActivePage} />}
        {activePage === "Business" && <BusinessPage setActivePage={setActivePage} />}
        {activePage === "Family" && <FamilyPage setActivePage={setActivePage} />}
        {activePage === "Wedding" && <Weddingpage setActivePage={setActivePage} />}
        {activePage === "Booking" && <Booking setActivePage={setActivePage} />}
      </div>
    </div>
  );
}

export default App;
