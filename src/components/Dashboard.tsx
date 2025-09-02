
// import {
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// PieChart,Pie,Cell, BarChart,
//   Bar,
// } from "recharts";

// import TopEventsDashboard from "./TopEventsDashboard";

// export default function DashboardSubjects() {




//   return (
//     <div className="p-6 space-y-6">
//       {/* Top 5 High-Level Cards */}
//      <h6 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
//   Welcome Dashboard
// </h6>
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//   {/* Our Users */}
//   <div className="p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
//     <h3 className="font-semibold text-base sm:text-lg mb-2">Our Users</h3>
//     <p className="text-xs sm:text-sm text-gray-600 mb-4">Total Users: 500</p>

//     {/* Chart */}
//     <div className="h-40 sm:h-48 md:h-60 lg:h-50">
//     <ResponsiveContainer width="100%" height="100%">
//   <PieChart>
//     <Pie
//       data={[
//         { name: "Owner", value: 90 },
//         { name: "Workers", value: 410 },
//       ]}
//       dataKey="value"
//       cx="50%"
//       cy="50%"
//       outerRadius={40}
//       label={{ fill: "#000", fontSize: 12 }} // white labels
//     >
//       <Cell fill="#000000" /> {/* Black */}
//       <Cell fill="#cccccc" /> {/* Light gray instead of pure white for visibility */}
//     </Pie>
//     <Tooltip 
//       contentStyle={{ backgroundColor: "#000", color: "#fff", border: "none" }}
//       itemStyle={{ color: "#fff" }}
//     />
//     <Legend
//       wrapperStyle={{ color: "#000" }}
//       iconType="circle"
//     />
//   </PieChart>
// </ResponsiveContainer>

//     </div>
//   </div>





//   {/* Our Events */}
//   <div className="p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
//     <h3 className="font-semibold text-base sm:text-lg mb-2">Our Events</h3>
//     <p className="text-xs sm:text-sm text-gray-600 mb-4">Total Events: 5000</p>

//     <div className="h-40 sm:h-48 md:h-60 lg:h-50">
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <Pie
//             data={[
//               { name: "Top Events", value: 3570 },
//               { name: "Normal Events", value: 1430 },
//             ]}
//             dataKey="value"
//             cx="50%"
//             cy="50%"
//             outerRadius={40}
//             label
//           >
//           <Cell fill="#000000" /> {/* Black */}
//           <Cell fill="#cccccc" />
//           </Pie>
//           <Tooltip />
//            <Legend
//       wrapperStyle={{ color: "#000" }}
//       iconType="circle"
//     />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   </div>

//   {/* Top Locations */}
//   <div className="p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
//     <h3 className="font-semibold text-base sm:text-lg mb-2">Top Locations</h3>
//     <p className="text-xs sm:text-sm text-gray-600 mb-4">Total Locations: 80</p>

//     <div className="h-40 sm:h-48 md:h-60 lg:h-50">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={[
//             { name: "Fsd", value: 90 },
//             { name: "Karachi", value: 25 },
//             { name: "Lhr", value: 75 },
//           ]}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend
//       wrapperStyle={{ color: "#000" }}
//       iconType="circle"
//     />
//           <Bar dataKey="value" fill=" text-gray-600" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   </div>

//   {/* Performance Insights */}
//   <div className="p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
//     <h3 className="font-semibold text-base sm:text-lg mb-4">Performance Insights</h3>

//     <ul className="space-y-2 mb-6 text-xs sm:text-sm">
//       <li className="flex justify-between items-center">
//         <span>Leader: Hajra</span>
//         <span className="#000">↑</span>
//       </li>
//       <li className="flex justify-between items-center">
//         <span>Leader: Masooma</span>
//         <span className="#000">↑</span>
//       </li>
//     </ul>

//     <div className="w-full h-40 sm:h-48 md:h-60 lg:h-64">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={[
//             { name: "Hajra", work: 50 },
//             { name: "Masooma", work: 50 },
//           ]}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//            <Legend
//       wrapperStyle={{ color: "#000" }}
//       iconType="circle"
//     />
//           <Bar dataKey="work" fill=" text-gray-600" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   </div>
// </div>
//       <TopEventsDashboard/>
//     </div>
    
//   );

// }









import { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import TopEventsDashboard from "./TopEventsDashboard";

export default function DashboardSubjects() {
  // Users
  const [owner, setTopUsers] = useState<number>(() => {
    return Number(localStorage.getItem("owner")) || 4200;
  });
  const [worker, setNormalUsers] = useState<number>(() => {
    return Number(localStorage.getItem("worker")) || 800;
  });

  // Events
  const [topEvents, setTopEvents] = useState<number>(() => {
    return Number(localStorage.getItem("topEvents")) || 3570;
  });
  const [normalEvents, setNormalEvents] = useState<number>(() => {
    return Number(localStorage.getItem("normalEvents")) || 1430;
  });

  // Locations
  const [topLocations, setTopLocations] = useState<number>(() => {
    return Number(localStorage.getItem("topLocations")) || 250;
  });
  const [normalLocations, setNormalLocations] = useState<number>(() => {
    return Number(localStorage.getItem("normalLocations")) || 75;
  });

  // Insights
  const [topInsights, setTopInsights] = useState<number>(() => {
    return Number(localStorage.getItem("topInsights")) || 900;
  });
  const [normalInsights, setNormalInsights] = useState<number>(() => {
    return Number(localStorage.getItem("normalInsights")) || 300;
  });

  // Save to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem("owner", owner.toString());
  }, [owner]);

  useEffect(() => {
    localStorage.setItem("worker", worker.toString());
  }, [worker]);

  useEffect(() => {
    localStorage.setItem("topEvents", topEvents.toString());
  }, [topEvents]);

  useEffect(() => {
    localStorage.setItem("normalEvents", normalEvents.toString());
  }, [normalEvents]);

  useEffect(() => {
    localStorage.setItem("topLocations", topLocations.toString());
  }, [topLocations]);

  useEffect(() => {
    localStorage.setItem("normalLocations", normalLocations.toString());
  }, [normalLocations]);

  useEffect(() => {
    localStorage.setItem("topInsights", topInsights.toString());
  }, [topInsights]);

  useEffect(() => {
    localStorage.setItem("normalInsights", normalInsights.toString());
  }, [normalInsights]);


  return (
    <>
    <div className="p-6 space-y-6">
       {/* Top 5 High-Level Cards */}
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-left font-[Montserrat] mt-4 mb-4">
 Dashboard
</h2>



    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 sm:gap-6 p-2 sm:p-4">
      {/* Users */}
      <div className="p-3 sm:p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
        <h3 className="font-semibold text-sm sm:text-lg mb-2">Our Users</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3">
          Total Users: {owner + worker}
        </p>
        <div className="h-36 sm:h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: "owner", value: owner },
                  { name: "worker", value: worker },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={40}
                label
              >
                <Cell fill="#000000" />
                <Cell fill="#cccccc" />
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ color: "#000" }} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Input controls */}
        <div className="flex gap-2 mt-3 text-xs sm:text-sm">
          <input
            type="number"
            value={owner}
            onChange={(e) => setTopUsers(Number(e.target.value))}
            className="w-1/2 p-1 border rounded"
            placeholder="owner"
          />
          <input
            type="number"
            value={worker}
            onChange={(e) => setNormalUsers(Number(e.target.value))}
            className="w-1/2 p-1 border rounded"
            placeholder="worker"
          />
        </div>
      </div>

      {/* Events */}
      <div className="p-3 sm:p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
        <h3 className="font-semibold text-sm sm:text-lg mb-2">Our Events</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3">
          Total Events: {topEvents + normalEvents}
        </p>
        <div className="h-36 sm:h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: "Top Events", value: topEvents },
                  { name: "Normal Events", value: normalEvents },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={40}
                label
              >
                <Cell fill="#000000" />
                <Cell fill="#cccccc" />
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ color: "#000" }} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Input controls */}
        <div className="flex gap-2 mt-3 text-xs sm:text-sm">
          <input
            type="number"
            value={topEvents}
            onChange={(e) => setTopEvents(Number(e.target.value))}
            className="w-1/2 p-1 border rounded"
            placeholder="Top Events"
          />
          <input
            type="number"
            value={normalEvents}
            onChange={(e) => setNormalEvents(Number(e.target.value))}
            className="w-1/2 p-1 border rounded"
            placeholder="Normal Events"
          />
        </div>
      </div>

      {/* Locations */}
      <div className="p-3 sm:p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
        <h3 className="font-semibold text-sm sm:text-lg mb-2">Our Locations</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3">
          Total Locations: {topLocations + normalLocations}
        </p>
        <div className="h-36 sm:h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: "Top Locations", value: topLocations },
                  { name: "Normal Locations", value: normalLocations },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={40}
                label
              >
                <Cell fill="#000000" />
                <Cell fill="#cccccc" />
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ color: "#000" }} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Input controls */}
        <div className="flex gap-2 mt-3 text-xs sm:text-sm">
          <input
            type="number"
            value={topLocations}
            onChange={(e) => setTopLocations(Number(e.target.value))}
            className="w-1/2 p-1 border rounded"
            placeholder="Top Locations"
          />
          <input
            type="number"
            value={normalLocations}
            onChange={(e) => setNormalLocations(Number(e.target.value))}
            className="w-1/2 p-1 border rounded"
            placeholder="Normal Locations"
          />
        </div>
      </div>

      {/* Insights */}
      <div className="p-3 sm:p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
        <h3 className="font-semibold text-sm sm:text-lg mb-2">Performance Insights</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3">
          Performance Insights: {topInsights + normalInsights}
        </p>
        <div className="h-36 sm:h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: "Hajra", value: topInsights },
                  { name: "Masooma", value: normalInsights },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={40}
                label
              >
                <Cell fill="#000000" />
                <Cell fill="#cccccc" />
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ color: "#000" }} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Input controls */}
        <div className="flex gap-2 mt-3 text-xs sm:text-sm">
          <input
            type="number"
            value={topInsights}
            onChange={(e) => setTopInsights(Number(e.target.value))}
            className="w-1/2 p-1 border rounded"
            placeholder="Top Insights"
          />
          <input
            type="number"
            value={normalInsights}
            onChange={(e) => setNormalInsights(Number(e.target.value))}
            className="w-1/2 p-1 border rounded"
            placeholder="Normal Insights"
          />
        </div>
      </div>

    </div>
    
 <TopEventsDashboard/>
  
   </div>
  
    </>
  );
}





