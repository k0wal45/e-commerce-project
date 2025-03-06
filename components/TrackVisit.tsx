"use client";

import { useEffect } from "react";

export default function TrackVisit() {
  useEffect(() => {
    const lastVisit = document.cookie.replace(
      /(?:(?:^|.*;\s*)lastVisit\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    const now = Date.now();

    if (!lastVisit || now - parseInt(lastVisit) > 30 * 60 * 1000) {
      // 30 minutes
      fetch("/api/track-visit");
      document.cookie = `lastVisit=${now}; path=/; max-age=1800`; // 30 min expiration
    }
  }, []);

  return null;
}
