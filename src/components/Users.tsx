


// // Users.tsx
// import { useEffect, useState } from "react";
// import { Trash2 } from "lucide-react";
// // make sure your Appwrite client is exported from here
// import { databases, DATABASE_ID, COLLECTION_ID_USERS } from "../appwrite";

// export interface User {
//   $id: string; // Appwrite document id
//   name: string;
//   profession: string;
//   email: string;
//   phone: string;
//   status: "Active" | "Inactive";
// }

// export default function Users() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [search, setSearch] = useState("");
//   const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 3;

//   const [showForm, setShowForm] = useState(false);
//   const [newUser, setNewUser] = useState({
//     name: "",
//     profession: "",
//     email: "",
//     phone: "",
//     status: "Active" as "Active" | "Inactive",
//   });

//   // Fetch Users from Appwrite
//  const fetchUsers = async () => {
//   try {
//     const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_USERS);

//     // Map Appwrite documents to User type
//     const formattedUsers: User[] = res.documents.map((doc: any) => ({
//       $id: doc.$id, // Appwrite document ID
//       name: doc.name,
//       profession: doc.profession,
//       email: doc.email,
//       phone: doc.phone,
//       status: doc.status,
//     }));

//     setUsers(formattedUsers);
//   } catch (err) {
//     console.error("Fetch Users Error:", err);
//   }
// };


//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Add User
// const addUser = async () => {
//   if (!newUser.name || !newUser.profession) {
//     alert("Name and Profession are required!");
//     return;
//   }
//   try {
//     const res = await databases.createDocument(
//       DATABASE_ID,
//       COLLECTION_ID_USERS,
//       "unique()",
//       newUser
//     );

//     // Map Appwrite document to User type
//     const addedUser: User = {
//       $id: res.$id,       // Appwrite document ID
//       name: res.name,
//       profession: res.profession,
//       email: res.email,
//       phone: res.phone,
//       status: res.status,
//     };

//     setUsers((prev) => [...prev, addedUser]);

//     setNewUser({
//       name: "",
//       profession: "",
//       email: "",
//       phone: "",
//       status: "Active",
//     });
//     setShowForm(false);
//   } catch (err) {
//     console.error("Add User Error:", err);
//   }
// };


//   // Delete User
//   const deleteUser = async ($id: string) => {
//     try {
//       await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_USERS, $id);
//       setUsers(users.filter((user) => user.$id !== $id));
//     } catch (err) {
//       console.error("Delete User Error:", err);
//     }
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
//     <div className="p-4 md:p-6 space-y-4">
      
//      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-left font-[Montserrat] mt-4 mb-4">
//   Our Users
// </h2>


//       {/* Add Form */}
//       {showForm && (
//         <div className="bg-white p-4 rounded shadow space-y-4">
//           <h3 className="font-semibold text-lg">Add New User</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//             <input
//               type="text"
//               placeholder="Name"
//               value={newUser.name}
//               onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//               className="border px-3 py-2 rounded"
//               required
//             />
//             <input
//               type="text"
//               placeholder="Profession"
//               value={newUser.profession}
//               onChange={(e) => setNewUser({ ...newUser, profession: e.target.value })}
//               className="border px-3 py-2 rounded"
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={newUser.email}
//               onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//               className="border px-3 py-2 rounded"
//             />
//             <input
//               type="text"
//               placeholder="Phone"
//               value={newUser.phone}
//               onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
//               className="border px-3 py-2 rounded"
//             />
//             <select
//               value={newUser.status}
//               onChange={(e) => setNewUser({ ...newUser, status: e.target.value as "Active" | "Inactive" })}
//               className="border px-3 py-2 rounded col-span-1 md:col-span-2"
//             >
//               <option value="Active">Active</option>
//               <option value="Inactive">Inactive</option>
//             </select>
//           </div>
//           <div className="flex justify-end gap-2">
//             <button onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">Cancel</button>
//             <button onClick={addUser} className="px-4 py-2 bg-black text-white rounded">Save</button>
//           </div>
//         </div>
//       )}

