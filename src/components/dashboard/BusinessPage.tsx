import { useState, useEffect } from "react";
import bussiness from "../../assets/bussiness.jpg";
import { Card, CardContent } from "../ui/card";

const quotes = [
  "“Great businesses are built on trust and vision.”",
  "“Innovation distinguishes between a leader and a follower.”",
  "“Success in business starts with smart strategy and bold action.”",
  "“Every big company was once a small idea executed well.”",
  "“Good business creates value, great business creates impact.”",
];

export default function BusinessPage({
  setActivePage,
}: {
  setActivePage: (page: string) => void;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
      <div className="p-6 space-y-8 relative">
      {/* Top-right Close Button */}
      <button
        onClick={() => setActivePage("Dashboard")}
        className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-400 text-white text-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
      >
        ✖
      </button>

      {/* Top Button */}
    
   <Card className="relative overflow-hidden rounded-2xl shadow-2xl">
        <div className="absolute inset-0">
          <img src={bussiness} alt="Wedding Hall" className="w-full h-full object-cover" />
        </div>
        <CardContent className="relative z-10 flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-10 min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
          <h2 className="text-4xl font-bold text-white mb-8">
          Empowering <span className="text-blue-400">Business Growth</span>
        </h2>
        <p
          key={index}
          className="text-xl  text-white italic max-w-3xl mx-auto transition-opacity duration-700 ease-in-out"
        >
          {quotes[index]}
        </p>
        </CardContent>
      </Card>
      </div>
    
  );
}
