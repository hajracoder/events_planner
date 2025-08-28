


// import React, { useEffect, useRef, useState } from "react";



// type Props = { setActivePage: (page: string) => void };

// const Booking: React.FC<Props> = ({ }) => {

//   const [showBooking, setShowBooking] = useState(false);
//   const [booking, setBooking] = useState({
//     name: "",
//     email: "",
//     people: 1,
//     date: "",
//     table: "",
//     menu: [] as string[],
//   });
//   const closeBtnRef = useRef<HTMLButtonElement | null>(null);
// ;

//   // Focus modal close button
//   useEffect(() => { if (showBooking) closeBtnRef.current?.focus(); }, [showBooking]);

//   // Menu items
//   const MENU_ITEMS = [
//     { name: "Chicken Biryani", price: 500 },
//     { name: "Mutton Karahi", price: 700 },
//     { name: "Veg Platter", price: 300 },
//     { name: "Cold Drinks", price: 150 },
//     { name: "Fruit Salad", price: 200 },
//     { name: "Samosa", price: 50 },
//     { name: "Spring Roll", price: 70 },
//     { name: "Chocolate Cake", price: 250 },
//     { name: "Ice Cream", price: 120 },
//     { name: "Juice", price: 100 },
//     { name: "Shawarma", price: 350 },
//     { name: "Pasta", price: 400 },
//     { name: "Paneer Tikka", price: 450 },
//     { name: "Chicken Wings", price: 500 },
//     { name: "French Fries", price: 100 },
//     { name: "Pizza Slice", price: 300 },
//     { name: "Burger", price: 250 },
//     { name: "Hot Dog", price: 200 },
//     { name: "Mango Shake", price: 180 },
//     { name: "Lemonade", price: 120 },
//   ];

//   const TABLES = [
//     { name: "Table 1", price: 2500 },
//     { name: "Table 2", price: 3000 },
//     { name: "Table 3", price: 2800 },
//     { name: "Table 4", price: 3200 },
//     { name: "Table 5", price: 2600 },
//     { name: "Table 6", price: 3500 },
//   ];

//   const toggleMenuItem = (item: string) => {
//     setBooking((prev) => {
//       if (prev.menu.includes(item)) {
//         return { ...prev, menu: prev.menu.filter((i) => i !== item) };
//       } else {
//         return { ...prev, menu: [...prev.menu, item] };
//       }
//     });
//   };

//   const totalPrice = () => {
//     const tablePrice = TABLES.find((t) => t.name === booking.table)?.price || 0;
//     const menuPrice = booking.menu.reduce((sum, item) => {
//       const menuItem = MENU_ITEMS.find((m) => m.name === item);
//       return sum + (menuItem?.price || 0);
//     }, 0);
//     return tablePrice + menuPrice;
//   };

//   const onBookSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert(`Booking Confirmed!\nName: ${booking.name}\nTable: ${booking.table}\nMenu: ${booking.menu.join(", ")}\nTotal Price: Rs.${totalPrice()}`);
//     setShowBooking(false);
//     setBooking({ name: "", email: "", people: 1, date: "", table: "", menu: [] });
//   };

//   return (
//     <div className="min-h-full text-white">
     

//       {/* ---------- HERO ---------- */}
//       <section
//         className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
//         >
//         <div className="absolute inset-0 " />
//         <button
//           onClick={() => setShowBooking(true)}
//           className="relative z-10 bg-yellow-400 text-black font-semibold px-6 py-3 rounded-2xl hover:brightness-95 shadow"
//         >
//           Book Now
//         </button>
//       </section>

