








// import { useState, useEffect, useRef } from "react";
// import { Trash2, Edit, Eye, Plus, X } from "lucide-react";
// import { databases, DATABASE_ID, COLLECTION_ID_EVENTS } from "../appwrite";

// type Event = {
//   $id: string;
//   name: string;
//   location: string;
//   rate: string;
//   date: string;
// };

// type NewEvent = Omit<Event, "$id">;

// const TopEventsDashboard = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [search, setSearch] = useState("");
//   const [filterRate, setFilterRate] = useState<"" | "Premium" | "Standard">("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewEvent, setViewEvent] = useState<Event | null>(null);
//   const [editEvent, setEditEvent] = useState<Event | null>(null);
//   const [addEventModal, setAddEventModal] = useState(false);

//   const tableRef = useRef<HTMLTableElement>(null);
//   const itemsPerPage = 5;

//   // 🔹 Fetch events
//   const fetchEvents = async () => {
//     try {
//       const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_EVENTS);
//       const events: Event[] = response.documents.map((doc: any) => ({
//         $id: doc.$id,
//         name: doc.name,
//         location: doc.loaction,
//         rate: doc.rate,
//         date: doc.date,
//       }));
//       setEvents(events);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // 🔹 Delete event
//   const handleDelete = async (id: string) => {
//     try {
//       await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_EVENTS, id);
//       setEvents(events.filter((event) => event.$id !== id));
//     } catch (error) {
//       console.error("Error deleting event:", error);
//     }
//   };

//   // 🔹 Add Event
//   const [newEvent, setNewEvent] = useState<NewEvent>({
//     name: "",
//     location: "",
//     rate: "Standard",
//     date: "",
//   });

//   const handleAddEvent = async () => {
//     try {
//       const res = await databases.createDocument(
//         DATABASE_ID,
//         COLLECTION_ID_EVENTS,
//         "unique()",
//         {
//           name: newEvent.name,
//           rate: newEvent.rate,
//           date: newEvent.date,
//           loaction: newEvent.location,
//         }
//       );

//       const newEventData: Event = {
//         $id: res.$id,
//         name: res.name,
//         location: res.loaction,
//         rate: res.rate,
//         date: res.date,
//       };

//       setEvents((prev) => [...prev, newEventData]);
//       setNewEvent({ name: "", location: "", rate: "Standard", date: "" });
//       setAddEventModal(false);
//     } catch (error) {
//       console.error("Error adding event:", error);
//     }
//   };

//   // 🔹 Update Event
//   const handleUpdateEvent = async () => {
//     if (!editEvent) return;
//     try {
//       await databases.updateDocument(
//         DATABASE_ID,
//         COLLECTION_ID_EVENTS,
//         editEvent.$id,
//         {
//           name: editEvent.name,
//           loaction: editEvent.location,
//           rate: editEvent.rate,
//           date: editEvent.date,
//         }
//       );
//       setEvents(events.map((ev) => (ev.$id === editEvent.$id ? editEvent : ev)));
//       setEditEvent(null);
//     } catch (error) {
//       console.error("Error updating event:", error);
//     }
//   };

//   // 🔹 Filtering + pagination
//   const filteredEvents = events.filter((event) => {
//     const matchesSearch =
//       event.name.toLowerCase().includes(search.toLowerCase()) ||
//       event.location.toLowerCase().includes(search.toLowerCase());
//     const matchesRate = filterRate === "" || event.rate === filterRate;
//     return matchesSearch && matchesRate;
//   });

//   const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
//   const paginatedEvents = filteredEvents.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="p-6  rounded-lg shadow-md w-full space-y-6">
//       <h1 className="text-3xl font-bold text-center">Top Events</h1>

//       {/* Search + Filter + Add */}
//     <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-3">
//   {/* Search Input */}
//   <input
//     type="text"
//     placeholder="Search by event or location..."
//     value={search}
//     onChange={(e) => setSearch(e.target.value)}
//     className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition"
//   />

//   {/* Filter Select */}
//   <select
//     value={filterRate}
//     onChange={(e) =>
//       setFilterRate(e.target.value as "" | "Premium" | "Standard")
//     }
//     className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 transition"
//   >
//     <option value="">All Rates</option>
//     <option value="Premium">Premium</option>
//     <option value="Standard">Standard</option>
//   </select>

