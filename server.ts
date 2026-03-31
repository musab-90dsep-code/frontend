import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { teachers } from "./src/data/teacher.ts";

// In-memory store for demonstration purposes
let contentStore = {
  teachers,
  notices: [
    { title: 'Eid-ul-Fitr Holidays Announcement', date: 'March 15, 2026', content: 'The Madrasa will be closed for Eid-ul-Fitr holidays from March 15th to March 20th. Classes will resume on March 21st.' },
    { title: 'Mid-Term Examination Schedule', date: 'March 10, 2026', content: 'Mid-term examinations will commence on March 10th. Please check the notice board for the detailed subject-wise schedule.' },
    { title: 'Parent-Teacher Meeting for Grade 5-8', date: 'March 05, 2026', content: 'A parent-teacher meeting for grades 5-8 is scheduled for March 5th to discuss student progress.' }
  ],
  news: [
    { title: 'Madrasa Al-Nur Wins National Debate Championship', date: 'March 01, 2026', image: 'https://picsum.photos/seed/news0/100/100' },
    { title: 'New Science Laboratory Inaugurated', date: 'February 25, 2026', image: 'https://picsum.photos/seed/news1/100/100' },
    { title: 'Annual Sports Day 2026 Concludes Successfully', date: 'February 20, 2026', image: 'https://picsum.photos/seed/news2/100/100' }
  ],
  videos: [
    { title: 'Campus Tour', seed: 'campus' },
    { title: 'Annual Convocation 2025', seed: 'convocation' },
    { title: 'Student Testimonials', seed: 'students' }
  ],
  events: [
    { date: "15", month: "MAR", title: 'Annual Quran Competition', time: "9:00 AM - 2:00 PM", location: 'Main Auditorium' },
    { date: "22", month: "MAR", title: 'Parent-Teacher Meeting', time: "10:00 AM - 1:00 PM", location: 'Classroom Block A' }
  ],
  images: {
    hero: 'https://picsum.photos/seed/islamicarch/1920/1080',
    about: 'https://picsum.photos/seed/history/1200/900'
  },
  titles: {
    hero: 'Welcome to Markazul Fikri'
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/content", (req, res) => {
    res.json(contentStore);
  });

  app.post("/api/content", (req, res) => {
    contentStore = req.body;
    res.json({ success: true });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
