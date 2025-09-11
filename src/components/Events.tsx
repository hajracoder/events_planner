




























import { useState, useEffect, useRef } from "react";
import { Plus, X, Trash2, Edit, Eye } from "lucide-react";
import { databases, DATABASE_ID, COLLECTION_ID_MAIN_EVENT } from "../appwrite";

type Event = {
  $id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  address: string;
  status: "Upcoming" | "Ongoing" | "Completed";
};

export default function EventsDashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "All" | "Upcoming" | "Ongoing" | "Completed"
  >("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState<Event | null>(null);
  const [viewModal, setViewModal] = useState<Event | null>(null);
   const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
const [show, setShow] = useState(false);
  const itemsPerPage = 5;
  const tableRef = useRef<HTMLTableElement>(null);

  const [newEvent, setNewEvent] = useState<Omit<Event, "$id">>({
    title: "",
    description: "",
    date: "",
    location: "",
    address: "",
    status: "Upcoming",
  });

  // 🔹 Fetch Events
  const fetchEvents = async () => {
    try {
      const res = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_MAIN_EVENT
      );
      const formatted: Event[] = res.documents.map((doc: any) => ({
        $id: doc.$id,
        title: doc.title,
        description: doc.description,
        date: doc.date,
        location: doc.location,
        address: doc.address,
        status: doc.status,
      }));
      setEvents(formatted);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

    const showMessage = (text: string, type: "success" | "error" = "success") => {
  setMessage({ text, type });
  setShow(true);
  setTimeout(() => setShow(false), 2000); // fade out
  setTimeout(() => setMessage(null), 2300); // remove from DOM
};

  // 🔹 Add Event
// 🔹 Add Event
const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const safeEvent = {
      title: newEvent.title,
      description: newEvent.description,
      loaction: newEvent.location || "", // spelling 'loaction'
      address: newEvent.address,
      date: newEvent.date,
      status: newEvent.status,
    };

    const res = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MAIN_EVENT,
      "unique()",
      safeEvent
    );

    setEvents((prev) => [
      ...prev,
      {
        $id: res.$id,
        title: safeEvent.title,
        description: safeEvent.description,
        location: safeEvent.loaction,
        address: safeEvent.address,
        date: safeEvent.date,
        status: safeEvent.status,
      },
    ]);

    setNewEvent({
      title: "",
      description: "",
      location: "",
      address: "",
      date: "",
      status: "Upcoming",
    });

    setAddModal(false);
    showMessage("Event added successfully!", "success");
  } catch (err) {
    console.error("Add Error:", err);
    showMessage("Failed to add event!", "error");
  }
};

// 🔹 Update Event
const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!editModal) return;
  try {
    const { $id, location, ...updateData } = editModal;
    const safeUpdate = {
      ...updateData,
      loaction: location, // spelling 'loaction'
    };

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID_MAIN_EVENT,
      $id!,
      safeUpdate
    );

    setEvents(
      events.map((ev) =>
        ev.$id === $id ? { ...editModal, location: editModal.location } : ev
      )
    );

    setEditModal(null);
    showMessage("Event updated successfully!", "success");
  } catch (err) {
    console.error("Update Error:", err);
    showMessage("Failed to update event!", "error");
  }
};

