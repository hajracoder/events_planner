export default function PartyPage({ setActivePage }: { setActivePage: (page: string) => void }) {
  return (
    <div className="p-10 text-center">
      <button
        onClick={() => setActivePage("Dashboard")}
        className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
      >
        ⬅ Back to Dashboard
      </button>

      <h1 className="text-4xl font-bold text-indigo-600">Parties & Get-Togethers</h1>
      <p className="mt-4 text-lg text-gray-600">
        From casual hangouts to grand parties – we arrange everything 🥳
      </p>
    </div>
  );
}