//   {/* Add Event Button */}
//   <button
//     onClick={() => setAddEventModal(true)}
//     className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 hover:shadow-md transition flex items-center justify-center gap-2"
//   >
//     <Plus size={16} /> Add New Event
//   </button>
// </div>


//       {/* Table */}
//     <div className="overflow-x-auto">
//  <table
//     ref={tableRef}
//     className="min-w-full divide-y divide-gray-200 text-gray-900"
//   >
//     <thead className="bg-gray-100">
//       <tr>
//         <th className="px-4 py-2 text-left text-gray-700">Event Name</th>
//         <th className="px-4 py-2 text-left text-gray-700">Location</th>
//         <th className="px-4 py-2 text-left text-gray-700">Rate</th>
//         <th className="px-4 py-2 text-left text-gray-700">Date</th>
//         <th className="px-4 py-2 text-left text-gray-700">Actions</th>
//       </tr>
//     </thead>
//     <tbody className="divide-y divide-gray-200">
//       {paginatedEvents.map((event) => (
//         <tr key={event.$id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
//           <td className="px-4 py-2 whitespace-nowrap">{event.name}</td>
//           <td className="px-4 py-2 whitespace-nowrap">{event.location}</td>
//           <td className="px-4 py-2 whitespace-nowrap">{event.rate}</td>
//           <td className="px-4 py-2 whitespace-nowrap">{event.date}</td>
//           <td className="px-4 py-2 flex flex-wrap gap-2">
//             <button
//               onClick={() => setViewEvent(event)}
//               className="#000 hover:underline flex items-center gap-1"
//             >
//               <Eye size={16} /> View
//             </button>
//             <button
//               onClick={() => setEditEvent(event)}
//               className="#fff hover:underline flex items-center gap-1"
//             >
//               <Edit size={16} /> Edit
//             </button>
//             <button
//               onClick={() => handleDelete(event.$id)}
//               className="#000 hover:underline flex items-center gap-1"
//             >
//               <Trash2 size={16} /> Delete
//             </button>
//           </td>
//         </tr>
//       ))}
//       {paginatedEvents.length === 0 && (
//         <tr>
//           <td colSpan={5} className="text-center py-4 text-gray-500">
//             No events found.
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// </div>






