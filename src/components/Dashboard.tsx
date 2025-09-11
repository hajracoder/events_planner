

// // src/components/Dashboard.tsx
// import React, { useEffect, useState } from "react";
// import {
//   databases,
//   DATABASE_ID,
//   COLLECTION_ID_EVENTS,
//   COLLECTION_ID_MAIN_EVENT,
// } from "../appwrite";
// import {
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
// } from "recharts";
// import TopEventsDashboard from "./TopEventsDashboard";

// const Dashboard: React.FC = () => {
//   // ✅ single state for all data
//   const [stats, setStats] = useState({
//     users: { total: 0, active: 0, inactive: 0 },
//     locations: { total: 0, active: 0, inactive: 0 },
//     events: { total: 0, upcoming: 0, completed: 0 },
//     eventsList: [] as any[],
//     loading: true,
//   });

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const [mainEventsRes, eventsRes] = await Promise.all([
//           databases.listDocuments(DATABASE_ID, COLLECTION_ID_MAIN_EVENT),
//           databases.listDocuments(DATABASE_ID, COLLECTION_ID_EVENTS),
//         ]);

//         const mainEvents = mainEventsRes.documents;
//         const events = eventsRes.documents;

//         const upcoming = mainEvents.filter((e) => e.status === "Upcoming").length;
//         const completed = mainEvents.filter((e) => e.status === "Completed").length;

//         setStats({
//           users: { total: 50, active: 30, inactive: 20 }, // demo data
//           locations: { total: 10, active: 7, inactive: 3 }, // demo data
//           events: {
//             total: mainEventsRes.total,
//             upcoming,
//             completed,
//           },
//           eventsList: events,
//           loading: false,
//         });
//       } catch (err) {
//         console.error("Error fetching dashboard data:", err);
//       }
//     }
//     fetchData();
//   }, []);

//   if (stats.loading) {
//     return <p className="text-center text-gray-500">Loading dashboard...</p>;
//   }

//   return (
//     <div className="p-4 sm:p-6 max-w-7xl mx-auto">
//       {/* Heading */}
//       <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Montserrat] mt-4 mb-6 text-left">
//         Dashboard
//       </h2>

//       <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {/* 👤 Users */}
//         <div className="bg-white p-6 rounded-2xl shadow text-left">
//           <h2 className="text-xl md:text-2xl font-bold mb-2">Users</h2>
//           <p className="text-sm mb-4">
//             Total: <span className="font-semibold">{stats.users.total}</span>
//           </p>
//           <ResponsiveContainer width="100%" height={240}>
//             <PieChart>
//               <Pie
//                 data={[
//                   { name: "Active", value: stats.users.active },
//                   { name: "Inactive", value: stats.users.inactive },
//                 ]}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={40}
//                 outerRadius={90}
//                 dataKey="value"
//                 label
//               >
//                 <Cell fill="#000000" />
//                 <Cell fill="#cccccc" />
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 📍 Locations */}
//         <div className="bg-white p-6 rounded-2xl shadow text-left">
//           <h2 className="text-xl md:text-2xl font-bold mb-2">Locations</h2>
//           <p className="text-sm mb-4">
//             Total: <span className="font-semibold">{stats.locations.total}</span>
//           </p>
//           <ResponsiveContainer width="100%" height={240}>
//             <PieChart>
//               <Pie
//                 data={[
//                   { name: "Active", value: stats.locations.active },
//                   { name: "Inactive", value: stats.locations.inactive },
//                 ]}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={40}
//                 outerRadius={90}
//                 dataKey="value"
//                 label
//               >
//                 <Cell fill="#000000" />
//                 <Cell fill="#cccccc" />
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 📅 Events */}
//         <div className="bg-white p-6 rounded-2xl shadow text-left">
//           <h2 className="text-xl md:text-2xl font-bold mb-2">Events</h2>
//           <p className="text-sm mb-4">
//             Total: <span className="font-semibold">{stats.events.total}</span>
//           </p>
//           <ResponsiveContainer width="100%" height={240}>
//             <PieChart>
//               <Pie
//                 data={[
//                   { name: "Upcoming", value: stats.events.upcoming },
//                   { name: "Completed", value: stats.events.completed },
//                 ]}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={40}
//                 outerRadius={90}
//                 dataKey="value"
//                 label
//               >
//                 <Cell fill="#000000" />
//                 <Cell fill="#cccccc" />
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 🎯 Events by Rate */}
//         <div className="bg-white p-6 rounded-2xl shadow text-left">
//           <h2 className="text-xl md:text-2xl font-bold mb-2">Events by Rate</h2>
//           <p className="text-sm mb-4">
//             Total: <span className="font-semibold">{stats.eventsList.length}</span>
//           </p>
//           <ResponsiveContainer width="100%" height={240}>
//             <PieChart>
//               <Pie
//                 data={[
//                   {
//                     name: "Premium",
//                     value: stats.eventsList.filter(
//                       (e) => e.rate?.toLowerCase() === "premium"
//                     ).length,
//                   },
//                   {
//                     name: "Standard",
//                     value: stats.eventsList.filter(
//                       (e) => e.rate?.toLowerCase() === "standard"
//                     ).length,
//                   },
//                 ]}
//                 cx="50%"
//                 cy="50%"
//                 innerRadius={40}
//                 outerRadius={90}
//                 dataKey="value"
//                 label
//               >
//                 <Cell fill="#000000" />
//                 <Cell fill="#cccccc" />
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       <TopEventsDashboard />
//     </div>
//   );
// };

