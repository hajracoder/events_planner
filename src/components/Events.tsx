
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
  const [filter, setFilter] = useState<"All" | "Upcoming" | "Ongoing" | "Completed">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState<Event | null>(null);
  const [viewModal, setViewModal] = useState<Event | null>(null);
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

  // 🔹 Fetch Events from Appwrite
  const fetchEvents = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_MAIN_EVENT);
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

  useEffect(() => { fetchEvents(); }, []);

  // 🔹 Add Event
// 🔹 Add Event
const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    // ✅ Appwrite schema ke liye loaction ka name exactly same
    const safeEvent = {
      title: newEvent.title,
      description: newEvent.description,
      loaction: newEvent.location || "", // Appwrite required field
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

    // ✅ TypeScript Event type ke liye location map kar rahe
    setEvents((prev) => [
      ...prev,
      {
        $id: res.$id,
        title: safeEvent.title,
        description: safeEvent.description,
        location: safeEvent.loaction, // TypeScript ke liye
        address: safeEvent.address,
        date: safeEvent.date,
        status: safeEvent.status,
      },
    ]);

    // Reset form
    setNewEvent({
      title: "",
      description: "",
      location: "",
      address: "",
      date: "",
      status: "Upcoming",
    });

    setAddModal(false);
  } catch (err) {
    console.error("Add Error:", err);
  }
};

// 🔹 Update Event
const handleUpdate = async () => {
  if (!editModal) return;

  try {
    const { $id, location, ...updateData } = editModal;

    // Appwrite ke liye loaction field bhejna
    const safeUpdate = {
      ...updateData,
      loaction: location, // Appwrite schema ke liye
    };

    await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID_MAIN_EVENT,
      $id!,
      safeUpdate
    );

    setEvents(events.map(ev =>
      ev.$id === $id
        ? { ...editModal, location: editModal.location } // TypeScript Event type ke liye
        : ev
    ));

    setEditModal(null);
  } catch (err) {
    console.error("Update Error:", err);
  }
};



  // 🔹 Delete Event
  const handleDelete = async (id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MAIN_EVENT, id);
      setEvents(events.filter(ev => ev.$id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // 🔹 Filtering & Pagination
  const filtered = events.filter(ev => {
    const matchesSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || ev.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-6xl text-left font-[Montserrat] mt-4 mb-4">
        Events
      </h2>

      {/* Search + Filter + Add */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-1/2 border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as any)}
          className="w-full md:w-1/4 border px-3 py-2 rounded focus:ring-2 focus:ring-blue-400"
        >
          <option value="All">All</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          onClick={() => setAddModal(true)}
          className="w-full md:w-1/4 flex items-center justify-center gap-2 px-4 py-2 border rounded bg-white hover:bg-gray-100"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200 text-gray-900 rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginated.map(ev => (
              <tr key={ev.$id} className="hover:bg-gray-50 transition duration-150">
                <td className="px-4 py-2">{ev.title}</td>
                <td className="px-4 py-2">{ev.description}</td>
                <td className="px-4 py-2">{ev.date}</td>
                <td className="px-4 py-2">{ev.location}</td>
                <td className="px-4 py-2">{ev.address}</td>
                <td className="px-4 py-2">{ev.status}</td>
                <td className="px-4 py-2 text-center flex justify-center gap-2">
                  <button onClick={() => setViewModal(ev)} className="text-blue-600"><Eye size={18} /></button>
                  <button onClick={() => setEditModal(ev)} className="text-green-600"><Edit size={18} /></button>
                  <button onClick={() => handleDelete(ev.$id)} className="text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">No events found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-black text-white" : ""}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >Next</button>
      </div>

      {/* Add Modal */}
      {addModal && (
        <Modal title="Add Event" onClose={() => setAddModal(false)}>
    <EventForm
      event={newEvent}
      setEvent={setNewEvent}
      onSubmit={handleAdd} // ✅ ab TypeScript error nahi aayega
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
          <div className="space-y-2 text-gray-700">
            <p><strong>Description:</strong> {viewModal.description}</p>
            <p><strong>Date:</strong> {viewModal.date}</p>
            <p><strong>Location:</strong> {viewModal.location}</p>
            <p><strong>Address:</strong> {viewModal.address}</p>
            <p><strong>Status:</strong> {viewModal.status}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}

// 🔹 Modal Component
const Modal = ({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
      </div>
      {children}
    </div>
  </div>
);

// 🔹 Event Form Component
const EventForm = ({
  event,
  setEvent,
  onSubmit,
  submitText,
}: {
  event: any;
  setEvent: any;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // ✅ fix
  submitText: string;
}) => (
  <form onSubmit={onSubmit} className="space-y-3">
    <input
      type="text"
      placeholder="Title"
      value={event.title}
      onChange={e => setEvent({ ...event, title: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <input
      type="text"
      placeholder="Description"
      value={event.description}
      onChange={e => setEvent({ ...event, description: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <input
      type="date"
      value={event.date}
      onChange={e => setEvent({ ...event, date: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <input
      type="text"
      placeholder="Location"
      value={event.location}
      onChange={e => setEvent({ ...event, location: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <input
      type="text"
      placeholder="Address"
      value={event.address}
      onChange={e => setEvent({ ...event, address: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    />
    <select
      value={event.status}
      onChange={e => setEvent({ ...event, status: e.target.value })}
      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-gray-400"
    >
      <option value="Upcoming">Upcoming</option>
      <option value="Ongoing">Ongoing</option>
      <option value="Completed">Completed</option>
    </select>
    <button
      type="submit" // ✅ change from onClick to form submit
      className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
    >
      {submitText}
    </button>
  </form>
);

