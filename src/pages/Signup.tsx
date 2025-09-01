

import { useState } from "react";
import { account } from "../appwrite";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, Link } from "react-router-dom";

export default function Signup({ setUser }: { setUser: (user: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Create new user
      await account.create(uuidv4(), email, password, name);

      // Delete existing session if any (prevents session conflict)
      try {
        await account.deleteSession("current");
      } catch (e) {
        // ignore if no session exists
      }

      // Create session for the new user
      await account.createEmailPasswordSession(email, password);

      // Get user info
      const user = await account.get();
      setUser(user);

      // Navigate to dashboard
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form onSubmit={handleSignup} className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Create Account</h2>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-700 rounded bg-black text-white placeholder-gray-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-700 rounded bg-black text-white placeholder-gray-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-700 rounded bg-black text-white placeholder-gray-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-white text-black py-2 rounded-xl hover:bg-gray-200 transition-colors"
        >
          Sign Up
        </button>
        <p className="text-sm mt-4 text-center text-white">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-300 hover:text-white">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
