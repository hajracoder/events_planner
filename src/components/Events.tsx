import { useState } from "react";
import { Trash2 } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  address: string;
  status: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Marriage Ceremony",
      description: "Wedding of Ali & Ayesha",
      date: "2025-09-10",
      location: "Lahore",
      address: "Pearl Continental Hotel, Lahore",
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Birthday Party",
      description: "Ahmed's 25th Birthday",
      date: "2025-09-12",
      location: "Karachi",
      address: "Clifton Beach House, Karachi",
      status: "Completed",
    },
    {
      id: 3,
      title: "Conference",
      description: "Tech Conference 2025",
      date: "2025-09-15",
      location: "Islamabad",
      address: "Serena Hotel, Islamabad",
      status: "Ongoing",
    },
    {
      id: 4,
      title: "Engagement Ceremony",
      description: "Engagement of Sana & Usman",
      date: "2025-09-20",
      location: "Faisalabad",
      address: "Royal Palm Banquet, Faisalabad",
      status: "Upcoming",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  // Show/Hide Form
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState<Event>({
    id: 0,
    title: "",
    description: "",
    date: "",
    location: "",
    address: "",
    status: "Upcoming",
  });

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert("Title and Date are required!");
      return;
    }

    setEvents([
      ...events,
      { ...newEvent, id: events.length ? events[events.length - 1].id + 1 : 1 },
    ]);

    setShowForm(false);
    setNewEvent({
      id: 0,
      title: "",
      description: "",
      date: "",
      location: "",
      address: "",
      status: "Upcoming",
    });
    setCurrentPage(Math.ceil((events.length + 1) / eventsPerPage));
  };

  // Filter + Search
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || event.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="p-6">
      <h2 className="text-4xl border border-green-200 bg-green-200 text-center text-green-900 font-[Montserrat] mb-32">
        Our Events
      </h2>

      {/* Show Form Above Search Bar */}
      {showForm && (
        <div className="bg-white border rounded-lg shadow p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">Add New Event</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              className="border px-3 py-2 rounded col-span-2"
            />
            <input
              type="text"
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="border px-3 py-2 rounded col-span-2"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <select
              value={newEvent.status}
              onChange={(e) => setNewEvent({ ...newEvent, status: e.target.value })}
              className="border px-3 py-2 rounded"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Address"
              value={newEvent.address}
              onChange={(e) =>
                setNewEvent({ ...newEvent, address: e.target.value })
              }
              className="border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={addEvent}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Search + Filter + Add */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 px-3 py-2 rounded flex-1"
        />
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add Event
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full border border-green-700 rounded-lg overflow-hidden shadow">
        <thead className="bg-green-200">
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
        <tbody>
          {currentEvents.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-gray-500">
                No events found
              </td>
            </tr>
          )}
          {currentEvents.map((event) => (
            <tr key={event.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{event.title}</td>
              <td className="px-4 py-2">{event.description}</td>
              <td className="px-4 py-2">{event.date}</td>
              <td className="px-4 py-2">{event.location}</td>
              <td className="px-4 py-2">{event.address}</td>
              <td className="px-4 py-2">{event.status}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
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
              currentPage === i + 1 ? "bg-green-600 text-white" : ""
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
    </div>
  );
}
