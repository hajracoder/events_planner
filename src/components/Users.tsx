// Users.tsx
import { useState } from "react";
import { Trash2 } from "lucide-react";

interface User {
  id: number;
  name: string;
  profession: string;
  email: string;
  phone: string;
  status: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ali Khan",
      profession: "Owner",
      email: "ali.khan@example.com",
      phone: "+92 300 1234567",
      status: "Active",
    },
    {
      id: 2,
      name: "Ahmed Raza",
      profession: "Waiter",
      email: "ahmed.raza@example.com",
      phone: "+92 311 9876543",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Sara Malik",
      profession: "Manager",
      email: "sara.malik@example.com",
      phone: "+92 322 5556677",
      status: "Active",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  // Show/Hide Form
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    name: "",
    profession: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const addUser = () => {
    if (!newUser.name || !newUser.profession) {
      alert("Name and Profession are required!");
      return;
    }

    setUsers([
      ...users,
      { ...newUser, id: users.length ? users[users.length - 1].id + 1 : 1 },
    ]);

    setShowForm(false);
    setNewUser({
      id: 0,
      name: "",
      profession: "",
      email: "",
      phone: "",
      status: "Active",
    });
  };

  // Filter + Search
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.profession.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || user.status === filter;

    return matchesSearch && matchesFilter;
  });

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <h2 className="text-4xl border border-green-200 bg-green-200 text-center text-green-900 font-[Montserrat] mb-32">
      Our  Users
      </h2>

      {/* Show Form Above Search Bar */}
      {showForm && (
        <div className="bg-white border rounded-lg shadow p-4 mb-4">
          <h3 className="text-lg font-semibold mb-3">Add New User</h3>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              className="border px-3 py-2 rounded col-span-2"
            />
            <input
              type="text"
              placeholder="Profession (Owner, Waiter, Manager)"
              value={newUser.profession}
              onChange={(e) =>
                setNewUser({ ...newUser, profession: e.target.value })
              }
              className="border px-3 py-2 rounded col-span-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
              className="border px-3 py-2 rounded"
            />
            <select
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
              className="border px-3 py-2 rounded col-span-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={addUser}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Search + Filter + Add */}
    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        {/* Search bar lambi */}
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-2 px-3 py-2 rounded flex-1"
        />

        {/* Filter + Add together */}
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border-2 px-3 py-2 rounded"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full border border-green-700 rounded-lg overflow-hidden shadow">
        <thead className="bg-green-200">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Profession</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.profession}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">{user.status}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
          {currentUsers.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500">
                No users found
              </td>
            </tr>
          )}
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