// export default Dashboard;












// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTION_ID_EVENTS } from "../appwrite";
import { useUserCounts, useLocationCounts, useEventCounts } from "../hooks/useDashboardCounts";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import TopEventsDashboard from "./TopEventsDashboard";

const Dashboard: React.FC = () => {
  const userCounts = useUserCounts();
  const locationCounts = useLocationCounts();
  const eventCounts = useEventCounts();

  // ✅ new state for events
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_EVENTS);
        setEvents(res.documents); // save documents to state
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchEvents();
  }, []);

  return (
     <div className="p-4 sm:p-6 max-w-7xl mx-auto">
       {/* Heading */}
      <h2 className="text-2xl text-black sm:text-3xl md:text-4xl lg:text-5xl font-[Montserrat] mt-4 mb-6 text-left">
        Dashboard
      </h2>
    
    <div className="p-6 grid grid-cols-1   md:grid-cols-4 gap-6">

      {/* 👤 Users */}
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h2 className="text-lg text-left  font-semibold mb-2">Users</h2>
        <p className="text-sm text-left  mb-4">
          Total: <span className="font-semibold">{userCounts.total}</span>
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={[
                { name: "Active", value: userCounts.active },
                { name: "Inactive", value: userCounts.inactive },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
               innerRadius={40}
              dataKey="value"
            >
              <Cell fill="#000000" />
              <Cell fill="#cccccc" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📍 Locations */}
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h2 className="text-lg text-left font-semibold mb-2">Locations</h2>
        <p className="text-sm text-left mb-4">
          Total: <span className="font-semibold">{locationCounts.total}</span>
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={[
                { name: "Active", value: locationCounts.active },
                { name: "Inactive", value: locationCounts.inactive },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
               innerRadius={40}
              dataKey="value"
            >
              <Cell fill="#000000" />
              <Cell fill="#cccccc" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📅 Events */}
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h2 className="text-lg text-left font-semibold mb-2">Events</h2>
        <p className="text-sm text-left mb-4">
          Total: <span className="font-semibold">{eventCounts.total}</span>
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={[
                { name: "Upcoming", value: eventCounts.upcoming },
                { name: "Ongoing", value: eventCounts.ongoing },
                { name: "Completed", value: eventCounts.completed },
              ]}
              cx="50%"
              cy="50%"
              outerRadius={80}
               innerRadius={40}
              dataKey="value"
            >
              <Cell fill="#000000" />
              <Cell fill="#888888" />
              <Cell fill="#cccccc" />
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🎯 Events by Rate (Black & White) */}
  <div className="bg-white p-6 rounded-2xl shadow text-center">
    <h3 className="text-lg text-left font-semibold mb-2">Events by Rate</h3>
      <p className="text-sm text-left mb-4">
    Total: <span className="font-semibold">{events.length}</span>
  </p>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={[
            { name: "Premium", value: events.filter((e) => e.rate === "Premium").length },
            { name: "Standard", value: events.filter((e) => e.rate === "Standard").length },
          ]}
          cx="50%"
          cy="50%"
          outerRadius={80}
           innerRadius={40}
          dataKey="value"
        >
          <Cell fill="#000000" /> {/* Black */}
          <Cell fill="#cccccc" /> {/* Gray */}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>


</div>
<TopEventsDashboard/>
</div>
  
  );
};

export default Dashboard;
