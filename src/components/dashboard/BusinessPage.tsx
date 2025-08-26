export default function BusinessPage({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <div className="p-10 text-center">
      <button
        onClick={() => setActivePage("Dashboard")}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        ⬅ Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold text-blue-600">Board Meetings & Conferences</h1>
      <p className="mt-4 text-lg text-gray-600">
        Professional setups with AV system, refreshments & smooth event management 💼
      </p>
    </div>
  );
}