//       {/* Search + Filter + Add */}
//       <div className="flex flex-wrap items-center justify-between gap-2">
//         <input
//           type="text"
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="border px-3 py-2 rounded flex-1"
//         />
//         <div className="flex gap-2">
//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value as "All" | "Active" | "Inactive")}
//             className="border px-3 py-2 rounded"
//           >
//             <option value="All">All</option>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//           <button onClick={() => setShowForm(true)} className="px-4 py-2 bg-black text-white rounded">
//             + Add User
//           </button>
//         </div>
//       </div>

//  <div className="overflow-x-auto">
//   <table className="min-w-full border rounded overflow-hidden shadow text-sm md:text-base">
//     <thead>
//       <tr className="bg-gray-100">
//         <th className="px-4 py-2 text-left">Name</th>
//         <th className="px-4 py-2 text-left">Profession</th>
//         <th className="px-4 py-2 text-left">Email</th>
//         <th className="px-4 py-2 text-left">Phone</th>
//         <th className="px-4 py-2 text-left">Status</th>
//         <th className="px-4 py-2 text-center">Actions</th>
//       </tr>
//     </thead>
//     <tbody>
//       {currentUsers.map((user) => (
//         <tr
//           key={user.$id}
//           className="border-b hover:bg-gray-50"
//         >
//           <td className="px-4 py-2 break-words">{user.name}</td>
//           <td className="px-4 py-2 break-words">{user.profession}</td>
//           <td className="px-4 py-2 break-all">{user.email}</td>
//           <td className="px-4 py-2 break-words">{user.phone}</td>
//           <td className="px-4 py-2">{user.status}</td>
//           <td className="px-4 py-2 text-center">
//             <button onClick={() => deleteUser(user.$id)}>
//               <Trash2 size={20} color="red" />
//             </button>
//           </td>
//         </tr>
//       ))}
//       {currentUsers.length === 0 && (
//         <tr>
//           <td
//             colSpan={6}
//             className="text-center py-4 text-gray-500"
//           >
//             No users found
//           </td>
//         </tr>
//       )}
//     </tbody>
//   </table>
// </div>


//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 mt-4 flex-wrap">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage(currentPage - 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Prev
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => setCurrentPage(page)}
//               className={`px-3 py-1 border rounded ${currentPage === page ? "bg-black text-white" : ""}`}
//             >
//               {page}
//             </button>
//           ))}
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage(currentPage + 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }











// // --------------------------------------------------------------------------------------------------------------------
// Users.tsx
import { useEffect, useState } from "react";
import { Trash2, Edit, Eye, X } from "lucide-react";
import { databases, DATABASE_ID, COLLECTION_ID_USERS } from "../appwrite";

