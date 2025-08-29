import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import eng from "../../assets/eng3.webp"

type Props = {
  setActivePage: (page: string) => void;
};
const EngagementPage: React.FC<Props> = ({ setActivePage }) => {
  const [rsvp, setRsvp] = useState({
    name: "",
    email: "",
    guests: 1,
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  

  // Countdown Timer
  const onRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const hearts = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="relative font-sans overflow-x-hidden">
      {/* Back Button */}
      <button
        onClick={() => setActivePage("Dashboard")}
        className="fixed top-4 right-4 z-50 w-11 h-11 flex items-center justify-center rounded-full bg-white hover:bg-gray-200 text-pink-600 shadow-lg transition"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

           <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-white/80 p-3 rounded-full shadow-md backdrop-blur-sm z-50">


      </div>
      {/* Hero Section */}
  <section
  className="relative h-screen flex items-center justify-center m-4 rounded-2xl text-white overflow-hidden bg-cover bg-center"
  style={{ backgroundImage: `url(${eng})` }}
>
  {/* Floating Hearts */}
  {hearts.map((h) => (
    <motion.div
      key={h}
      className="absolute text-pink-400 text-2xl"
      style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
      animate={{ y: [0, -200, 0], x: [0, 50, -50, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 3 }}
    >
      ❤️
    </motion.div>
  ))}

  {/* Sparkles / Glitter */}
  {Array.from({ length: 30 }).map((_, i) => (
    <motion.div
      key={`sparkle-${i}`}
      className="absolute w-1 h-1 bg-yellow-200 rounded-full shadow-lg"
      style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
      animate={{
        y: [0, -50, 0],
        x: [0, 30, -30, 0],
        opacity: [0, 1, 0.5, 0]
      }}
      transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
    />
  ))}

  <div className="relative z-10 p-8 text-center">
    <motion.h1
      className="text-5xl md:text-6xl font-bold mb-4 text-pink-400"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      💍 Engagement Celebration 💖
    </motion.h1>
    <motion.p
      className="text-xl md:text-2xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      Join us in this magical journey of love & togetherness
    </motion.p>
  </div>
</section>

      {/* memories  */}
   <section className="py-16 bg-gradient-to-r from-pink-50 to-yellow-50 text-center relative overflow-hidden">
  {/* Floating Hearts */}
  {Array.from({ length: 12 }, (_, i) => (
    <motion.div
      key={`heart-${i}`}
      className="absolute text-pink-300 text-2xl"
      style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
      animate={{ y: [0, -150, 0], x: [0, 50, -50, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
    >
      ❤️
    </motion.div>
  ))}

  {/* Confetti */}
  {Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={`confetti-${i}`}
      className="absolute w-2 h-2 bg-pink-400 rounded-full"
      style={{ left: `${Math.random() * 100}%` }}
      animate={{ y: [0, 300, 0], rotate: [0, 360] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
    />
  ))}

  <motion.h2
    className="text-4xl font-bold mb-12 text-pink-600 z-10 relative"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    Our Memories💕
  </motion.h2>

  <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 z-10 relative">
    {/* Step 1 */}
    <motion.div
      className="bg-white/30 backdrop-blur-md p-6 rounded-2xl flex-1 shadow-lg"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h3 className="text-2xl font-semibold text-pink-500 mb-2">First Meet</h3>
      <p className="text-gray-800">We met at a lovely cafe, and our journey began. ☕❤️</p>
    </motion.div>

    {/* Step 2 */}
    <motion.div
      className="bg-white/30 backdrop-blur-md p-6 rounded-2xl flex-1 shadow-lg"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <h3 className="text-2xl font-semibold text-pink-500 mb-2">First Date</h3>
      <p className="text-gray-800">A magical evening under the stars ✨🌙</p>
    </motion.div>

    {/* Step 3 */}
    <motion.div
      className="bg-white/30 backdrop-blur-md p-6 rounded-2xl flex-1 shadow-lg"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <h3 className="text-2xl font-semibold text-pink-500 mb-2">The Proposal</h3>
      <p className="text-gray-800">A heartwarming proposal 💍 filled with love and joy!</p>
    </motion.div>

    {/* Step 4 */}
    <motion.div
      className="bg-white/30 backdrop-blur-md p-6 rounded-2xl flex-1 shadow-lg"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.9 }}
    >
      <h3 className="text-2xl font-semibold text-pink-500 mb-2">Engagement Day</h3>
      <p className="text-gray-800">Celebrating love, laughter, and forever together 💖🥂</p>
    </motion.div>
  </div>
</section>


      {/* Gallery Section */}
      <section className="py-16 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
"https://media.istockphoto.com/id/1220427013/photo/a-man-takes-off-a-wedding-ring-from-a-finger-of-his-hand.jpg?s=612x612&w=0&k=20&c=hG2vT1DGtgo-0WdsvNBJDjeKnfKDhurHjDvNnUfzUE0=",
         "https://media.istockphoto.com/id/1273006495/photo/bride-and-groom-hands-with-wedding-rings.jpg?s=612x612&w=0&k=20&c=_fZGaKqjgGfX_urxUZQTxkhv07ms_-nQSgdyQwH5iqM= ",
         "https://media.istockphoto.com/id/1264698878/photo/engagement-couple-holding-hands-and-sitting-on-the-bench.jpg?s=612x612&w=0&k=20&c=OzFpciOEVBL24wvLD5n8VC625YQLeCezjNn9TPrxR8M=",
         " https://media.istockphoto.com/id/832018104/photo/wedding-ring.jpg?s=612x612&w=0&k=20&c=lDo_L0gvsh8g2eM3JR74TXcAABaC_afEOP1YYG6IOqc="
        ].map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`Couple ${idx + 1}`}
            className="rounded shadow-lg hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
          />
        ))}
      </section>



