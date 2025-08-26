import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"



import { X } from "lucide-react";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
};

const events: Event[] = [
  {
    id: 1,
    title: "Birthday Party",
    description: "Join us for a fun-filled birthday celebration with music, food, and games!",
    date: "12th September 2025",
    location: "Sunshine Banquet Hall",
    image: "https://source.unsplash.com/400x250/?birthday,party"
  },
  {
    id: 2,
    title: "Music Concert",
    description: "Experience an electrifying evening of live music with top artists.",
    date: "18th September 2025",
    location: "City Arena, Downtown",
    image: "https://source.unsplash.com/400x250/?concert,music"
  },
  {
    id: 3,
    title: "Wedding Ceremony",
    description: "Celebrate the wedding of Sarah & Ahmed with family and friends.",
    date: "25th September 2025",
    location: "Royal Palace Garden",
    image: "https://source.unsplash.com/400x250/?wedding,celebration"
  }
];

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Upcoming Events
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card
            key={event.id}
            className="cursor-pointer hover:shadow-xl transition"
            onClick={() => setSelectedEvent(event)}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-40 object-cover rounded-t-2xl"
            />
            <CardContent className="p-4">
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {event.date} - {event.location}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-[90%] max-w-2xl relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={() => setSelectedEvent(null)}
            >
              <X size={20} />
            </button>

            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="w-full h-56 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{selectedEvent.title}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {selectedEvent.description}
              </p>
              <p className="text-sm text-gray-500">
                📅 {selectedEvent.date} | 📍 {selectedEvent.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
