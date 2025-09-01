

// // Users.tsx
// import { useState } from "react";
// import { Trash2 } from "lucide-react";

// interface User {
//   id: number;
//   name: string;
//   profession: string;
//   email: string;
//   phone: string;
//   status: string;
// }

// export default function Users() {
//   const [users, setUsers] = useState<User[]>([
//     {
//       id: 1,
//       name: "Ali Khan",
//       profession: "Owner",
//       email: "ali.khan@example.com",
//       phone: "+92 300 1234567",
//       status: "Active",
//     },
//     {
//       id: 2,
//       name: "Ahmed Raza",
//       profession: "Waiter",
//       email: "ahmed.raza@example.com",
//       phone: "+92 311 9876543",
//       status: "Inactive",
//     },
//     {
//       id: 3,
//       name: "Sara Malik",
//       profession: "Manager",
//       email: "sara.malik@example.com",
//       phone: "+92 322 5556677",
//       status: "Active",
//     },
//   ]);

//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 3;

//   // Show/Hide Form
//   const [showForm, setShowForm] = useState(false);
//   const [newUser, setNewUser] = useState<User>({
//     id: 0,
//     name: "",
//     profession: "",
//     email: "",
//     phone: "",
//     status: "Active",
//   });

//   const deleteUser = (id: number) => {
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   const addUser = () => {
//     if (!newUser.name || !newUser.profession) {
//       alert("Name and Profession are required!");
//       return;
//     }

//     setUsers([
//       ...users,
//       { ...newUser, id: users.length ? users[users.length - 1].id + 1 : 1 },
//     ]);

//     setShowForm(false);
//     setNewUser({
//       id: 0,
//       name: "",
//       profession: "",
//       email: "",
//       phone: "",
//       status: "Active",
//     });
//   };

//   // Filter + Search
//   const filteredUsers = users.filter((user) => {
//     const matchesSearch =
//       user.name.toLowerCase().includes(search.toLowerCase()) ||
//       user.profession.toLowerCase().includes(search.toLowerCase());

//     const matchesFilter = filter === "All" || user.status === filter;

//     return matchesSearch && matchesFilter;
//   });

//   // Pagination
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   return (
//     <div className="p-6">
//       <h2 className="text-6xl text-left font-[Montserrat] mt-4 mb-4">
//         Our Users
//       </h2>

//       {/* Show Form Above Search Bar */}
//       {showForm && (
//         <div className="bg-white border rounded-lg shadow p-4 mb-4">
//           <h3 className="text-lg font-semibold mb-3">Add New User</h3>
//           <div className="grid grid-cols-2 gap-3">
//             <input
//               type="text"
//               placeholder="Name"
//               value={newUser.name}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, name: e.target.value })
//               }
//               className="border px-3 py-2 rounded col-span-2"
//             />
//             <input
//               type="text"
//               placeholder="Profession (Owner, Waiter, Manager)"
//               value={newUser.profession}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, profession: e.target.value })
//               }
//               className="border px-3 py-2 rounded col-span-2"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={newUser.email}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, email: e.target.value })
//               }
//               className="border px-3 py-2 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Phone"
//               value={newUser.phone}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, phone: e.target.value })
//               }
//               className="border px-3 py-2 rounded"
//             />
//             <select
//               value={newUser.status}
//               onChange={(e) =>
//                 setNewUser({ ...newUser, status: e.target.value })
//               }
//               className="border px-3 py-2 rounded col-span-2"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>

//           <div className="flex justify-end gap-2 mt-4">
//             <button
//               onClick={() => setShowForm(false)}
//               className="px-4 py-2 border rounded"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={addUser}
//               className="px-4 py-2 border bg-black text-white rounded"
//             >
//               Save
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Search + Filter + Add */}
//       <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
//         {/* Search bar */}
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border-2 px-3 py-2 rounded flex-1"
//         />

//         {/* Filter + Add together */}
//         <div className="flex gap-2">
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value)}
//             className="border-2 px-3 py-2 rounded"
//           >
//             <option value="All">All</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>

