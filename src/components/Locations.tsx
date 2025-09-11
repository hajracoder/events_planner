










// import { useState, useEffect } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import 'leaflet/dist/leaflet.css';
// import { Trash2 } from "lucide-react"; // 🔹 Icon import
// import { databases, DATABASE_ID, COLLECTION_ID_LOCATIONS } from "../appwrite";

// interface Location {
//   $id: string;
//   name: string;
//   address: string;
//   status: "Active" | "Inactive";
//   lat: number;
//   lng: number;
// }

// export default function Locations() {
//   const [locations, setLocations] = useState<Location[]>([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 3;
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     address: "",
//     status: "Active" as "Active" | "Inactive",
//     lat: "",
//     lng: "",
//   });

//   // 🔹 Fetch Locations from Appwrite
//   const fetchLocations = async () => {
//     try {
//       const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_LOCATIONS);

//       // Map Appwrite documents to Location type
//       const formatted: Location[] = res.documents.map((doc: any) => ({
//         $id: doc.$id,
//         name: doc.name,
//         address: doc.address,
//         status: doc.status,
//         lat: parseFloat(doc.lat),
//         lng: parseFloat(doc.lng),
//       }));

//       setLocations(formatted);
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchLocations();
//   }, []);

//   // 🔹 Add Location
//   const handleAddLocation = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const newLocation = {
//         ...formData,
//         lat: parseFloat(formData.lat),
//         lng: parseFloat(formData.lng),
//       };

//       const res = await databases.createDocument(
//         DATABASE_ID,
//         COLLECTION_ID_LOCATIONS,
//         "unique()",
//         newLocation
//       );

//       // Map Appwrite response to Location type
//       const addedLocation: Location = {
//         $id: res.$id,
//         name: res.name as string,
//         address: res.address as string,
//         status: res.status as "Active" | "Inactive",
//         lat: parseFloat(res.lat as string),
//         lng: parseFloat(res.lng as string),
//       };

//       setLocations((prev) => [...prev, addedLocation]);

//       setFormData({ name: "", address: "", status: "Active", lat: "", lng: "" });
//       setShowForm(false);
//     } catch (err) {
//       console.error("Add Error:", err);
//     }
//   };

//   // 🔹 Delete Location
//   const deleteLocation = async ($id: string) => {
//     try {
//       await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_LOCATIONS, $id);
//       setLocations(locations.filter((loc) => loc.$id !== $id));
//     } catch (err) {
//       console.error("Delete Error:", err);
//     }
//   };

//   const filtered = locations.filter((loc) =>
//     loc.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const indexOfLast = currentPage * itemsPerPage;
//   const indexOfFirst = indexOfLast - itemsPerPage;
//   const currentLocations = filtered.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);

//   return (
//     <div className="p-4 md:p-6 space-y-6 min-h-screen">
//       <h2 className="text-6xl text-left font-[Montserrat] mt-4 mb-4">
//         Locations
//       </h2>

//       {/* Search & Add */}
//       <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
//         <input
//           type="text"
//           placeholder="Search location..."
//           className="border px-3 py-2 rounded w-full md:w-3/4 focus:outline-none focus:ring-2 focus:ring-gray-400"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button
//           className="bg-black text-white px-4 py-2 rounded w-full md:w-auto  transition"
//           onClick={() => setShowForm(!showForm)}
//         >
//           {showForm ? "Close Form" : "+ Add Location"}
//         </button>
//       </div>

//       {/* Add Location Form */}
//       {showForm && (
//         <form
//           onSubmit={handleAddLocation}
//           className="border p-4 md:p-6 rounded-lg shadow-md bg-white space-y-4 max-w-4xl mx-auto"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             <input
//               type="text"
//               name="name"
//               placeholder="Address"
//               className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               required
//             />
//             <input
//               type="text"
//               name="address"
//               placeholder="Location"
//               className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
//               value={formData.address}
//               onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//               required
//             />
//             <select
//               name="status"
//               value={formData.status}
//               onChange={(e) =>
//                 setFormData({ ...formData, status: e.target.value as any })
//               }
//               className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//             <input
//               type="number"
//               name="lat"
//               placeholder="Latitude"
//               className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
//               value={formData.lat}
//               onChange={(e) => setFormData({ ...formData, lat: e.target.value })}
//               required
//             />
//             <input
//               type="number"
//               name="lng"
//               placeholder="Longitude"
//               className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
//               value={formData.lng}
//               onChange={(e) => setFormData({ ...formData, lng: e.target.value })}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-black  text-white px-6 py-2 rounded-md shadow-md transition-colors w-full md:w-auto"
//           >
//             Add Location
//           </button>
//         </form>
//       )}

