// src/services/eventsService.ts
import { databases, appwriteConfig } from "../components/lib/appwriteClient";
// src/services/eventsService.ts
import type { Event } from "@/data/eventsData";



// ✅ Create Event
export const createEvent = async (event: Event) => {
  return await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collectionEvents,
    "unique()", // Appwrite apne aap ID generate karega
    event       // yahan "event" object dena hai, "Event" type nahi
  );
};

// ✅ Get All Events
export const getEvents = async (): Promise<Event[]> => {
  const res = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.collectionEvents
  );
  return res.documents as unknown as Event[];
};

// ✅ Update Event
export const updateEvent = async (id: string, event: Partial<Event>) => {
  return await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collectionEvents,
    id,
    event
  );
};

// ✅ Delete Event
export const deleteEvent = async (id: string) => {
  return await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.collectionEvents,
    id
  );
};