//           <button
//             onClick={() => setShowForm(true)}
//             className="px-4 py-2 border bg-black text-white rounded"
//           >
//             + Add User
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <table className="min-w-full mt-6 rounded-lg overflow-hidden shadow">
//         <thead>
//           <tr className="border rounded-lg">
//             <th className="px-4 py-2 text-left">Name</th>
//             <th className="px-4 py-2 text-left">Profession</th>
//             <th className="px-4 py-2 text-left">Email</th>
//             <th className="px-4 py-2 text-left">Phone</th>
//             <th className="px-4 py-2 text-left">Status</th>
//             <th className="px-4 py-2 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentUsers.map((user) => (
//             <tr key={user.id} className="border-b hover:bg-gray-50">
//               <td className="px-4 py-2">{user.name}</td>
//               <td className="px-4 py-2">{user.profession}</td>
//               <td className="px-4 py-2">{user.email}</td>
//               <td className="px-4 py-2">{user.phone}</td>
//               <td className="px-4 py-2">{user.status}</td>
//               <td className="px-4 py-2 text-center">
//                 <button
//                   onClick={() => deleteUser(user.id)}
//                   className="hover:text-red-600"
//                 >
//                   <Trash2 size={20} color="red"/>
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {currentUsers.length === 0 && (
//             <tr>
//               <td colSpan={6} className="text-center py-4 text-gray-500">
//                 No users found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-center items-center mt-4 gap-2">
//         <button
//           disabled={currentPage === 1}
//           onClick={() => setCurrentPage(currentPage - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Prev
//         </button>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => setCurrentPage(i + 1)}
//             className={`px-3 py-1 border rounded ${
//               currentPage === i + 1 ? "bg-black text-white" : ""
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button
//           disabled={currentPage === totalPages}
//           onClick={() => setCurrentPage(currentPage + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }















// Users.tsx
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
// make sure your Appwrite client is exported from here
import { databases, DATABASE_ID, COLLECTION_ID_USERS } from "../appwrite";

export interface User {
  $id: string; // Appwrite document id
  name: string;
  profession: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    status: "Active" as "Active" | "Inactive",
  });

  // Fetch Users from Appwrite
 const fetchUsers = async () => {
  try {
    const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_USERS);

    // Map Appwrite documents to User type
    const formattedUsers: User[] = res.documents.map((doc: any) => ({
      $id: doc.$id, // Appwrite document ID
      name: doc.name,
      profession: doc.profession,
      email: doc.email,
      phone: doc.phone,
      status: doc.status,
    }));

    setUsers(formattedUsers);
  } catch (err) {
    console.error("Fetch Users Error:", err);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);

  // Add User
const addUser = async () => {
  if (!newUser.name || !newUser.profession) {
    alert("Name and Profession are required!");
    return;
  }
  try {
    const res = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_USERS,
      "unique()",
      newUser
    );

    // Map Appwrite document to User type
    const addedUser: User = {
      $id: res.$id,       // Appwrite document ID
      name: res.name,
      profession: res.profession,
      email: res.email,
      phone: res.phone,
      status: res.status,
    };

    setUsers((prev) => [...prev, addedUser]);

    setNewUser({
      name: "",
      profession: "",
      email: "",
      phone: "",
      status: "Active",
    });
    setShowForm(false);
  } catch (err) {
    console.error("Add User Error:", err);
  }
};


  // Delete User
  const deleteUser = async ($id: string) => {
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_USERS, $id);
      setUsers(users.filter((user) => user.$id !== $id));
    } catch (err) {
      console.error("Delete User Error:", err);
    }
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
    <div className="p-4 md:p-6 space-y-4">
      <h2 className="text-3xl md:text-4xl font-semibold">Our Users</h2>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h3 className="font-semibold text-lg">Add New User</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Profession"
              value={newUser.profession}
              onChange={(e) => setNewUser({ ...newUser, profession: e.target.value })}
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              className="border px-3 py-2 rounded"
            />
            <select
              value={newUser.status}
              onChange={(e) => setNewUser({ ...newUser, status: e.target.value as "Active" | "Inactive" })}
              className="border px-3 py-2 rounded col-span-1 md:col-span-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
            <button onClick={addUser} className="px-4 py-2 bg-black text-white rounded">Save</button>
          </div>
        </div>
      )}

      {/* Search + Filter + Add */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded flex-1"
        />
        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "All" | "Active" | "Inactive")}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-black text-white rounded">
            + Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <table className="min-w-full border rounded overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-100">
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
            <tr key={user.$id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{user.name}</td>
              <td className="px-4 py-2">{user.profession}</td>
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">{user.phone}</td>
              <td className="px-4 py-2">{user.status}</td>
              <td className="px-4 py-2 text-center">
                <button onClick={() => deleteUser(user.$id)}>
                  <Trash2 size={20} color="red" />
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
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4 flex-wrap">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${currentPage === page ? "bg-black text-white" : ""}`}
            >
              {page}
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
      )}
    </div>
  );
}
