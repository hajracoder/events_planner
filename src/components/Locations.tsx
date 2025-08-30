

import { useState, useEffect } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  id: number;
  name: string;
  address: string;
  status: "Active" | "Inactive";
  lat: number;
  lng: number;
}

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>(() => {
    const saved = localStorage.getItem("locations");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "Sky Lounge", address: "Karachi, Pakistan", status: "Active", lat: 24.8607, lng: 67.0011 },
          { id: 2, name: "Beach View", address: "Lahore, Pakistan", status: "Inactive", lat: 31.5204, lng: 74.3587 },
          { id: 3, name: "Royal Hall", address: "Islamabad, Pakistan", status: "Active", lat: 33.6844, lng: 73.0479 },
        ];
  });

  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    status: "Active" as "Active" | "Inactive",
    lat: "",
    lng: "",
  });

  const filtered = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentLocations = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const deleteLocation = (id: number) => {
    setLocations(locations.filter((loc) => loc.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    const newLocation: Location = {
      id: locations.length + 1,
      name: formData.name,
      address: formData.address,
      status: formData.status,
      lat: parseFloat(formData.lat),
      lng: parseFloat(formData.lng),
    };
    setLocations([...locations, newLocation]);
    setFormData({ name: "", address: "", status: "Active", lat: "", lng: "" });
    setShowForm(false);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Search & Add */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search location..."
          className="border px-3 py-2 rounded w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "Add Location"}
        </button>
      </div>

      {/* Add Location Form */}
      {showForm && (
        <form 
          onSubmit={handleAddLocation} 
          className="border p-4 md:p-6 rounded-lg shadow-md bg-white space-y-4 max-w-4xl mx-auto"
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Add New Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              type="number"
              name="lat"
              placeholder="Latitude"
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.lat}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="lng"
              placeholder="Longitude"
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.lng}
              onChange={handleInputChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md shadow-md transition-colors w-full md:w-auto"
          >
            Add Location
          </button>
        </form>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border border-gray-300 rounded-2xl">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Location</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Map</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLocations.map((loc) => (
              <tr key={loc.id} className="text-center">
                <td className="border px-4 py-2">{loc.address}</td>
                <td className="border px-4 py-2">{loc.name}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      loc.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {loc.status}
                  </span>
                </td>
                <td className="border px-4 py-2 h-32 w-48 md:h-36 md:w-60">
                  <MapContainer
                    center={[loc.lat, loc.lng] as [number, number]}
                    zoom={13}
                    scrollWheelZoom={false}
                    dragging={true}
                    doubleClickZoom={false}
                    zoomControl={true}
                    className="h-32 w-48 md:h-36 md:w-60"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                  </MapContainer>
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => deleteLocation(loc.id)}
                    className="bg-red-400 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {currentLocations.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-gray-500">
                  No locations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-4 gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