{/* Seating Section */}
<section className="py-16 bg-gradient-to-r from-purple-100 to-pink-100 text-center">
  <motion.h2
    className="text-4xl font-bold mb-10 text-purple-700"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    Choose Your Seating 🍽️
  </motion.h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6">
    {[
      { price: 25000, capacity: 30, img: "https://media.istockphoto.com/id/2176848760/photo/interior-of-a-wedding-hall-decorated-with-flowers-and-greenery-white-theme.jpg?s=612x612&w=0&k=20&c=lYOvkwXpILQOawaB8oiWlcSEnhZ4OLtqmFj4REPM58Y=" },
      { price: 30000, capacity: 40, img: "https://media.istockphoto.com/id/2189672986/photo/wedding-blessing-backdrop-featuring-a-beautifully-arranged-table-chairs-and-a-podium.jpg?s=612x612&w=0&k=20&c=qnzvpGwGIwhk82Hlfv2nqGhr5ifgBpIFejO1LMqfHqs=" },
      { price: 28000, capacity: 50, img: "https://media.istockphoto.com/id/2186821376/photo/decorated-interior-for-festive-event-fancy-table-set-for-dinner-with-white-flower-composition.jpg?s=1024x1024&w=is&k=20&c=ZBcV976-Mn9oBDi64zaT52zag_V03CwfpyRl8NQzT64="},
      { price: 32000, capacity: 60, img: "https://media.istockphoto.com/id/1074273008/photo/wedding-table-sets-in-wedding-hall-wedding-decorate-preparation.jpg?s=612x612&w=0&k=20&c=xtBFAonmjzWRDxTywhPpC-D6cUXFkaWsn8YEbB_rnAE=" },
      { price: 36000, capacity: 40,  img: "https://media.istockphoto.com/id/1402359334/photo/banquet-table-with-wedding-and-festive-serving-wedding-birthday-party-event-concept.jpg?s=612x612&w=0&k=20&c=_fKXeJSJDTTxizecSYkJEX0pN-ne9yqmWx6sfYRQ7uM="},
      { price: 35000, capacity: 30, img:"https://media.istockphoto.com/id/2196448003/photo/indian-wedding-interiors-and-decorations.jpg?s=612x612&w=0&k=20&c=giJz4aJJrae34r9S5Rs5krRdPtxRPHFVNPf5jumSs7o=", },
    ].map((table, idx) => (
      <motion.div
        key={idx}
        className="rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: idx * 0.2 }}
      >
        {/* Background image */}
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${table.img})` }}
        ></div>

        {/* Gradient content */}
        <div className="bg-gradient-to-r from-pink-200 via-purple-100 to-pink-200 p-6 text-gray-800">
          <h3 className="text-2xl font-bold mb-2 text-purple-700">Luxury Table</h3>
          <p className="text-lg mb-2">Capacity: {table.capacity} people</p>
          <p className="text-lg font-semibold mb-4">Price: Rs.{table.price}</p>
          <button
            onClick={() => setActivePage("Booking")}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</section>




      {/* RSVP Section */}
      <section className="py-16 flex justify-center">
        <motion.form
          onSubmit={onRsvpSubmit}
          className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-4 shadow-2xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-pink-600">
            RSVP 💌
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="w-full border rounded-xl px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-pink-400 transition"
              placeholder="Your Name"
              value={rsvp.name}
              onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
              required
            />
            <input
              type="email"
              className="w-full border rounded-xl px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-pink-400 transition"
              placeholder="Email"
              value={rsvp.email}
              onChange={(e) => setRsvp({ ...rsvp, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="number"
              className="w-full border rounded-xl px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-pink-400 transition"
              placeholder="Number of Guests"
              min={1}
              value={rsvp.guests}
              onChange={(e) => setRsvp({ ...rsvp, guests: Number(e.target.value) })}
              required
            />
            <input
              type="text"
              className="w-full border rounded-xl px-4 py-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-pink-400 transition"
              placeholder="Message (Optional)"
              value={rsvp.message}
              onChange={(e) => setRsvp({ ...rsvp, message: e.target.value })}
            />
          </div>

          <motion.button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-black font-semibold px-4 py-3 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send RSVP
          </motion.button>
        </motion.form>
      </section>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-6xl mb-4">💖</div>
              <h2 className="text-2xl font-bold mb-2">RSVP Confirmed!</h2>
              <p className="mb-4">
                Guests: {rsvp.guests} <br />
                Message: {rsvp.message || "None"}
              </p>
              <button
                className="bg-gradient-to-r from-pink-500 to-orange-400 px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
                onClick={() => setShowSuccess(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EngagementPage;
