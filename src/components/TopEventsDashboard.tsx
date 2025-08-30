import { useState, useEffect, useRef } from "react";
import { Trash2, Edit, Eye, Plus } from "lucide-react";

interface Event {
  id: number;
  name: string;
  location: string;
  rate: "Premium" | "Standard";
  date: string;
}

const TopEventsDashboard = () => {
  const initialEvents: Event[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Event ${i + 1}`,
    location: ["Lahore", "Karachi", "Islamabad"][i % 3],
    rate: i % 2 === 0 ? "Premium" : "Standard",
    date: `2025-09-${(i % 28) + 1}`.padStart(10, "0"),
  }));

  const [events, setEvents] = useState<Event[]>(() => {
    const storedEvents = localStorage.getItem("events");
    return storedEvents ? JSON.parse(storedEvents) : initialEvents;
  });

  const [search, setSearch] = useState("");
  const [filterRate, setFilterRate] = useState<"" | "Premium" | "Standard">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewEvent, setViewEvent] = useState<Event | null>(null);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [addEventModal, setAddEventModal] = useState(false);

  const tableRef = useRef<HTMLTableElement>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

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

  const totalEvents = filteredEvents.length;
  const premiumEvents = filteredEvents.filter((e) => e.rate === "Premium").length;
  const standardEvents = filteredEvents.filter((e) => e.rate === "Standard").length;

  const [newEvent, setNewEvent] = useState<Event>({
    id: Date.now(),
    name: "",
    location: "",
    rate: "Standard",
    date: "",
  });

  const handleAddEvent = () => {
    const updatedEvents = [...events, { ...newEvent, id: Date.now() }];
    setEvents(updatedEvents);

    // Reset modal fields
    setNewEvent({ id: Date.now(), name: "", location: "", rate: "Standard", date: "" });
    setAddEventModal(false);

    // Reset filters and search
    setSearch("");
    setFilterRate("");

    // Scroll table to bottom to show new event
    setTimeout(() => {
      tableRef.current?.lastElementChild?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full space-y-6">
      <h1 className="text-3xl font-bold text-center text-emerald-500 mb-6">
        Top Events
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg shadow-lg border text-center">
          <h3 className="font-semibold text-lg">Total Events</h3>
          <p className="text-2xl font-bold text-emerald-500">{totalEvents}</p>
        </div>
        <div className="p-4 rounded-lg shadow-lg border text-center">
          <h3 className="font-semibold text-lg">Premium Events</h3>
          <p className="text-2xl font-bold text-green-600">{premiumEvents}</p>
        </div>
        <div className="p-4 rounded-lg shadow-lg border text-center">
          <h3 className="font-semibold text-lg">Standard Events</h3>
          <p className="text-2xl font-bold text-yellow-600">{standardEvents}</p>
        </div>
      </div>

      {/* Search, Filter & Add */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-2">
        <input
          type="text"
          placeholder="Search by event or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <select
          value={filterRate}
          onChange={(e) =>
            setFilterRate(e.target.value as "" | "Premium" | "Standard")
          }
          className="w-full md:w-1/4 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Rates</option>
          <option value="Premium">Premium</option>
          <option value="Standard">Standard</option>
        </select>
        <button
          onClick={() => setAddEventModal(true)}
          className="w-full md:w-1/4 px-3 py-2 bg-emerald-500 text-white rounded flex items-center justify-center gap-2 hover:bg-emerald-600"
        >
          <Plus size={16} /> Add New Event
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table ref={tableRef} className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Event Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Location</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Rate</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedEvents.map((event) => (
              <tr key={event.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="px-4 py-2">{event.name}</td>
                <td className="px-4 py-2">{event.location}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      event.rate === "Premium"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {event.rate}
                  </span>
                </td>
                <td className="px-4 py-2">{event.date}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => setViewEvent(event)}
                    className="text-blue-500 hover:underline flex items-center gap-1"
                  >
                    <Eye size={16} /> View
                  </button>
                  <button
                    onClick={() => setEditEvent(event)}
                    className="text-yellow-500 hover:underline flex items-center gap-1"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-red-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}

            {paginatedEvents.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* View Modal */}
      {viewEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">{viewEvent.name}</h2>
            <p><strong>Location:</strong> {viewEvent.location}</p>
            <p><strong>Rate:</strong> {viewEvent.rate}</p>
            <p><strong>Date:</strong> {viewEvent.date}</p>
            <button
              onClick={() => setViewEvent(null)}
              className="mt-4 px-3 py-1 bg-emerald-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Edit {editEvent.name}</h2>
            <input
              type="text"
              value={editEvent.name}
              onChange={(e) => setEditEvent({ ...editEvent, name: e.target.value })}
              className="w-full border px-2 py-1 mb-2 rounded"
            />
            <input
              type="text"
              value={editEvent.location}
              onChange={(e) => setEditEvent({ ...editEvent, location: e.target.value })}
              className="w-full border px-2 py-1 mb-2 rounded"
            />
            <select
              value={editEvent.rate}
              onChange={(e) =>
                setEditEvent({ ...editEvent, rate: e.target.value as "Premium" | "Standard" })
              }
              className="w-full border px-2 py-1 mb-2 rounded"
            >
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
            </select>
            <input
              type="date"
              value={editEvent.date}
              onChange={(e) => setEditEvent({ ...editEvent, date: e.target.value })}
              className="w-full border px-2 py-1 mb-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setEvents(events.map(ev => ev.id === editEvent.id ? editEvent : ev));
                  setEditEvent(null);
                }}
                className="px-3 py-1 bg-emerald-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditEvent(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {addEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-2">Add New Event</h2>
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              className="w-full border px-2 py-1 mb-2 rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className="w-full border px-2 py-1 mb-2 rounded"
            />
            <select
              value={newEvent.rate}
              onChange={(e) =>
                setNewEvent({ ...newEvent, rate: e.target.value as "Premium" | "Standard" })
              }
              className="w-full border px-2 py-1 mb-2 rounded"
            >
              <option value="Premium">Premium</option>
              <option value="Standard">Standard</option>
            </select>
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="w-full border px-2 py-1 mb-2 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleAddEvent}
                className="px-3 py-1 bg-emerald-500 text-white rounded"
              >
                Add
              </button>
              <button
                onClick={() => setAddEventModal(false)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopEventsDashboard;
