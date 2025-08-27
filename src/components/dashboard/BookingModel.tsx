

interface BookingProps {
  setUser: () => void;
  closeModal: () => void;
}

export default function BookingModel({ setUser, closeModal }: BookingProps) {
  const handleBooking = () => {
    setUser(); // save user logged in
    alert("Booking Successful! 🎉");
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold text-xl"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Book Your Slot</h2>
        <p className="text-gray-600 mb-4">Maximum 200 guests allowed.</p>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
        />
        <input
          type="number"
          placeholder="Number of Guests"
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
        />

        <button
          onClick={handleBooking}
          className="w-full py-3 mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:scale-105 transition-all duration-300"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
