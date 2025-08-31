import { useState } from "react";
import { account } from "../appwrite";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }: { setUser: (user: any) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      setUser(user);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="w-full bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600">Login</button>
        <p className="text-sm mt-4 text-center">Don’t have an account? <a href="/signup" className="text-emerald-500">Sign Up</a></p>
      </form>
    </div>
  );
}
