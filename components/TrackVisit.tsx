"use client";

import { useEffect } from "react";

export default function TrackVisit() {
  useEffect(() => {
    const fetchVisit = async () => {
      try {
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
