import  { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
PieChart,Pie,Cell, BarChart,
  Bar,
} from "recharts";


interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  value: number; // Event score
  locValue: number; // Location score
  topValue: number; // Trending score
}

// Sample dynamic events data
const sampleEvents: Event[] = [
  { id: "1", title: "Faisalabad", date: "2025-09-01", location: "Karachi",  value: 8, locValue: 15, topValue: 12 },
  { id: "2", title: "Lahore", date: "2025-09-02", location: "Lahore", value: 12, locValue: 20, topValue: 18 },
  { id: "3", title: "Marriage", date: "2025-09-03", location: "Islamabad", value: 5, locValue: 10, topValue: 6 },
  { id: "4", title: "Party", date: "2025-09-04", location: "Multan", value: 15, locValue: 18, topValue: 14 },

];


export default function DashboardSubjects() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    setEvents(sampleEvents);
  }, []);

  // Graph data: Events, Locations, Top Events
  const chartData = events.map(e => ({
    name: e.title,
    Events: e.value,
    Locations: e.locValue,
    Trending: e.topValue,
  }));

  return (
    <div className="p-6 space-y-6">
      {/* Top 5 High-Level Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Our Users */}
  <div className="p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
    <h3 className="font-semibold text-base sm:text-lg mb-2">Our Users</h3>
    <p className="text-xs sm:text-sm text-gray-600 mb-4">Total Users: 500</p>

    {/* Chart */}
    <div className="h-40 sm:h-48 md:h-60 lg:h-50">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[
              { name: "Owner", value: 90 },
              { name: "Workers", value: 410 },
            ]}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={40} // default smaller
            label
          >
            <Cell fill="#22c55e" />
            <Cell fill="#3b82f6" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Our Events */}
  <div className="p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
    <h3 className="font-semibold text-base sm:text-lg mb-2">Our Events</h3>
    <p className="text-xs sm:text-sm text-gray-600 mb-4">Total Events: 5000</p>

    <div className="h-40 sm:h-48 md:h-60 lg:h-50">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[
              { name: "Top Events", value: 3570 },
              { name: "Normal Events", value: 1430 },
            ]}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={40}
            label
          >
            <Cell fill="#22c55e" />
            <Cell fill="#3b82f6" />
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Top Locations */}
  <div className="p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
    <h3 className="font-semibold text-base sm:text-lg mb-2">Top Locations</h3>
    <p className="text-xs sm:text-sm text-gray-600 mb-4">Total Locations: 80</p>

    <div className="h-40 sm:h-48 md:h-60 lg:h-50">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[
            { name: "Fsd", value: 90 },
            { name: "Karachi", value: 25 },
            { name: "Lhr", value: 75 },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Performance Insights */}
  <div className="p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
    <h3 className="font-semibold text-base sm:text-lg mb-4">Performance Insights</h3>

    <ul className="space-y-2 mb-6 text-xs sm:text-sm">
      <li className="flex justify-between items-center">
        <span>Leader: Hajra</span>
        <span className="text-green-500">↑</span>
      </li>
      <li className="flex justify-between items-center">
        <span>Leader: Masooma</span>
        <span className="text-green-500">↑</span>
      </li>
    </ul>

    <div className="w-full h-40 sm:h-48 md:h-60 lg:h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={[
            { name: "Hajra", work: 50 },
            { name: "Masooma", work: 50 },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="work" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
</div>


      {/* Graph */}
           {/* Graph */}
                {/* Graph */}
      <div className="p-4 rounded-lg shadow-lg border cursor-pointer hover:bg-gray-100 transition-colors">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Events Overview</h2>
        
        <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Events" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="Locations" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="Trending" stroke="#facc15" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}







