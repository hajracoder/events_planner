
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
PieChart,Pie,Cell, BarChart,
  Bar,
} from "recharts";

import TopEventsDashboard from "./TopEventsDashboard";

export default function DashboardSubjects() {




  return (
    <div className="p-6 space-y-6">
      {/* Top 5 High-Level Cards */}
     <h6 className="text-emerald-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
  Welcome Dashboard
</h6>
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
      <TopEventsDashboard/>
    </div>
    
  );
}