import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = () => {
    // signup logic
    navigate("/booking");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Signup</h2>
      <input type="text" placeholder="Username" className="p-2 mb-4 border rounded" />
      <input type="email" placeholder="Email" className="p-2 mb-4 border rounded" />
      <input type="password" placeholder="Password" className="p-2 mb-4 border rounded" />
      <button
        onClick={handleSignup}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Signup
      </button>
      <p className="mt-4">
        Already have an account?{" "}
        <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer">
          Login
        </span>
      </p>
    </div>
  );
}