//       {/* Locations Table */}
//       <div className="overflow-x-auto rounded shadow-md">
//         <table className="w-full min-w-[600px] border-collapse border border-gray-300">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-4 py-2 text-left">Address</th>
//               <th className="border px-4 py-2 text-left">Location</th>
//               <th className="border px-4 py-2 text-left">Status</th>
//               <th className="border px-4 py-2 text-left">Map</th>
//               <th className="border px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentLocations.map((loc) => (
//               <tr key={loc.$id} className="hover:bg-gray-50 transition">
//                 <td className="border px-4 py-2">{loc.address}</td>
//                 <td className="border px-4 py-2">{loc.name}</td>
//                 <td className="border px-4 py-2">
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs ${
//                       loc.status === "Active"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     {loc.status}
//                   </span>
//                 </td>
//                 <td className="border px-4 py-2">
//                   <MapContainer
//                     center={[loc.lat, loc.lng] as [number, number]}
//                     zoom={13}
//                     scrollWheelZoom={false}
//                     className="h-32 w-full"
//                   >
//                     <TileLayer
//                       url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
//                       attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
//                     />
//                     <Marker position={[loc.lat, loc.lng]}>
//                       <Popup>{loc.name}</Popup>
//                     </Marker>
//                   </MapContainer>
//                 </td>
//                 <td className="border px-4 py-2 text-center">
//                   <button
//                     onClick={() => deleteLocation(loc.$id)}
//                     className="text-red-600 hover:text-red-800 transition"
//                     title="Delete"
//                   >
//                     <Trash2 className="w-5 h-5" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {currentLocations.length === 0 && (
//               <tr>
//                 <td colSpan={5} className="p-4 text-center text-gray-500">
//                   No locations found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex flex-wrap justify-center mt-4 gap-2">
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               className={`px-3 py-1 rounded ${
//                 page === currentPage
//                   ? "bg-gray-800 text-white"
//                   : "bg-gray-200 text-gray-700"
//               }`}
//               onClick={() => setCurrentPage(page)}
//             >
//               {page}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

















// Locations.tsx
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Trash2, Edit, Eye, X } from "lucide-react";
import { databases, DATABASE_ID, COLLECTION_ID_LOCATIONS } from "../appwrite";

