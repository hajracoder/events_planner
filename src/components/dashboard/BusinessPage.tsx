// import { useState, useEffect } from "react";
// import bussiness from "../../assets/bussiness.jpg";
// import { Card, CardContent } from "../ui/card";

// const quotes = [
//   "“Great businesses are built on trust and vision 🥰”",
//   "“Innovation distinguishes between a leader and a follower.”",
//   "“Success in business starts with smart strategy and bold action.”",
//   "“Every big company was once a small idea executed well.”",
//   "“Good business creates value, great business creates impact.”",
// ];


// export default function BusinessPage({
//   setActivePage,
// }: {
//   setActivePage: (page: string) => void;
// }) {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
//     }, 3000); // 3 seconds
//     return () => clearInterval(interval);
//   }, []);

//   return (
//       <div className="p-6 space-y-8 relative">
//       {/* Top-right Close Button */}
//       <button
//         onClick={() => setActivePage("Dashboard")}
//         className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
//       >
//         ✖
//       </button>

//       {/* Top Button */}
    
//    <Card className="relative overflow-hidden rounded-2xl shadow-2xl">
//         <div className="absolute inset-0">
//           <img src={bussiness} alt="Wedding Hall" className="w-full h-full object-cover" />
//         </div>
//         <CardContent className="relative z-10 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-10 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
//           <h2 className="text-4xl font-bold text-white mb-8">
//           Empowering <span className="text-blue-400">Business Growth</span>
//         </h2>
//         <p
//           key={index}
//           className="text-2xl font-bold  text-white italic max-w-3xl mx-auto transition-opacity duration-700 ease-in-out"
//         >
//           {quotes[index]}
//         </p>
//         </CardContent>
//       </Card>
      

//       </div>
    
//   );
// }
















import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, Wifi, Projector, Coffee, ParkingCircle, Users } from "lucide-react";
import { ArrowLeft } from "lucide-react"; // ✅ icon import


type Props = {
  setActivePage: (page: string) => void;
};


 const BusinessPage: React.FC<Props> = ({ setActivePage }) =>{
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    people: "",
    menu: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking Submitted ✅\n
      Name: ${formData.name}\n
      Email: ${formData.email}\n
      Date: ${formData.date}\n
      People: ${formData.people}\n
      Menu: ${formData.menu}
    `);
    setFormData({ name: "", email: "", date: "", people: "", menu: "" });
  };

 

  return (
    <section className="bg-gray-50 min-h-screen text-gray-800">
      <button
        onClick={() => setActivePage("Dashboard")}
        className=" fixed z-50 top-4 right-4 w-11 h-11 flex items-center justify-center
                   rounded-full bg-white hover:bg-gray-200 
                   text-blue-600 shadow-lg transition-all duration-300"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>


      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80')",
        }}
      >
        <div className="bg-black/50 w-full h-full absolute"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Perfect Spaces for Your Business Meetings
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Comfortable, professional, and fully equipped spaces for your corporate needs.
          </p>
          <a href="#booking">
            <Button size="lg" className="rounded-2xl shadow-lg">
              Book Now
            </Button>
          </a>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Our Meeting Spaces</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <img
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
            alt="Boardroom"
            className="rounded-2xl shadow-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
            alt="Conference Hall"
            className="rounded-2xl shadow-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
            alt="Casual Meeting Space"
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Facilities Section */}
      <div className="bg-white py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Facilities We Provide</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="p-6 shadow rounded-2xl bg-gray-50">
            <Wifi className="mx-auto w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg">High-Speed WiFi</h3>
          </div>
          <div className="p-6 shadow rounded-2xl bg-gray-50">
            <Projector className="mx-auto w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg">Projector & Audio</h3>
          </div>
          <div className="p-6 shadow rounded-2xl bg-gray-50">
            <Coffee className="mx-auto w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg">Refreshments</h3>
          </div>
          <div className="p-6 shadow rounded-2xl bg-gray-50">
            <Users className="mx-auto w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg">Comfortable Seating</h3>
          </div>
          <div className="p-6 shadow rounded-2xl bg-gray-50">
            <ParkingCircle className="mx-auto w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg">Parking Facility</h3>
          </div>
          <div className="p-6 shadow rounded-2xl bg-gray-50">
            <Building2 className="mx-auto w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold text-lg">Air-conditioned Rooms</h3>
          </div>
        </div>
      </div>

   {/* Menu Section */}
<div className="py-12 px-6 max-w-6xl mx-auto text-center">
  <h2 className="text-3xl font-bold mb-8">Available Menus & Pricing</h2>
  <div className="grid md:grid-cols-4 gap-6">
    <div className="p-6 shadow rounded-2xl bg-gray-50">
      ☕ Tea & Snacks <br />
      <span className="text-blue-600 font-semibold">Rs. 500 / person</span>
    </div>
    <div className="p-6 shadow rounded-2xl bg-gray-50">
      🍴 Lunch <br />
      <span className="text-blue-600 font-semibold">Rs. 1,200 / person</span>
    </div>
    <div className="p-6 shadow rounded-2xl bg-gray-50">
      🍽 Dinner <br />
      <span className="text-blue-600 font-semibold">Rs. 1,800 / person</span>
    </div>
    <div className="p-6 shadow rounded-2xl bg-gray-50">
      🥤 Refreshments Only <br />
      <span className="text-blue-600 font-semibold">Rs. 300 / person</span>
    </div>
  </div>
</div>

{/* Booking Form (Dropdown Updated with Prices) */}
<select
  name="menu"
  value={formData.menu}
  onChange={handleChange}
  required
  className="w-full p-3 border rounded-lg"
>
  <option value="">Select Menu</option>
  <option value="Tea & Snacks - Rs. 500/person">Tea & Snacks - Rs. 500/person</option>
  <option value="Lunch - Rs. 1,200/person">Lunch - Rs. 1,200/person</option>
  <option value="Dinner - Rs. 1,800/person">Dinner - Rs. 1,800/person</option>
  <option value="Refreshments Only - Rs. 300/person">Refreshments Only - Rs. 300/person</option>
</select>

      {/* Booking Form Section */}
      <div id="booking" className="bg-gray-100 py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Book Your Meeting</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="number"
            name="people"
            placeholder="Number of People"
            value={formData.people}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <select
            name="menu"
            value={formData.menu}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Menu</option>
            <option value="Tea & Snacks">Tea & Snacks</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Refreshments Only">Refreshments Only</option>
          </select>
          <Button type="submit" className="w-full rounded-xl">
            Submit Booking
          </Button>
        </form>
      </div>

      {/* Contact Section */}
      <div className="py-12 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg mb-6">For bookings and inquiries, reach out to us at:</p>
        <p className="font-semibold">📍 123 Business Street, Faisalabad</p>
        <p>📞 +92 300 1234567</p>
        <p>✉️ info@eventplanner.com</p>
      </div>
    </section>
  );
};

export default BusinessPage;
