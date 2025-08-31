

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./components/Sidebar";

// // Pages
// import Dashboard from "./components/Dashboard";
// import Events from "./components/Events";
// import Locations from "./components/Locations";
// import Users from "./components/Users";

// export default function App() {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar />
//         <main className="flex-1 p-4">
//           <Routes>
//             <Route path="/" element={<Navigate to="/dashboard" />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/events" element={<Events />} />
//             <Route path="/locations" element={<Locations />} />
//             <Route path="/users" element={<Users />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// }

// -----------------------------------------






// import { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { account } from "./appwrite"; 
// import Signup from "./pages/Signup";
// import Login from "./pages/Login_form";
// import Navbar from "./components/Navbar";

// export default function App() {
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   // Check if user already logged in
//   useEffect(() => {
//     const checkUser = async () => {
//       try {
//         const currentUser = await account.get();
//         setUser(currentUser);
//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     checkUser();
//   }, []);

//   if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

//   return (
//     <Router>
//       {user && <Navbar setUser={setUser} />}
//       <Routes>
//         {!user ? (
//           <>
//             <Route path="/signup" element={<Signup setUser={setUser} />} />
//             <Route path="/login" element={<Login setUser={setUser} />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </>
//         ) : (
//           <>
//             <Route path="/" element={<h1 className="text-center mt-10 text-2xl">🎉 Welcome, {user.name}!</h1>} />
//             <Route path="*" element={<Navigate to="/" />} />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }






import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { account } from "./appwrite";
import Signup from "./pages/Signup";
import Login from "./pages/Login_form";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Pages
import Dashboard from "./components/Dashboard";
import Events from "./components/Events";
import Locations from "./components/Locations";
import Users from "./components/Users";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check if user already logged in
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <Router>
      {!user ? (
        // --- agar user login nahi ---
        <Routes>
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        // --- agar user login hai ---
        <div className="flex flex-col h-screen">
          {/* Navbar hamesha upar rahegi */}
          <Navbar user={user} setUser={setUser} />


          {/* Niche wala area sidebar + content ke liye */}
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />

            <main className="flex-1 p-6 overflow-y-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/events" element={<Events />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </Router>
  );
}
