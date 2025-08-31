import { useState } from "react";
import { account } from "../appwrite";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

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
      await account.create(uuidv4(), email, password, name);
      const session = await account.createEmailPasswordSession(email, password);
      console.log(session);  // ya _session = ...
      const user = await account.get();
      setUser(user);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-3 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 border rounded" required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
        <button type="submit" className="w-full bg-emerald-500 text-white py-2 rounded-xl hover:bg-emerald-600">Sign Up</button>
        <p className="text-sm mt-4 text-center">Already have an account? <a href="/login" className="text-emerald-500">Login</a></p>
      </form>
    </div>
  );
}
