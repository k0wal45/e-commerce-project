"use client";

import { useEffect } from "react";

export default function TrackVisit() {
  useEffect(() => {
    const fetchVisit = async () => {
      console.log("Tracking visit...");
      try {
        const today = new Date().toISOString();
        const lastVisit = document.cookie
          .split("; ")
          .find((row) => row.startsWith("lastVisit="))
          ?.split("=")[1];

        if (lastVisit) {
          const lastVisitDate = new Date(lastVisit);
          const now = new Date();
          const diffInMinutes =
            (now.getTime() - lastVisitDate.getTime()) / 1000 / 60;

          if (diffInMinutes <= 30) {
            console.log("Visit tracked recently, skipping fetch.");
            return;
          }
        }
        const response = await fetch("/api/store-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ date: new Date().toISOString() }),
        });

        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        document.cookie = `lastVisit=${today}; path=/; max-age=1800`; // 30 min expiration
      } catch (error) {
        console.error("Error tracking visit:", error);
      }
    };

    fetchVisit();
  }, []);

  return null;
}
