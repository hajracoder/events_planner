export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

export const events: Event[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    description: "Explore the latest in AI, Web, and Cloud technologies.",
    date: "2025-09-10",
    location: "San Francisco, USA",
    image: "https://picsum.photos/400/200?random=1",
  },
  {
    id: "2",
    title: "Design Meetup",
    description: "Meet top designers and learn modern design trends.",
    date: "2025-09-15",
    location: "Berlin, Germany",
    image: "https://picsum.photos/400/200?random=2",
  },
  {
    id: "3",
    title: "Startup Pitch Night",
    description: "Watch startups pitch to top investors.",
    date: "2025-09-20",
    location: "London, UK",
    image: "https://picsum.photos/400/200?random=3",
  },
];
