// src/hooks/useDashboardCounts.ts
import { useEffect, useState } from "react";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID_USERS,
  COLLECTION_ID_LOCATIONS,
  COLLECTION_ID_MAIN_EVENT, // ✅ appwrite.ts me define karke yahan import
} from "../appwrite";
import { Query } from "appwrite";

// 👇 USERS COUNTS
export function useUserCounts() {
  const [counts, setCounts] = useState({ total: 0, active: 0, inactive: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_USERS
        );
        const total = res.total;
        const active = res.documents.filter((doc) => doc.status === "Active")
          .length;
        const inactive = total - active;
        setCounts({ total, active, inactive });
      } catch (err) {
        console.error("User counts error:", err);
      }
    }
    fetchData();
  }, []);

  return counts;
}

// 👇 LOCATIONS COUNTS
export function useLocationCounts() {
  const [counts, setCounts] = useState({ total: 0, active: 0, inactive: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_LOCATIONS
        );
        const total = res.total;
        const active = res.documents.filter((doc) => doc.status === "Active")
          .length;
        const inactive = total - active;
        setCounts({ total, active, inactive });
      } catch (err) {
        console.error("Location counts error:", err);
      }
    }
    fetchData();
  }, []);

  return counts;
}

// 👇 EVENTS COUNTS
export function useEventCounts() {
  const [counts, setCounts] = useState({
    total: 0,
    upcoming: 0,
    ongoing: 0,
    completed: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        // Total Events
        const totalRes = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_MAIN_EVENT
        );

        // Upcoming
        const upcomingRes = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_MAIN_EVENT,
          [Query.equal("status", "Upcoming")]
        );

        // Ongoing
        const ongoingRes = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_MAIN_EVENT,
          [Query.equal("status", "Ongoing")]
        );

        // Completed
        const completedRes = await databases.listDocuments(
          DATABASE_ID,
          COLLECTION_ID_MAIN_EVENT,
          [Query.equal("status", "Completed")]
        );

        setCounts({
          total: totalRes.total,
          upcoming: upcomingRes.total,
          ongoing: ongoingRes.total,
          completed: completedRes.total,
        });
      } catch (error) {
        console.error("Error fetching event counts:", error);
      }
    }

    fetchCounts();
  }, []);

  return counts;
}
