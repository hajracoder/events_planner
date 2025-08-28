export default function FamilyPage({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <div className="p-10 text-center">
      <button
        onClick={() => setActivePage("Dashboard")}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        ⬅ Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold text-green-600">Family Reunions</h1>
      <p className="mt-4 text-lg text-gray-600">
        Reconnect with loved ones with food, fun activities & memories ❤️
      </p>


              <button
  onClick={() => setActivePage("Booking")}
  className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105 transform transition duration-300 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl"
>
  Book Now
</button>
    </div>
  );
}
