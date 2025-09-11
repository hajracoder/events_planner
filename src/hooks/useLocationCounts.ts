// src/hooks/useDashboardCounts.ts
import { useEffect, useState } from "react";
import { databases, DATABASE_ID, COLLECTION_ID_USERS, COLLECTION_ID_LOCATIONS } from "../appwrite";

export function useUserCounts() {
  const [counts, setCounts] = useState({ total: 0, active: 0, inactive: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_USERS);

        const total = response.total;
        const active = response.documents.filter((doc) => doc.status === "active").length;
        const inactive = total - active;

        setCounts({ total, active, inactive });
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    }

    fetchData();
  }, []);

  return counts;
}

// export function useLocationCounts() {
//   const [counts, setCounts] = useState({ total: 0, active: 0, inactive: 0 });

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_LOCATIONS);

//         const total = response.total;
//         const active = response.documents.filter((doc) => doc.status === "active").length;
//         const inactive = total - active;

//         setCounts({ total, active, inactive });
//       } catch (error) {
//         console.error("Error fetching location counts:", error);
//       }
//     }

//     fetchData();
//   }, []);

//   return counts;
// }






// 👇 LOCATIONS COUNTS
export function useLocationCounts() {
  const [counts, setCounts] = useState({ total: 0, used: 0, unused: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID_LOCATIONS);
        const total = res.total;
        const used = res.documents.filter((doc) => doc.status === "Active").length;
        const unused = total - used;
        setCounts({ total, used, unused });
      } catch (err) {
        console.error("Location counts error:", err);
      }
    }
    fetchData();
  }, []);

  return counts;
}
