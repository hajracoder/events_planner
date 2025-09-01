




import { useState } from "react";
import { account } from "../appwrite";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser }: { setUser: (user: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Delete existing session if any
      await account.deleteSession("current");

      // Create new session
      await account.createEmailPasswordSession(email, password);

      // Get current user
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
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
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
          Login
        </button>
        <p className="text-sm mt-4 text-center text-white">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-gray-300 hover:text-white">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
