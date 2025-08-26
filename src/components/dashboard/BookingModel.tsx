// import React, { useState } from "react";

// interface BookingModelProps {
//   setUser: React.Dispatch<any>;
//   onLoginSuccess: () => void;
// }

// const BookingModel: React.FC<BookingModelProps> = ({ setUser, onLoginSuccess }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // yahan tum apna login logic likho
//     console.log("Logged in with:", email, password);

//     // user set kar do
//     setUser({ email });
//     onLoginSuccess();
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default BookingModel;



import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

interface BookingModelProps {
  setUser: React.Dispatch<any>;
  onLoginSuccess: () => void;
  closeModal: () => void;
}

const BookingModel: React.FC<BookingModelProps> = ({
  setUser,
  onLoginSuccess,
  closeModal,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

  const handleLogin = () => {
    console.log("Logged in with:", email, password);

    setUser({ email });
    onLoginSuccess(); // auto open booking modal

    // optional: navigate to another page if chaho
    // navigate("/dashboard");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-xl font-bold"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default BookingModel;
