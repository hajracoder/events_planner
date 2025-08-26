import React, { useState } from "react";
import BookingModel from "./BookingModel";

const BookingWrapper: React.FC = () => {
  const [user, setUser] = useState<any>(null);

  // ✅ ye function define karo
  const handleLoginSuccess = () => {
    console.log("✅ Login Successful!");
  };

  // ✅ agar modal close karna ho future mai
  const handleCloseModal = () => {
    console.log("❌ Modal Closed");
  };

  return (
    <div className="p-6">
      {!user ? (
        <BookingModel
          setUser={setUser}
          onLoginSuccess={handleLoginSuccess} // ✅ yahan correct function diya
          closeModal={handleCloseModal}       // ✅ ab error nahi aayega
        />
      ) : (
        <div className="p-4 border rounded-lg shadow-md bg-green-100">
          <h2 className="text-lg font-bold">Welcome, {user.email} 🎉</h2>
        </div>
      )}
    </div>
  );
};

export default BookingWrapper;
