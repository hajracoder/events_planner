

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react"; // ✅ icon import

type Props = {
  setActivePage: (page: string) => void;
};

 const Booking: React.FC<Props> = ({ setActivePage }) =>{
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    people: 1,
    date: "",
    table: "",
    menu: [] as string[],
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const MENU_ITEMS = [
     { name: "Mutton Karahi", price: 700 },
    { name: "Veg Platter", price: 300 },
    { name: "Cold Drinks", price: 150 },
    { name: "Fruit Salad", price: 200 },
    { name: "Samosa", price: 50 },
    { name: "Spring Roll", price: 70 },
    { name: "Chocolate Cake", price: 250 },
    { name: "Ice Cream", price: 120 },
    { name: "Juice", price: 100 },
    { name: "Shawarma", price: 350 },
    { name: "Pasta", price: 400 },
    { name: "Paneer Tikka", price: 450 },
    { name: "Chicken Wings", price: 500 },
    { name: "French Fries", price: 100 },
    { name: "Pizza Slice", price: 300 },
    { name: "Burger", price: 250 },
    { name: "Hot Dog", price: 200 },
    { name: "Mango Shake", price: 180 },
    { name: "Lemonade", price: 120 },
  ];

  const TABLES = [
    { name: "Table 1", price: 2500 },
    { name: "Table 2", price: 3000 },
    { name: "Table 3", price: 2800 },
  ];

  const toggleMenuItem = (item: string) => {
    setBooking((prev) =>
      prev.menu.includes(item)
        ? { ...prev, menu: prev.menu.filter((i) => i !== item) }
        : { ...prev, menu: [...prev.menu, item] }
    );
  };

const totalPrice = () => {
  const tablePrice = TABLES.find((t) => t.name === booking.table)?.price || 0;
  const menuPrice = booking.menu.reduce((sum, item) => {
    const menuItem = MENU_ITEMS.find((m) => m.name === item);
    return sum + (menuItem?.price || 0);
  }, 0);

  // Multiply menu price by number of people
  return tablePrice + menuPrice * booking.people;
};
;

  const onBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 via-pink-600 to-orange-300 flex items-center justify-center p-4">
       <button
              onClick={() => setActivePage("Dashboard")}
              className=" fixed z-50 top-4 right-4 w-11 h-11 flex items-center justify-center
                         rounded-full bg-white hover:bg-gray-200 
                         text-blue-600 shadow-lg transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
              </button>
      <motion.form
        onSubmit={onBookSubmit}
        className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-4 shadow-2xl"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-white">
          Reserve Your Table
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="w-full border rounded-xl px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Your Name"
            value={booking.name}
            onChange={(e) => setBooking({ ...booking, name: e.target.value })}
            required
          />
          <input
            type="email"
            className="w-full border rounded-xl px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Email"
            value={booking.email}
            onChange={(e) => setBooking({ ...booking, email: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            className="w-full border rounded-xl px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-pink-400 transition"
            placeholder="Number of People"
            min={1}
            value={booking.people}
            onChange={(e) =>
              setBooking({ ...booking, people: Number(e.target.value) })
            }
            required
          />
          <input
            type="date"
            className="w-full border rounded-xl px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-pink-400 transition"
            value={booking.date}
            onChange={(e) => setBooking({ ...booking, date: e.target.value })}
            required
          />
        </div>

        <div className="border rounded-xl p-3 text-white">
          <p className="font-semibold mb-2">Select Table:</p>
          <div className="grid grid-cols-2 gap-2">
            {TABLES.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setBooking({ ...booking, table: t.name })}
                className={`px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-200 ${
                  booking.table === t.name
                    ? "bg-pink-500 text-white shadow-md scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {t.name} - Rs.{t.price}
              </button>
            ))}
          </div>
        </div>

        <div className="border rounded-xl p-3 max-h-64 overflow-y-auto text-white">
          <p className="font-semibold mb-2">Select Menu Items:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {MENU_ITEMS.map((m) => (
              <button
                type="button"
                key={m.name}
                onClick={() => toggleMenuItem(m.name)}
                className={`px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-200 ${
                  booking.menu.includes(m.name)
                    ? "bg-green-500 text-white shadow-md scale-105"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {m.name} - Rs.{m.price}
              </button>
            ))}
          </div>
        </div>

       <motion.p
  className="mt-2 font-bold text-lg text-white text-center"
  animate={{ scale: [1, 1.1, 1] }}
  transition={{ repeat: Infinity, duration: 1.5 }}
>
  Total for {booking.people} {booking.people > 1 ? "people" : "person"}: Rs.{totalPrice()}
</motion.p>


        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-black font-semibold px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Confirm Booking
        </motion.button>
      </motion.form>

      {/* Booking Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
              <p className="mb-4">
                Table: {booking.table || "N/A"} <br />
                Menu: {booking.menu.join(", ") || "None"} <br />
                Total: Rs.{totalPrice()}
              </p>
              <button
                className="bg-gradient-to-r from-pink-500 to-orange-400 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
                onClick={() => setShowSuccess(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Booking;
