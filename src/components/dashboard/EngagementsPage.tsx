export default function EngagementPage({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <div className="p-10 text-center">
      <button
        onClick={() => setActivePage("Dashboard")}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        ⬅ Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold text-pink-600">Engagement Party</h1>
      <p className="mt-4 text-lg text-gray-600">
        Celebrate your engagement with style 🎉. Full decoration, catering & memorable setups.
      </p>
    </div>
  );
}
