// export default function PartyPage({ setActivePage }: { setActivePage: (page: string) => void }) {
//   return (
//     <div className="p-10 text-center">
//       <button
//         onClick={() => setActivePage("Dashboard")}
//         className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
//       >
//         ⬅ Back to Dashboard
//       </button>

//       <h1 className="text-4xl font-bold text-indigo-600">Parties & Get-Togethers</h1>
//       <p className="mt-4 text-lg text-gray-600">
//         From casual hangouts to grand parties – we arrange everything 🥳
//       </p>
//     </div>
//   );
// }

// src/components/PartyPage.tsx


// src/components/PartyPage.tsx
import React, { useEffect, useRef, useState } from "react";
import { ArrowLeft } from "lucide-react"; // ✅ icon import

// --- Hero images (direct Unsplash links) ---
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=1600&q=80",
];

// Little debounce hook (smooth search typing)
function useDebounce<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

type YTItem = {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { medium?: { url: string } };
  };
};
type Props = {
  setActivePage: (page: string) => void;
};

 const PartyPage: React.FC<Props> = ({ setActivePage }) => {
  // ---------- Hero slideshow ----------
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % HERO_IMAGES.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  // ---------- Booking modal ----------
  const [showBooking, setShowBooking] = useState(false);
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    people: "",
    date: "",
  });
  const onBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: yahan Appwrite/Firebase se connect kar sakti ho
    alert(`🎉 Booking confirmed for ${booking.name}!`);
    setShowBooking(false);
    setBooking({ name: "", email: "", people: "", date: "" });
  };

  // ---------- Music: YouTube Search + Player ----------
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);
  const [results, setResults] = useState<YTItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);

  const YT_KEY = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;

  useEffect(() => {
    const search = async () => {
      if (!debouncedQuery?.trim()) {
        setResults([]);
        return;
      }
      if (!YT_KEY) {
        console.warn("Missing VITE_YOUTUBE_API_KEY in .env");
        return;
      }
      try {
        setLoading(true);
        const url = new URL("https://www.googleapis.com/youtube/v3/search");
        url.searchParams.set("part", "snippet");
        url.searchParams.set("type", "video");
        url.searchParams.set("maxResults", "10");
        url.searchParams.set("q", debouncedQuery);
        url.searchParams.set("key", YT_KEY);

        const res = await fetch(url.toString());
        const data = await res.json();
        setResults(data.items ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    search();
  }, [debouncedQuery, YT_KEY]);
  // Accessibility: focus mana\ement when modal opens
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    if (showBooking) {
      closeBtnRef.current?.focus();
    }
  }, [showBooking]);
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      <button
        onClick={() => setActivePage("Dashboard")}
        className=" fixed z-50 top-4 right-4 w-11 h-11 flex items-center justify-center
                   rounded-full bg-white hover:bg-gray-200 
                   text-blue-600 shadow-lg transition-all duration-300"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>




      {/* ---------- HERO ---------- */}
      <section
        className="relative h-[70vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${HERO_IMAGES[slide]})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center px-6">
    <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow">
            🎉 Welcome to the Party
          </h1>
          <p className="mt-3 opacity-90">
            Music • Food • Comfort • Good Vibes
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowBooking(true)}
              className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-2xl hover:brightness-95 shadow"
            >
              Book Now
            </button>
            <a
              href="#music"
              className="px-6 py-3 rounded-2xl border border-white/30 hover:bg-white/10"
            >
              Choose Your Song
            </a>
          </div>
        </div>
      </section>

      {/* ---------- EVENT INFO ---------- */}
      <section className="max-w-6xl mx-auto px-4 mt-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="font-semibold text-lg">Date</h3>
            <p className="opacity-80">Any day • Your event</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="font-semibold text-lg">Location</h3>
            <p className="opacity-80">Your Venue • Our Vibes</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-5 backdrop-blur-sm">
            <h3 className="font-semibold text-lg">Comfort</h3>
            <p className="opacity-80">Cozy seating • AC • Lights</p>
          </div>
        </div>
      </section>

      {/* ---------- MUSIC SEARCH + PLAYER ---------- */}
      <section id="music" className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-3">🎶 Choose your song</h2>
        <p className="opacity-80 mb-4 text-sm">
          Search any song / singer. Click a result to play instantly.
        </p>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search on YouTube… (e.g., Atif Aslam, dance mix, lo-fi)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white text-black rounded-xl px-4 py-3 outline-none"
          />
          {/* Optional: clear button */}
          {query && (
            <button
              onClick={() => setQuery("")}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20"
              title="Clear"
            >
              ✖
            </button>
          )}
        </div>

        {/* Results */}
        <div className="mt-6">
          {loading && <div className="opacity-70">Searching…</div>}

          {!loading && results.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((item) => {
                const vid = item.id?.videoId;
                const thumb =
                  item.snippet.thumbnails.medium?.url ??
                  "https://via.placeholder.com/320x180?text=No+Image";
                return (
                  <button
                    key={vid}
                    onClick={() => setCurrentVideoId(vid)}
                    className="group text-left bg-white/5 rounded-2xl overflow-hidden hover:bg-white/10 transition"
                    title={item.snippet.title}
                  >
                    <img
                      src={thumb}
                      alt={item.snippet.title}
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                    />
                    <div className="p-3">
                      <div className="line-clamp-2 font-medium group-hover:underline">
                        {item.snippet.title}
                      </div>
                      <div className="text-xs opacity-70 mt-1">
                        {item.snippet.channelTitle}
                      </div>
                      <div className="mt-2 text-sm opacity-90">▶ Play</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {!loading && debouncedQuery && results.length === 0 && (
            <div className="opacity-70">No results. Try another query.</div>
          )}
        </div>

        {/* Player */}
        <div className="mt-8">
          {currentVideoId ? (
            <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden bg-black/50 mx-auto">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
                title="YouTube player"
                allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="text-center opacity-80">
              Select a song to start playing.
            </div>
          )}
        </div>
      </section>

      {/* ---------- SIMPLE MENU / GALLERY (optional visuals) ---------- */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold mb-4">🍽️ Menu & Drinks</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=60",
            "https://images.unsplash.com/photo-1543307660-6b1f6f0be31d?auto=format&fit=crop&w=800&q=60",
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-full h-48 object-cover rounded-2xl hover:scale-[1.02] transition"
              alt="menu"
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* ---------- BOOKING ---------- */}
      <section className="flex justify-center my-14 px-4">
        <button
          onClick={() => setShowBooking(true)}
          className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-2xl"
        >
          Book Now
        </button>
      </section>

      {/* ---------- BOOKING MODAL ---------- */}
      {showBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 w-full max-w-md rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold">Booking Form</h3>
              <button
                ref={closeBtnRef}
                onClick={() => setShowBooking(false)}
                className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                Close
              </button>
            </div>
            <form onSubmit={onBookSubmit} className="space-y-3">
              <input
                className="w-full border rounded-xl px-4 py-2"
                placeholder="Your Name"
                value={booking.name}
                onChange={(e) => setBooking({ ...booking, name: e.target.value })}
                required
              />
              <input
                type="email"
                className="w-full border rounded-xl px-4 py-2"
                placeholder="Email"
                value={booking.email}
                onChange={(e) => setBooking({ ...booking, email: e.target.value })}
                required
              />
              <input
                type="number"
                className="w-full border rounded-xl px-4 py-2"
                placeholder="Number of People"
                min={1}
                value={booking.people}
                onChange={(e) => setBooking({ ...booking, people: e.target.value })}
                required
              />
              <input
                type="date"
                className="w-full border rounded-xl px-4 py-2"
                value={booking.date}
                onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                required
              />
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold px-4 py-2 rounded-xl"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

      <footer className="text-center text-sm opacity-60 py-10">
        Built with ❤️ for your party vibes.
      </footer>
    </div>
  );
};

export default PartyPage;
