// app/page.tsx
"use client";
import { useState } from "react";

export default function Home() {
  const [storyIdea, setStoryIdea] = useState("");
  const [story, setStory] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("storyIdea", storyIdea);

    try {
      const response = await fetch("/api/spooky-story", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to fetch story and audio");

      const data = await response.json();
      setStory(data.story);
      setAudioUrl(data.audioUrl);
    } catch (err) {
      setError("Something went wrong while generating the story and audio.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <h1>Generate a Spooky Story with Audio</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={storyIdea}
          onChange={(e) => setStoryIdea(e.target.value)}
          placeholder="Enter a spooky story idea"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Story"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {story && (
        <div>
          <h2>Your Spooky Story</h2>
          <p>{story}</p>
          {audioUrl && (
            <audio controls>
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      )}
    </main>
  );
}
