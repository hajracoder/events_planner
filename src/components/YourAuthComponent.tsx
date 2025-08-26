import React, { useState } from "react";
import { account, ID } from "@/appwrite";

interface AuthProps {
  setUser: React.Dispatch<any>;
  onLoginSuccess: (user: any) => void;
}

const YourAuthComponent: React.FC<AuthProps> = ({ setUser, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // 🔹 Login Function
  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      onLoginSuccess(currentUser);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  // 🔹 Signup Function
  const handleSignup = async () => {
    try {
      await account.create(ID.unique(), email, password);
      await account.createEmailPasswordSession(email, password);
      const currentUser = await account.get();
      setUser(currentUser);
      onLoginSuccess(currentUser);
    } catch (error) {
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">
        {isLogin ? "Login" : "Signup"}
      </h2>

      {/* Email Input */}
      <input
        type="email"
        placeholder="Enter Email"
        className="w-full p-2 mb-3 border rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Password Input */}
      <input
        type="password"
        placeholder="Enter Password"
        className="w-full p-2 mb-3 border rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Button */}
      <button
        onClick={isLogin ? handleLogin : handleSignup}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        {isLogin ? "Login" : "Signup"}
      </button>

      {/* Toggle between Login/Signup */}
      <p
        className="text-sm text-center mt-4 cursor-pointer text-blue-500"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Signup"
          : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default YourAuthComponent;
