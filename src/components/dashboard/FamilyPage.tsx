import React, { useRef, useState } from "react";
import { ArrowLeft } from "lucide-react"; // ✅ icon import
import { motion } from "framer-motion";
type Props = {
  setActivePage: (page: string) => void;
};
 const FamilyGatheringPage: React.FC<Props> = ({ setActivePage }) =>  {
  // 🎵 Audio Player state
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="font-sans relative">
       <button
        onClick={() => setActivePage("Dashboard")}
        className=" fixed z-50 top-4 right-4 w-11 h-11 flex items-center justify-center
                   rounded-full bg-white hover:bg-gray-200 
                   text-blue-600 shadow-lg transition-all duration-300"
      >
        <ArrowLeft className="w-6 h-6" />
        </button>

      {/* 🎵 Floating Audio Player */}
      <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white/80 p-3 rounded-full shadow-md backdrop-blur-sm z-50">
        <button
          onClick={toggleAudio}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
        <iframe
  width="0"
  height="0"
  src="https://www.youtube.com/embed/pNGiTl_Tk8s?autoplay=1&loop=1&playlist=pNGiTl_Tk8s"
  title="YouTube Audio"
  allow="autoplay"
  style={{ display: "none" }}
></iframe>

      </div>

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
          src="https://www.pexels.com/download/video/4919748/" // video link
        />
        <div className="relative z-10 p-8 rounded text-center">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Welcome to Our Family Gathering
          </motion.h1>
          <motion.p
            className="text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Relax, Enjoy & Create Memories Together
          </motion.p>
        </div>
      </section>




      {/* Seating Gallery */}
      <section className="py-16 bg-gray-100">
        <motion.h2
          className="text-3xl font-semibold text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Tasty Snacks & Drinks with family
          
        </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
  {[
    "https://images.pexels.com/photos/8530483/pexels-photo-8530483.jpeg",
    "https://images.pexels.com/photos/248413/pexels-photo-248413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/33596881/pexels-photo-33596881.jpeg",
    "https://images.pexels.com/photos/8531229/pexels-photo-8531229.jpeg"
  ].map((img, idx) => (
    <motion.img
      key={idx}
      src={img}
      alt={`Seating ${idx + 1}`}
      className="rounded shadow-lg hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: idx * 0.2 }}
      viewport={{ once: true }}
    />
  ))}
</div>

      </section>

      {/* Food & Drinks */}
      <section className="py-16">
        <motion.h2
          className="text-3xl font-semibold text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Cozy Seating Spots
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
          {[ "https://images.pexels.com/photos/33640533/pexels-photo-33640533.jpeg",
    "https://images.pexels.com/photos/8531229/pexels-photo-8531229.jpeg",

          ].map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`Food ${idx + 1}`}
              className="rounded shadow-lg hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </section>

      {/* Activities */}
      {/* <section className="py-16 bg-gray-100">
        <motion.h2
          className="text-3xl font-semibold text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Fun Activities
        </motion.h2>
        <motion.p
          className="text-center text-lg px-6 md:px-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Enjoy light music, outdoor games, and relaxing corners to chat with family.
        </motion.p>
   </section> */}


   

<section className="py-16 bg-gradient-to-r from-pink-50 to-yellow-50 relative overflow-hidden">
  {/* Animated heading */}
  <motion.h2
    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 flex justify-center items-center gap-3 text-pink-600"
    initial={{ y: -30, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  >
    🎉 Fun Activities 🎈
  </motion.h2>

  {/* Paragraph */}
  <motion.p
    className="text-center text-base sm:text-lg md:text-xl px-4 sm:px-6 md:px-20 text-gray-700"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.3 }}
    viewport={{ once: true }}
  >
    Enjoy light music 🎵, outdoor games 🏸, creative art 🎨, and relaxing corners 🛋️ with your family.
  </motion.p>

  {/* Floating activity icons */}
  <div className="flex flex-wrap justify-center gap-6 mt-8">
    {["🏓", "🎯", "🎨", "🎶", "🥁", "🪁"].map((emoji, idx) => (
      <motion.div
        key={idx}
        className="text-4xl sm:text-5xl md:text-6xl cursor-pointer"
        initial={{ y: 0 }}
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 2 + idx * 0.3, ease: "easeInOut" }}
        whileHover={{ scale: 1.2, rotate: 10 }}
      >
        {emoji}
      </motion.div>
    ))}
  </div>

  {/* Floating Family Quotes */}
  {[
    "Family is where life begins and love never ends ❤️",
    "Happiness is homemade 👨‍👩‍👧‍👦",
    "Together is our favorite place to be 🏡",
    "Memories made together last forever 📸",
    "Love, laughter, and family—perfect combo 💖"
  ].map((quote, idx) => (
    <motion.p
      key={idx}
      className="absolute text-sm sm:text-base md:text-lg text-gray-400 font-semibold pointer-events-none"
      initial={{ x: "0%", y: "0%", opacity: 0 }}
      animate={{ 
        x: [0, Math.random() * 10 - 5, 0], 
        y: [0, Math.random() * 10 - 5, 0], 
        opacity: 1 
      }}
      transition={{ repeat: Infinity, repeatType: "mirror", duration: 6 + idx, delay: idx }}
      style={{
        top: `${10 + idx * 15}%`, // responsive spacing
        left: `${10 + idx * 15}%`,
      }}
    >
      {quote}
    </motion.p>
  ))}

  {/* Subtle floating background circles */}
  <motion.div
    className="absolute top-0 left-5 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 bg-pink-200 rounded-full opacity-20"
    animate={{ y: [0, 20, 0] }}
    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
  />
  <motion.div
    className="absolute bottom-5 right-5 w-32 sm:w-44 md:w-56 h-32 sm:h-44 md:h-56 bg-yellow-200 rounded-full opacity-20"
    animate={{ y: [0, -20, 0] }}
    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
  />
</section>


      {/* Booking Section */}
      <section className="py-16 text-center">
        <motion.h2
          className="text-3xl font-semibold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Reserve Your Spot
        </motion.h2>
        {/* Booking component */}
        <button
  onClick={() => setActivePage("Booking")}
  className="bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105 transform transition duration-300 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl"
>
  Book Now
</button>
      </section>
    </div>
  );
};

export default FamilyGatheringPage;
