export default function BirthdayPage({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <div className="p-10 text-center">
      <button
        onClick={() => setActivePage("Dashboard")}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        ⬅ Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold text-purple-600">Birthday Celebration</h1>
      <p className="mt-4 text-lg text-gray-600">
        Fun-filled birthday themes, custom cakes & unforgettable parties 🎂🎈
      </p>
    </div>
  );
}