//       {/* Pagination */}
//       <div className="flex justify-center gap-2 mt-4">
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 rounded ${
//               currentPage === i + 1 ? "bg-white text-black" : "bg-gray-800"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//       </div>

//       {/* Add Modal */}
//     {addEventModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold">Add Event</h2>
//         <button
//           onClick={() => setAddEventModal(false)}
//           className="text-gray-500 hover:text-gray-800 transition"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       {/* Name */}
//       <input
//         type="text"
//         placeholder="Name"
//         value={newEvent.name}
//         onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
//         className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//       />

//       {/* Location */}
//       <input
//         type="text"
//         placeholder="Location"
//         value={newEvent.location}
//         onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
//         className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//       />

//       {/* Rate */}
//       <select
//         value={newEvent.rate}
//         onChange={(e) => setNewEvent({ ...newEvent, rate: e.target.value })}
//         className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//       >
//         <option value="Standard">Standard</option>
//         <option value="Premium">Premium</option>
//       </select>

//       {/* Date */}
//       <input
//         type="date"
//         value={newEvent.date}
//         onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//         className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
//       />

//       {/* Save Button */}
//       <button
//         onClick={handleAddEvent}
//         className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 font-semibold transition"
//       >
//         Save
//       </button>
//     </div>
//   </div>
// )}

//    {/* Edit Modal */}
// {editEvent && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold">Edit Event</h2>
//         <button
//           onClick={() => setEditEvent(null)}
//           className="text-gray-500 hover:text-gray-800 transition"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       {/* Inputs */}
//       <input
//         type="text"
//         value={editEvent.name}
//         onChange={(e) => setEditEvent({ ...editEvent, name: e.target.value })}
//         placeholder="Event Name"
//         className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
//       />
//       <input
//         type="text"
//         value={editEvent.location}
//         onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
//         placeholder="Location"
//         className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
//       />
//       <select
//         value={editEvent.rate}
//         onChange={(e) => setEditEvent({ ...editEvent, rate: e.target.value })}
//         className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
//       >
//         <option value="Standard">Standard</option>
//         <option value="Premium">Premium</option>
//       </select>
//       <input
//         type="date"
//         value={editEvent.date}
//         onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
//         className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
//       />

//       {/* Update Button */}
//       <button
//         onClick={handleUpdateEvent}
//         className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
//       >
//         Update
//       </button>
//     </div>
//   </div>
// )}


//       {/* View Modal */}
//     {viewEvent && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-bold">{viewEvent.name}</h2>
//         <button
//           onClick={() => setViewEvent(null)}
//           className="text-gray-500 hover:text-gray-800 transition"
//         >
//           <X size={24} />
//         </button>
//       </div>

//       {/* Event Details */}
//       <p className="text-gray-700"><strong>Location:</strong> {viewEvent.location}</p>
//       <p className="text-gray-700"><strong>Rate:</strong> {viewEvent.rate}</p>
//       <p className="text-gray-700"><strong>Date:</strong> {viewEvent.date}</p>
//     </div>
//   </div>
// )}

//     </div>
//   );
// };

// export default TopEventsDashboard;




























import { useState, useEffect, useRef } from "react";
import { Trash2, Edit, Eye, Plus, X } from "lucide-react";
import { databases, DATABASE_ID, COLLECTION_ID_EVENTS } from "../appwrite";

type Event = {
  $id: string;
  name: string;
  location: string;
  rate: string;
  date: string;
};

type NewEvent = Omit<Event, "$id">;

const TopEventsDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [filterRate, setFilterRate] = useState<"" | "Premium" | "Standard">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [addEventModal, setAddEventModal] = useState(false);

  const tableRef = useRef<HTMLTableElement>(null);
  const itemsPerPage = 5;

  // 🔹 Fetch events
  const fetchEvents = async () => {
    try {
      const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_EVENTS);
      const events: Event[] = response.documents.map((doc: any) => ({
        $id: doc.$id,
        name: doc.name,
        location: doc.loaction,
        rate: doc.rate,
        date: doc.date,
      }));
      setEvents(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔹 Delete event
  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_EVENTS, id);
      setEvents(events.filter((event) => event.$id !== id));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // 🔹 Add Event
  const [newEvent, setNewEvent] = useState<NewEvent>({
    name: "",
    location: "",
    rate: "Standard",
    date: "",
  });

  const handleAddEvent = async () => {
    try {
      const res = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID_EVENTS,
        "unique()",
        {
          name: newEvent.name,
          rate: newEvent.rate,
          date: newEvent.date,
          loaction: newEvent.location,
        }
      );

      const newEventData: Event = {
        $id: res.$id,
        name: res.name,
        location: res.loaction,
        rate: res.rate,
        date: res.date,
      };

      setEvents((prev) => [...prev, newEventData]);
      setNewEvent({ name: "", location: "", rate: "Standard", date: "" });
      setAddEventModal(false);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // 🔹 Update Event
  const handleUpdateEvent = async () => {
    if (!editEvent) return;
    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID_EVENTS,
        editEvent.$id,
        {
          name: editEvent.name,
          loaction: editEvent.location,
          rate: editEvent.rate,
          date: editEvent.date,
        }
      );
      setEvents(events.map((ev) => (ev.$id === editEvent.$id ? editEvent : ev)));
      setEditEvent(null);
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // 🔹 Filtering + pagination
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||
      event.location.toLowerCase().includes(search.toLowerCase());
    const matchesRate = filterRate === "" || event.rate === filterRate;
    return matchesSearch && matchesRate;
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6  rounded-lg shadow-md w-full space-y-6">
     <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-left font-[Montserrat] mt-4 mb-4">
Top Events
</h2>


      {/* Search + Filter + Add */}
    <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-3">
  {/* Search Input */}
  <input
    type="text"
    placeholder="Search by event or location..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400 transition"
  />

  {/* Filter Select */}
  <select
    value={filterRate}
    onChange={(e) =>
      setFilterRate(e.target.value as "" | "Premium" | "Standard")
    }
    className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 transition"
  >
    <option value="">All Rates</option>
    <option value="Premium">Premium</option>
    <option value="Standard">Standard</option>
  </select>

  {/* Add Event Button */}
  <button
    onClick={() => setAddEventModal(true)}
    className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg bg-white text-black font-semibold hover:bg-gray-100 hover:shadow-md transition flex items-center justify-center gap-2"
  >
    <Plus size={16} /> Add New Event
  </button>
</div>


      {/* Table */}
 <div className="overflow-x-auto">
  <table
    ref={tableRef}
    className="min-w-full divide-y divide-gray-200 text-gray-900"
  >
    <thead className="bg-gray-100">
      <tr>
        <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm md:text-base text-gray-700">Event Name</th>
        <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm md:text-base text-gray-700">Location</th>
        <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm md:text-base text-gray-700">Rate</th>
        <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm md:text-base text-gray-700">Date</th>
        <th className="px-2 py-1 sm:px-4 sm:py-2 text-left text-xs sm:text-sm md:text-base text-gray-700">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {paginatedEvents.map((event) => (
        <tr key={event.$id} className="hover:bg-gray-50 transition duration-200 ease-in-out">
          <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap">{event.name}</td>
          <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap">{event.location}</td>
          <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap">{event.rate}</td>
          <td className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm whitespace-nowrap">{event.date}</td>
          <td className="px-2 py-1 sm:px-4 sm:py-2 flex flex-wrap gap-2 text-xs sm:text-sm">
            <button
              onClick={() => setViewEvent(event)}
              className="hover:underline flex items-center gap-1 #000"
            >
              <Eye size={14} /> View
            </button>
            <button
              onClick={() => setEditEvent(event)}
              className="hover:underline flex items-center gap-1 #000"
            >
              <Edit size={14} /> Edit
            </button>
            <button
              onClick={() => handleDelete(event.$id)}
              className="hover:underline flex items-center gap-1 #000"
            >
              <Trash2 size={14} /> Delete
            </button>
          </td>
        </tr>
      ))}
      {paginatedEvents.length === 0 && (
        <tr>
          <td colSpan={5} className="text-center py-4 text-gray-500 text-xs sm:text-sm">
            No events found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>







      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-white text-black" : "bg-gray-800"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Add Modal */}
    {addEventModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Add Event</h2>
        <button
          onClick={() => setAddEventModal(false)}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Name */}
      <input
        type="text"
        placeholder="Name"
        value={newEvent.name}
        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />

      {/* Location */}
      <input
        type="text"
        placeholder="Location"
        value={newEvent.location}
        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />

      {/* Rate */}
      <select
        value={newEvent.rate}
        onChange={(e) => setNewEvent({ ...newEvent, rate: e.target.value })}
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      >
        <option value="Standard">Standard</option>
        <option value="Premium">Premium</option>
      </select>

      {/* Date */}
      <input
        type="date"
        value={newEvent.date}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
      />

      {/* Save Button */}
      <button
        onClick={handleAddEvent}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 font-semibold transition"
      >
        Save
      </button>
    </div>
  </div>
)}

   {/* Edit Modal */}
{editEvent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Edit Event</h2>
        <button
          onClick={() => setEditEvent(null)}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Inputs */}
      <input
        type="text"
        value={editEvent.name}
        onChange={(e) => setEditEvent({ ...editEvent, name: e.target.value })}
        placeholder="Event Name"
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <input
        type="text"
        value={editEvent.location}
        onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
        placeholder="Location"
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />
      <select
        value={editEvent.rate}
        onChange={(e) => setEditEvent({ ...editEvent, rate: e.target.value })}
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      >
        <option value="Standard">Standard</option>
        <option value="Premium">Premium</option>
      </select>
      <input
        type="date"
        value={editEvent.date}
        onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
      />

      {/* Update Button */}
      <button
        onClick={handleUpdateEvent}
        className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
      >
        Update
      </button>
    </div>
  </div>
)}


      {/* View Modal */}
    {viewEvent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{viewEvent.name}</h2>
        <button
          onClick={() => setViewEvent(null)}
          className="text-gray-500 hover:text-gray-800 transition"
        >
          <X size={24} />
        </button>
      </div>

      {/* Event Details */}
      <p className="text-gray-700"><strong>Location:</strong> {viewEvent.location}</p>
      <p className="text-gray-700"><strong>Rate:</strong> {viewEvent.rate}</p>
      <p className="text-gray-700"><strong>Date:</strong> {viewEvent.date}</p>
    </div>
  </div>
)}

    </div>
  );
};

export default TopEventsDashboard;

