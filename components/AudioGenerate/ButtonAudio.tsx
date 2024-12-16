"use client";
import React, { useState } from "react";

const AudioButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("Hello havent been set");

  const handlePlayAudio = async (description: string) => {
    setIsLoading(true);
    try {
      const request = await fetch("/api/generateAudio");

      if (!request.ok) {
        throw new Error("Failed to fetch audio");
      }

      const data = await request.json();

      if (data.success) {
        console.log(audioUrl);
        setAudioUrl(data.message);
        console.log("Message:", data.message);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error generating audio:", error);
      alert("Could not generate audio. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => handlePlayAudio("Hello World")}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Play Audio"}
      </button>
      <p>{audioUrl}</p>
    </div>
  );
};

export default AudioButton;
