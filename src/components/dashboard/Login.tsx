import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // login logic
    navigate("/booking");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Login</h2>
      <input type="email" placeholder="Email" className="p-2 mb-4 border rounded" />
      <input type="password" placeholder="Password" className="p-2 mb-4 border rounded" />
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Login
      </button>
      <p className="mt-4">
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")} className="text-blue-600 cursor-pointer">
          Signup
        </span>
      </p>
    </div>
  );
}