//       {/* ---------- BOOKING MODAL ---------- */}
//       {showBooking && (
//         <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
//           <div className="bg-white text-gray-900 w-full max-w-lg rounded-2xl p-6 shadow-2xl">
//             <div className="flex items-center justify-between mb-3">
//               <h3 className="text-xl font-bold">Booking Form</h3>
//               <button
//                 ref={closeBtnRef}
//                 onClick={() => setShowBooking(false)}
//                 className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
//               >
//                 Close
//               </button>
//             </div>
//             <form onSubmit={onBookSubmit} className="space-y-3">
//               <input
//                 className="w-full border rounded-xl px-4 py-2"
//                 placeholder="Your Name"
//                 value={booking.name}
//                 onChange={(e) => setBooking({ ...booking, name: e.target.value })}
//                 required
//               />
//               <input
//                 type="email"
//                 className="w-full border rounded-xl px-4 py-2"
//                 placeholder="Email"
//                 value={booking.email}
//                 onChange={(e) => setBooking({ ...booking, email: e.target.value })}
//                 required
//               />
//               <input
//                 type="number"
//                 className="w-full border rounded-xl px-4 py-2"
//                 placeholder="Number of People"
//                 min={1}
//                 value={booking.people}
//                 onChange={(e) => setBooking({ ...booking, people: Number(e.target.value) })}
//                 required
//               />
//               <input
//                 type="date"
//                 className="w-full border rounded-xl px-4 py-2"
//                 value={booking.date}
//                 onChange={(e) => setBooking({ ...booking, date: e.target.value })}
//                 required
//               />
//               {/* Menu selector */}
//               <div className="border rounded-xl p-3 max-h-64 overflow-y-auto">
//                 <p className="font-semibold mb-2">Select Menu Items:</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   {MENU_ITEMS.map((m) => (
//                     <button
//                       type="button"
//                       key={m.name}
//                       onClick={() => toggleMenuItem(m.name)}
//                       className={`px-2 py-1 rounded-lg border text-sm ${
//                         booking.menu.includes(m.name) ? "bg-green-400 text-white" : "bg-white/10 text-white"
//                       }`}
//                     >
//                       {m.name} - Rs.{m.price}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <p className="mt-2 font-bold text-lg">Total: Rs.{totalPrice()}</p>

//               <button
//                 type="submit"
//                 className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-xl"
//               >
//                 Confirm Booking
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;









import React, { useState } from "react";

type Props = {}; // no need for setActivePage

const Booking: React.FC<Props> = () => {
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    people: 1,
    date: "",
    table: "",
    menu: [] as string[],
  });

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
    { name: "Table 4", price: 3200 },
    { name: "Table 5", price: 2600 },
    { name: "Table 6", price: 3500 },
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
    return tablePrice + menuPrice;
  };

  const onBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Booking Confirmed!\nName: ${booking.name}\nTable: ${booking.table}\nMenu: ${booking.menu.join(
        ", "
      )}\nTotal Price: Rs.${totalPrice()}`
    );
    setBooking({ name: "", email: "", people: 1, date: "", table: "", menu: [] });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-4">
      <form
        onSubmit={onBookSubmit}
        className="bg-gray-800 p-6 rounded-2xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Book Your Table</h2>

        <input
          className="w-full border rounded-xl px-4 py-2 text-black"
          placeholder="Your Name"
          value={booking.name}
          onChange={(e) => setBooking({ ...booking, name: e.target.value })}
          required
        />
        <input
          type="email"
          className="w-full border rounded-xl px-4 py-2 text-black"
          placeholder="Email"
          value={booking.email}
          onChange={(e) => setBooking({ ...booking, email: e.target.value })}
          required
        />
        <input
          type="number"
          className="w-full border rounded-xl px-4 py-2 text-black"
          placeholder="Number of People"
          min={1}
          value={booking.people}
          onChange={(e) => setBooking({ ...booking, people: Number(e.target.value) })}
          required
        />
        <input
          type="date"
          className="w-full border rounded-xl px-4 py-2 text-black"
          value={booking.date}
          onChange={(e) => setBooking({ ...booking, date: e.target.value })}
          required
        />

        {/* Menu items */}
        <div className="border rounded-xl p-3 max-h-64 overflow-y-auto text-black">
          <p className="font-semibold mb-2">Select Menu Items:</p>
          <div className="grid grid-cols-2 gap-2">
            {MENU_ITEMS.map((m) => (
              <button
  type="button"
  key={m.name}
  onClick={() => toggleMenuItem(m.name)}
  className={`px-3 py-2 rounded-xl border font-medium text-sm transition-all duration-200 ${
    booking.menu.includes(m.name)
      ? "bg-green-500 text-white shadow-md transform scale-105"
      : "bg-white/10 text-white hover:bg-white/20"
  }`}
>
  {m.name} - Rs.{m.price}
</button>

            ))}
          </div>
        </div>

        <p className="mt-2 font-bold text-lg">Total: Rs.{totalPrice()}</p>

       <button
  type="submit"
  className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-black font-semibold px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
>
  Confirm Booking
</button>

      </form>
    </div>
  );
};

export default Booking;