export interface User {
  $id: string;
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
  const usersPerPage = 5;

  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    profession: "",
    email: "",
    phone: "",
    status: "Active" as "Active" | "Inactive",
  });

  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [showMsg, setShowMsg] = useState(false);

  // 🔹 Show short message
  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 2000);
    setTimeout(() => setMessage(null), 2300);
  };

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_USERS);
      const formattedUsers: User[] = res.documents.map((doc: any) => ({
        $id: doc.$id,
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

  // 🔹 Add User
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

      const addedUser: User = {
        $id: res.$id,
        name: res.name,
        profession: res.profession,
        email: res.email,
        phone: res.phone,
        status: res.status,
      };

      setUsers((prev) => [...prev, addedUser]);
      setNewUser({ name: "", profession: "", email: "", phone: "", status: "Active" });
      setShowForm(false);
      showMessage("User added!", "success");
    } catch (err) {
      console.error("Add User Error:", err);
      showMessage("Add failed", "error");
    }
  };

  // 🔹 Update User
  const updateUser = async () => {
    if (!editUser) return;
    try {
      const { $id, ...updateData } = editUser;
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID_USERS, $id!, updateData);
      setUsers(users.map((u) => (u.$id === $id ? editUser : u)));
      setEditUser(null);
      showMessage("User updated!", "success");
    } catch (err) {
      console.error("Update User Error:", err);
      showMessage("Update failed", "error");
    }
  };

  // 🔹 Delete User
  const deleteUser = async ($id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_USERS, $id);
      setUsers(users.filter((user) => user.$id !== $id));
      showMessage("Deleted!", "success");
    } catch (err) {
      console.error("Delete User Error:", err);
      showMessage("Delete failed", "error");
    }
  };

  // 🔹 Filter + Search
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.profession.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || user.status === filter;
    return matchesSearch && matchesFilter;
  });

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="p-4 md:p-6 space-y-4">
      {message && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded shadow font-medium text-sm text-white transition-all duration-500 transform ${
            showMsg ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ backgroundColor: "#000" }}
        >
          {message.text}
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-[Montserrat] mt-4 mb-4">
        Our Users
      </h2>

      {/* Add Form */}
      {(showForm || editUser) && (
        <div className="bg-white p-4 rounded shadow space-y-4">
          <h3 className="font-semibold text-lg">{editUser ? "Edit User" : "Add New User"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Name"
              value={editUser ? editUser.name : newUser.name}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, name: e.target.value })
                  : setNewUser({ ...newUser, name: e.target.value })
              }
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Profession"
              value={editUser ? editUser.profession : newUser.profession}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, profession: e.target.value })
                  : setNewUser({ ...newUser, profession: e.target.value })
              }
              className="border px-3 py-2 rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={editUser ? editUser.email : newUser.email}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, email: e.target.value })
                  : setNewUser({ ...newUser, email: e.target.value })
              }
              className="border px-3 py-2 rounded"
            />
            <input
              type="text"
              placeholder="Phone"
              value={editUser ? editUser.phone : newUser.phone}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, phone: e.target.value })
                  : setNewUser({ ...newUser, phone: e.target.value })
              }
              className="border px-3 py-2 rounded"
            />
            <select
              value={editUser ? editUser.status : newUser.status}
              onChange={(e) =>
                editUser
                  ? setEditUser({ ...editUser, status: e.target.value as "Active" | "Inactive" })
                  : setNewUser({ ...newUser, status: e.target.value as "Active" | "Inactive" })
              }
              className="border px-3 py-2 rounded col-span-1 md:col-span-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setShowForm(false);
                setEditUser(null);
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={editUser ? updateUser : addUser}
              className="px-4 py-2 bg-black text-white rounded"
            >
              {editUser ? "Update" : "Save"}
            </button>
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded overflow-hidden shadow text-sm md:text-base">
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
                <td className="px-4 py-2 break-words">{user.name}</td>
                <td className="px-4 py-2 break-words">{user.profession}</td>
                <td className="px-4 py-2 break-all">{user.email}</td>
                <td className="px-4 py-2 break-words">{user.phone}</td>
                <td className="px-4 py-2">{user.status}</td>
                <td className="px-4 py-2 text-center flex justify-center gap-2">
                  <button onClick={() => setViewUser(user)}>
                    <Eye size={20} />
                  </button>
                  <button onClick={() => setEditUser(user)}>
                    <Edit size={20} />
                  </button>
                  <button onClick={() => deleteUser(user.$id)}>
                    <Trash2 size={20}  />
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
      </div>

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

      {/* View User Modal */}
      {viewUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold">{viewUser.name}</h2>
              <button onClick={() => setViewUser(null)} className="text-gray-500 hover:text-gray-800">
                <X size={22} />
              </button>
            </div>
            <div className="space-y-2 text-gray-700 text-sm sm:text-base">
              <p><strong>Profession:</strong> {viewUser.profession}</p>
              <p><strong>Email:</strong> {viewUser.email}</p>
              <p><strong>Phone:</strong> {viewUser.phone}</p>
              <p><strong>Status:</strong> {viewUser.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