// 🔹 Delete Event with confirm
const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this event?"
  );
  if (!confirmDelete) return;

  try {
    await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MAIN_EVENT, id);
    setEvents(events.filter((ev) => ev.$id !== id));
    showMessage("Event deleted successfully!", "success");
  } catch (err) {
    console.error("Delete Error:", err);
    showMessage("Failed to delete event!", "error");
  }
};


  // 🔹 Filtering + Pagination
  const filtered = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || ev.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">


      
  {message && (
  <div
    className={`fixed bottom-4 right-4 px-3 py-1 rounded shadow font-medium text-sm text-white transition-all duration-500 transform ${
      show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    }`}
    style={{ backgroundColor: "#000" }} // black bg
  >
    {message.text}
  </div>
)}

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[Montserrat] mt-4 mb-6 text-left">
        Events
      </h2>

      {/* Search + Filter + Add */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center mb-6">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="flex-1 sm:flex-none border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          onClick={() => setAddModal(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100 transition"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
       



        <table
          ref={tableRef}
          className="min-w-full divide-y divide-gray-200 text-gray-900"
        >
          <thead className="bg-gray-100 text-sm sm:text-base">
            <tr>
              <th className="px-3 py-2 text-left">Title</th>
              <th className="px-3 py-2 text-left">Description</th>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Location</th>
              <th className="px-3 py-2 text-left">Address</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-xs sm:text-sm">
            {paginated.map((ev) => (
              <tr
                key={ev.$id}
                className="hover:bg-gray-50 transition duration-150"
              >
                <td className="px-3 py-2">{ev.title}</td>
                <td className="px-3 py-2">{ev.description}</td>
                <td className="px-3 py-2">{ev.date}</td>
                <td className="px-3 py-2">{ev.location}</td>
                <td className="px-3 py-2">{ev.address}</td>
                <td className="px-3 py-2">{ev.status}</td>
                <td className="px-3 py-2 flex justify-center gap-2">
                  <button onClick={() => setViewModal(ev)}>
                    <Eye size={18} />
                  </button>
                  <button onClick={() => setEditModal(ev)}>
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(ev.$id)}>
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-4 text-gray-500 text-sm"
                >
                  No events found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-black text-white" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Add Modal */}
      {addModal && (
        <Modal title="Add Event" onClose={() => setAddModal(false)}>
          <EventForm
            event={newEvent}
            setEvent={setNewEvent}
            onSubmit={handleAdd}
            submitText="Save"
          />
        </Modal>
      )}

      {/* Edit Modal */}
      {editModal && (
        <Modal title="Edit Event" onClose={() => setEditModal(null)}>
          <EventForm
            event={editModal}
            setEvent={setEditModal}
            onSubmit={handleUpdate}
            submitText="Update"
          />
        </Modal>
      )}

      {/* View Modal */}
      {viewModal && (
        <Modal title={viewModal.title} onClose={() => setViewModal(null)}>
          <div className="space-y-2 text-gray-700 text-sm sm:text-base">
            <p>
              <strong>Description:</strong> {viewModal.description}
            </p>
            <p>
              <strong>Date:</strong> {viewModal.date}
            </p>
            <p>
              <strong>Location:</strong> {viewModal.location}
            </p>
            <p>
              <strong>Address:</strong> {viewModal.address}
            </p>
            <p>
              <strong>Status:</strong> {viewModal.status}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

// 🔹 Modal
const Modal = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
        >
          <X size={22} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

// 🔹 Event Form
const EventForm = ({
  event,
  setEvent,
  onSubmit,
  submitText,
}: {
  event: any;
  setEvent: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitText: string;
}) => (
  <form onSubmit={onSubmit} className="space-y-3 text-sm sm:text-base">
    <input
      type="text"
      placeholder="Title"
      value={event.title}
      onChange={(e) => setEvent({ ...event, title: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <input
      type="text"
      placeholder="Description"
      value={event.description}
      onChange={(e) => setEvent({ ...event, description: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <input
      type="date"
      value={event.date}
      onChange={(e) => setEvent({ ...event, date: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <input
      type="text"
      placeholder="Location"
      value={event.location}
      onChange={(e) => setEvent({ ...event, location: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <input
      type="text"
      placeholder="Address"
      value={event.address}
      onChange={(e) => setEvent({ ...event, address: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <select
      value={event.status}
      onChange={(e) => setEvent({ ...event, status: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    >
      <option value="Upcoming">Upcoming</option>
      <option value="Ongoing">Ongoing</option>
      <option value="Completed">Completed</option>
    </select>
    <button
      type="submit"
      className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
    >
      {submitText}
    </button>
  </form>
);



















































// // src/components/Dashboard.tsx
// import React, { useEffect, useState } from "react";
// import { databases, DATABASE_ID, COLLECTION_ID_MAIN_EVENT } from "../appwrite";

// type Event = {
//   $id: string;
//   title: string;
//   description: string;
//   loaction: string; // spelling waise hi
//   address: string;
//   date: string;
//   status: "Upcoming" | "Ongoing" | "Completed";
// };

// const Dashboard = () => {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [addModal, setAddModal] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: "",
//     description: "",
//     location: "",
//     address: "",
//     date: "",
//     status: "Upcoming" as "Upcoming" | "Ongoing" | "Completed",
//   });

//   // 🔹 Load events from Appwrite
//   const fetchEvents = async () => {
//     try {
//       const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MAIN_EVENT);
//       setEvents(
//         res.documents.map((doc: any) => ({
//           $id: doc.$id,
//           title: doc.title,
//           description: doc.description,
//           loaction: doc.loaction, // spelling waise hi
//           address: doc.address,
//           date: doc.date,
//           status: doc.status,
//         }))
//       );
//     } catch (err) {
//       console.error("Fetch Error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // 🔹 Add Event
//   const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const safeEvent = {
//         title: newEvent.title,
//         description: newEvent.description,
//         loaction: newEvent.location, // spelling 'loaction' waise hi
//         address: newEvent.address,
//         date: newEvent.date,
//         status: newEvent.status,
//       };

//       const res = await databases.createDocument(
//         DATABASE_ID,
//         COLLECTION_ID_MAIN_EVENT,
//         "unique()",
//         safeEvent
//       );

//       setEvents((prev) => [
//         ...prev,
//         {
//           $id: res.$id,
//           ...safeEvent,
//         },
//       ]);

//       setNewEvent({
//         title: "",
//         description: "",
//         location: "",
//         address: "",
//         date: "",
//         status: "Upcoming",
//       });

//       setAddModal(false);
//       alert("Event added successfully!");
//     } catch (err) {
//       console.error("Add Error:", err);
//       alert("Failed to add event. Check console for details.");
//     }
//   };

//   // 🔹 Delete Event
//   const handleDelete = async (id: string) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this event?");
//     if (!confirmDelete) return;

//     try {
//       await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MAIN_EVENT, id);
//       setEvents(events.filter((ev) => ev.$id !== id));
//       alert("Event deleted successfully!");
//     } catch (err) {
//       console.error("Delete Error:", err);
//       alert("Failed to delete event. Check console for details.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Event Dashboard</h1>
//       <button
//         onClick={() => setAddModal(true)}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         Add Event
//       </button>

//       {/* 🔹 Add Event Modal */}
//       {addModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <form
//             onSubmit={handleAdd}
//             className="bg-white p-6 rounded shadow-md w-96 flex flex-col gap-3"
//           >
//             <h2 className="text-xl font-bold mb-2">Add Event</h2>
//             <input
//               type="text"
//               placeholder="Title"
//               value={newEvent.title}
//               onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//               required
//               className="border px-2 py-1 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Description"
//               value={newEvent.description}
//               onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//               required
//               className="border px-2 py-1 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Loaction"
//               value={newEvent.location}
//               onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
//               required
//               className="border px-2 py-1 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Address"
//               value={newEvent.address}
//               onChange={(e) => setNewEvent({ ...newEvent, address: e.target.value })}
//               required
//               className="border px-2 py-1 rounded"
//             />
//             <input
//               type="date"
//               value={newEvent.date}
//               onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//               required
//               className="border px-2 py-1 rounded"
//             />
//             <select
//               value={newEvent.status}
//               onChange={(e) =>
//                 setNewEvent({ ...newEvent, status: e.target.value as "Upcoming" | "Ongoing" | "Completed" })
//               }
//               className="border px-2 py-1 rounded"
//             >
//               <option value="Upcoming">Upcoming</option>
//               <option value="Ongoing">Ongoing</option>
//               <option value="Completed">Completed</option>
//             </select>

//             <div className="flex justify-end gap-2 mt-2">
//               <button
//                 type="button"
//                 onClick={() => setAddModal(false)}
//                 className="px-3 py-1 rounded border"
//               >
//                 Cancel
//               </button>
//               <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">
//                 Add
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* 🔹 Events Table */}
//       <table className="min-w-full border rounded overflow-hidden shadow">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="px-4 py-2">Title</th>
//             <th className="px-4 py-2">Description</th>
//             <th className="px-4 py-2">Loaction</th>
//             <th className="px-4 py-2">Address</th>
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Status</th>
//             <th className="px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {events.map((ev) => (
//             <tr key={ev.$id} className="border-b">
//               <td className="px-4 py-2">{ev.title}</td>
//               <td className="px-4 py-2">{ev.description}</td>
//               <td className="px-4 py-2">{ev.loaction}</td>
//               <td className="px-4 py-2">{ev.address}</td>
//               <td className="px-4 py-2">{ev.date}</td>
//               <td className="px-4 py-2">{ev.status}</td>
//               <td className="px-4 py-2">
//                 <button
//                   onClick={() => handleDelete(ev.$id)}
//                   className="bg-red-500 text-white px-2 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;
