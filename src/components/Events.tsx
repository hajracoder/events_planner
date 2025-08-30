// export default function Dashboard() {
//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       <p className="mt-2 text-gray-600">Welcome to your dashboard.</p>
//     </div>
//   );
// }

import { useState } from "react";

interface Event {
  id: number;
  title: string;
  date: string; // Required property
}

export default function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Add or update event
  const handleAddOrUpdate = () => {
    if (!title || !date) return alert("Title and Date required");

    if (editId !== null) {
      setEvents(prev =>
        prev.map(e => (e.id === editId ? { ...e, title, date } : e))
      );
      setEditId(null);
    } else {
      setEvents(prev => [...prev, { id: Date.now(), title, date }]);
    }

    setTitle("");
    setDate("");
  };

  // Edit event
  const handleEdit = (event: Event) => {
    setEditId(event.id);
    setTitle(event.title);
    setDate(event.date);
  };

  // Delete event
  const handleDelete = (id: number) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Calculate status dynamically
  const getStatus = (date: string) => {
    const today = new Date();
    const eventDate = new Date(date);

    if (eventDate < today) return "Done";
    if (eventDate.toDateString() === today.toDateString()) return "In Progress";
    return "Pending";
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Events Manager</h1>

      {/* Add/Edit Form */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 rounded"
        >
          {editId !== null ? "Update" : "Add"}
        </button>
      </div>

      {/* Events Table */}
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Title</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center">
                No events added yet.
              </td>
            </tr>
          )}
          {events.map(event => (
            <tr key={event.id} className="text-center">
              <td className="border p-2">{event.title}</td>
              <td className="border p-2">{event.date}</td>
              <td className="border p-2">{getStatus(event.date)}</td>
              <td className="border p-2 flex justify-center gap-2">
                <button
                  onClick={() => handleEdit(event)}
                  className="bg-yellow-400 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
