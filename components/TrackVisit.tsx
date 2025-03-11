"use client";

import { useEffect } from "react";

export default function TrackVisit() {
  useEffect(() => {
    const fetchVisit = async () => {
      try {
        // const lastVisit = document.cookie
        //   .split("; ")
        //   .find((row) => row.startsWith("lastVisit="))
        //   ?.split("=")[1];
        // // Uncomment the following block to track visits every 30 minute, i decided to comment it to get more usersVisits data
        // if (lastVisit) {
        //   const lastVisitDate = new Date(lastVisit);
        //   const now = new Date();
        //   const diffInMinutes =
        //     (now.getTime() - lastVisitDate.getTime()) / 1000 / 60;

        //   if (diffInMinutes <= 30) {
        //     console.log("Visit tracked recently, skipping fetch.");
        //     return;
        //   }
        // }
        const response = await fetch("/api/store-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: new Date().toISOString() }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // document.cookie = `lastVisit=${today}; path=/; max-age=1800`; // 30 min expiration
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    fetchVisit();
  }, []);

  return null;
}
