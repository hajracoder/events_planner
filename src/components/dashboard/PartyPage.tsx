import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react"; // ✅ icon import


// --- Hero images (direct Unsplash links) ---
const HERO_IMAGES = [
  
  "https://media.istockphoto.com/id/2180253913/photo/excited-coworkers-embracing-each-other-during-a-celebration-in-the-office.jpg?s=1024x1024&w=is&k=20&c=FYQbcIvL-HcGNbte641td0-6V0vQ4XfrE42kMy_eV9s=",  "https://media.istockphoto.com/id/1458349885/photo/close-up-asian-chinese-friends-celebration-toasting-outdoor-dining.jpg?s=1024x1024&w=is&k=20&c=Ne8vjytlB-wwYJwql37-c9FYetXMCbw6YLEP4r38VBg=",
  "https://media.istockphoto.com/id/1458349917/photo/asian-chinese-friends-eating-outdoor-dining-social-gathering.jpg?s=1024x1024&w=is&k=20&c=-9baI0DL-owwza6G0GplGjXWn6b0uwOVJAq28it55ks=",
  "https://media.istockphoto.com/id/1458349686/photo/outdoor-dining-asian-chinese-friends-in-the-evening.jpg?s=1024x1024&w=is&k=20&c=ETA6ptbB_-Q_92VGF8fqfPZX6Ea9cuumY4HQFlxV34g=",
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
            "https://images.pexels.com/photos/2504969/pexels-photo-2504969.jpeg",
            "https://media.istockphoto.com/id/1445184056/photo/human-hand-adds-salt-to-the-steaks-on-the-barbecue.jpg?s=1024x1024&w=is&k=20&c=ThVy3iKKpVnVSKTXfiOUGFpADMHRdRVaprBsBqyS4jk=",
            "https://media.istockphoto.com/id/2154342544/photo/grill-on-the-festival.jpg?s=612x612&w=0&k=20&c=WT59KRAkqI1rpNIDkTu2ONCABf2-zvwcJJwCB1g8N-A=",
            "https://images.pexels.com/photos/6954059/pexels-photo-6954059.jpeg",
            "https://images.pexels.com/photos/27788271/pexels-photo-27788271.jpeg",
            "https://images.pexels.com/photos/9056972/pexels-photo-9056972.jpeg",
            "https://images.pexels.com/photos/995735/pexels-photo-995735.jpeg",
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
      {/* ---------- PHOTOGRAPHER SHOWCASE WITH FADE-IN HOVER ---------- */}
<section className="max-w-6xl mx-auto px-4 mt-12">
  <h2 className="text-2xl font-bold mb-4">📸 Our Photographers</h2>
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { name: "Ali Khan", src: "https://images.pexels.com/photos/4066531/pexels-photo-4066531.jpeg", portfolio: "https://instagram.com/alikhan" },
      { name: "Sara Ahmed", src: "https://images.pexels.com/photos/9182483/pexels-photo-9182483.jpeg", portfolio: "https://instagram.com/saraahmed" },
      { name: "Usman Riaz", src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80", portfolio: "https://instagram.com/usmanriaz" },
      { name: "Ayesha Malik", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", portfolio: "https://instagram.com/ayeshamalik" },
      { name: "Zain Ali", src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=400&q=80", portfolio: "https://instagram.com/zainali" },
      { name: "Fatima Noor", src: "https://images.pexels.com/photos/24245515/pexels-photo-24245515.jpeg", portfolio: "https://instagram.com/fatimanor" },
    ].map((photographer, i) => {
      const colors = ["bg-cyan-400", "bg-pink-400", "bg-green-400", "bg-purple-400", "bg-yellow-400", "bg-orange-400"];
      return (
        <div
          key={i}
          className={`relative flex flex-col items-center ${colors[i % colors.length]} rounded-2xl shadow-lg overflow-hidden group`}
        >
          <img
            src={photographer.src}
            alt={photographer.name}
            className="w-28 h-28 rounded-full object-cover mb-3 transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay for fade-in */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center space-y-2">
            <h3 className="text-white text-lg font-semibold">{photographer.name}</h3>
            <a
              href={photographer.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2 py-2 bg-blue-400 text-white rounded-lg text-sm hover:bg-blue-700 transition"
            >
              View Portfolio
            </a>
          </div>
        </div>
      );
    })}
  </div>
</section>



{/* ---------- Seating Section ---------- */}
<section className="max-w-6xl mx-auto px-4 mt-12">
  <h2 className="text-2xl font-bold mb-6">💺 Seating Arrangements</h2>
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[
      { name: "Table 1", img: "https://media.istockphoto.com/id/136323439/photo/interior-of-the-cafe.jpg?s=612x612&w=0&k=20&c=sFZFvEGff3keieMToTmZCdR8ngrqVhm7gT_0wtlHzcw=", price: "Rs. 2,500" },
      { name: "Table 2", img: "https://media.istockphoto.com/id/529927049/photo/european-restaurant-in-bright-colors.jpg?s=1024x1024&w=is&k=20&c=tEjUocNWhaY2CHLoHTsJc0EYKN6hi83LIgm2A01dKNw=", price: "Rs. 3,000" },
      { name: "Table 3", img: "https://media.istockphoto.com/id/1387926993/photo/restaurant-interior-part-of-hotel.jpg?s=612x612&w=0&k=20&c=0kdrFE4ObShQveLSlBxQN45e1jxxK3rKHdzeYyDnXX8=", price: "Rs. 2,800" },
      { name: "Table 4", img: "https://media.istockphoto.com/id/1168536940/photo/photo-of-restaurant-interior.jpg?s=1024x1024&w=is&k=20&c=P-jEn_wFu_G5m32zS82d2yXRL8jAp-U4rRsLnEonb3Q=", price: "Rs. 3,200" },
      { name: "Table 5", img: "https://media.istockphoto.com/id/1441581398/photo/birthday-party-decorated-room-a-cake-and-pink-balloons.jpg?s=612x612&w=0&k=20&c=SxY3nr8d_Sm0R_gR8XljfdcdifY--NyyxVo8INbBpRY=", price: "Rs. 2,600" },
      { name: "Table 6", img: "https://media.istockphoto.com/id/1839764643/photo/interior-of-stylish-italian-restaurant.jpg?s=612x612&w=0&k=20&c=pxyYLT_lmzqbfDXxdJGGbeyg6-t4fumUTaWzu1eawv0=", price: "Rs. 3,500" },
    ].map((table, i) => (
      <div
        key={i}
        className="relative flex flex-col items-center bg-gray-100 rounded-2xl shadow-lg overflow-hidden group hover:bg-gray-200 transition"
      >
        <img
          src={table.img}
          alt={table.name}
          className="w-full h-48 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold">{table.name}</h3>
          <p className="text-gray-600 text-sm">Seats 4-6 people</p>
          <p className="text-pink-500 font-bold mt-2">{table.price}</p>
          {/* ✅ Book Now button with setActivePage */}
          <button
  onClick={() => setActivePage("Booking")}
  className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105 transform transition duration-300 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl"
>
  Book Now
</button>

        </div>
      </div>
    ))}
  </div>
</section>


      <footer className="text-center text-sm opacity-60 py-10">
        Built with ❤️ for your party vibes.
      </footer>
    </div>
  );
};

export default PartyPage;