interface Location {
  $id: string;
  name: string;
  address: string;
  status: "Active" | "Inactive";
  lat: number;
  lng: number;
}

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    status: "Active" as "Active" | "Inactive",
    lat: "",
    lng: "",
  });

  const [editLocation, setEditLocation] = useState<Location | null>(null);
  const [viewLocation, setViewLocation] = useState<Location | null>(null);

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [showMsg, setShowMsg] = useState(false);

  // 🔹 Show message
  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
    setTimeout(() => setMessage(null), 2300);
  };

  // 🔹 Fetch Locations
  const fetchLocations = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_LOCATIONS);
      const formatted: Location[] = res.documents.map((doc: any) => ({
        $id: doc.$id,
        name: doc.name,
        address: doc.address,
        status: doc.status,
        lat: parseFloat(doc.lat),
        lng: parseFloat(doc.lng),
      }));
      setLocations(formatted);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // 🔹 Add Location
  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newLoc = {
        ...formData,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
      };
      const res = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_LOCATIONS,
        "unique()",
        newLoc
      );
      const addedLoc: Location = {
        $id: res.$id,
        name: res.name,
        address: res.address,
        status: res.status,
        lat: parseFloat(res.lat),
        lng: parseFloat(res.lng),
      };
      setLocations((prev) => [...prev, addedLoc]);
      setFormData({ name: "", address: "", status: "Active", lat: "", lng: "" });
      setShowForm(false);
      showMessage("Location added!", "success");
    } catch (err) {
      console.error("Add Error:", err);
      showMessage("Add failed", "error");
    }
  };

  // 🔹 Update Location
  const updateLocation = async () => {
    if (!editLocation) return;
    try {
      const { $id, ...updateData } = editLocation;
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID_LOCATIONS, $id!, {
        ...updateData,
        lat: updateData.lat,
        lng: updateData.lng,
      });
      setLocations(locations.map((loc) => (loc.$id === $id ? editLocation : loc)));
      setEditLocation(null);
      showMessage("Location updated!", "success");
    } catch (err) {
      console.error("Update Error:", err);
      showMessage("Update failed", "error");
    }
  };

  // 🔹 Delete Location
  const deleteLocation = async ($id: string) => {
    if (!confirm("Are you sure you want to delete this location?")) return;
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_LOCATIONS, $id);
      setLocations(locations.filter((loc) => loc.$id !== $id));
      showMessage("Deleted!", "success");
    } catch (err) {
      console.error("Delete Error:", err);
      showMessage("Delete failed", "error");
    }
  };

  // 🔹 Filtered + Pagination
  const filtered = locations.filter((loc) =>
    loc.name.toLowerCase().includes(search.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentLocations = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-4 md:p-6 space-y-6 min-h-screen">
      {message && (
        <div
          className={`fixed bottom-4 right-4 px-3 py-1 rounded shadow text-white text-sm transition-all duration-500 transform ${
            showMsg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ backgroundColor: "#000" }}
        >
          {message.text}
        </div>
      )}

      <h2 className="text-6xl text-left font-[Montserrat] mt-4 mb-4">Locations</h2>

      {/* Search + Add */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
        <input
          type="text"
          placeholder="Search location..."
          className="border px-3 py-2 rounded w-full md:w-3/4 focus:outline-none focus:ring-2 focus:ring-gray-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded w-full md:w-auto transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add Location"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showForm || editLocation) && (
        <form
          onSubmit={editLocation ? updateLocation : handleAddLocation}
          className="border p-4 md:p-6 rounded-lg shadow-md bg-white space-y-4 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <input
              type="text"
              placeholder="Address"
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={editLocation ? editLocation.name : formData.name}
              onChange={(e) =>
                editLocation
                  ? setEditLocation({ ...editLocation, name: e.target.value })
                  : setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={editLocation ? editLocation.address : formData.address}
              onChange={(e) =>
                editLocation
                  ? setEditLocation({ ...editLocation, address: e.target.value })
                  : setFormData({ ...formData, address: e.target.value })
              }
              required
            />
            <select
              value={editLocation ? editLocation.status : formData.status}
              onChange={(e) =>
                editLocation
                  ? setEditLocation({ ...editLocation, status: e.target.value as any })
                  : setFormData({ ...formData, status: e.target.value as any })
              }
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <input
              type="number"
              placeholder="Latitude"
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={editLocation ? editLocation.lat : formData.lat}
              onChange={(e) =>
                editLocation
                  ? setEditLocation({ ...editLocation, lat: parseFloat(e.target.value) })
                  : setFormData({ ...formData, lat: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Longitude"
              className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={editLocation ? editLocation.lng : formData.lng}
              onChange={(e) =>
                editLocation
                  ? setEditLocation({ ...editLocation, lng: parseFloat(e.target.value) })
                  : setFormData({ ...formData, lng: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={() => {
                setShowForm(false);
                setEditLocation(null);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded"
            >
              {editLocation ? "Update" : "Add"}
            </button>
          </div>
        </form>
      )}

      {/* Locations Table */}
      <div className="overflow-x-auto rounded shadow-md">
        <table className="w-full min-w-[600px] border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Address</th>
              <th className="border px-4 py-2 text-left">Location</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Map</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentLocations.map((loc) => (
              <tr key={loc.$id} className="hover:bg-gray-50 transition">
                <td className="border px-4 py-2">{loc.address}</td>
                <td className="border px-4 py-2">{loc.name}</td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      loc.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {loc.status}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  <MapContainer
                    center={[loc.lat, loc.lng] as [number, number]}
                    zoom={13}
                    scrollWheelZoom={false}
                    className="h-32 w-full"
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
                    />
                    <Marker position={[loc.lat, loc.lng]}>
                      <Popup>{loc.name}</Popup>
                    </Marker>
                  </MapContainer>
                </td>
                <td className="border px-4 py-2 text-center flex justify-center gap-2">
                  <button onClick={() => setEditLocation(loc)}>
                    <Edit size={20} />
                  </button>
                  <button onClick={() => setViewLocation(loc)}>
                    <Eye size={20} />
                  </button>
                  <button onClick={() => deleteLocation(loc.$id)}>
                    <Trash2 size={20}  />
                  </button>
                </td>
              </tr>
            ))}
            {currentLocations.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
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
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* View Location Modal */}
      {viewLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold">{viewLocation.name}</h2>
              <button onClick={() => setViewLocation(null)} className="text-gray-500 hover:text-gray-800">
                <X size={22} />
              </button>
            </div>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <p><strong>Address:</strong> {viewLocation.address}</p>
              <p><strong>Status:</strong> {viewLocation.status}</p>
              <p><strong>Latitude:</strong> {viewLocation.lat}</p>
              <p><strong>Longitude:</strong> {viewLocation.lng}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
