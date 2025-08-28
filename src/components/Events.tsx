// import eng from "../../assets/eng.jpg";
// import bussiness from "../../assets/bussiness.jpg";
// import family from "../../assets/family.jpg";
// import party from "../../assets/party.jpg";
// import wedding1 from "../../assets/wedding1.jpg";

// interface EventCard {
//   title: string;
//   description: string;
//   image: string;
//   page: string; // 👈 direct page ka naam store karenge
// }

// const events: EventCard[] = [
//   { title: "Engagement Parties", description: "Celebrate your engagement in style...", image: eng, page: "Engagement" },
//   { title: "Birthday Celebrations", description: "Fun-filled birthdays with cakes, balloons & music...", image: party, page: "Birthday" },
//   { title: "Parties & Get-Togethers", description: "Casual gatherings & fun hangouts with friends...", image: party, page: "Party" },
//   { title: "Board Meetings & Conferences", description: "Professional business meetings & corporate events...", image: bussiness, page: "Business" },
//   { title: "Family Reunions", description: "Reconnect with your family & create lifetime memories...", image: family, page: "Family" },
//   { title: "Weddings & Marriage Events", description: "Plan your perfect wedding with decor, food & music...", image: wedding1, page: "Wedding" },
// ];

// export default function Events({ setActivePage }: { setActivePage: (page: string) => void }) {
//   return (
//     <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
//         Events
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {events.map((event) => (
//           <div
//             key={event.title}
//             onClick={() => setActivePage(event.page)} // 👈 direct use karenge
//             className="relative rounded-2xl shadow-2xl overflow-hidden cursor-pointer group transform transition-all duration-300"
//           >
//             <img
//               src={event.image}
//               alt={event.title}
//               className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />

//             {/* Overlay */}
//             <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-6 text-center">
//               <h3 className="text-2xl font-extrabold text-white mb-2">
//                 {event.title}
//               </h3>
//               <p className="text-white text-sm">
//                 {event.description.length > 80
//                   ? event.description.slice(0, 80) + "..."
//                   : event.description}
//               </p>
//             </div>

//             {/* Card Bottom */}
//             <div className="p-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-700 dark:to-gray-800">
//               <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-pink-400">
//                 {event.title}
//               </h3>
//               <p className="text-gray-700 dark:text-gray-300 text-sm">
//                 {event.description.length > 100
//                   ? event.description.slice(0, 100) + "..."
//                   : event.description}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
