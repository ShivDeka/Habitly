import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import bgimage from "./assets/bgimage.png";
import useUserPrefs from "./hooks/useUserPrefs";

import Home from "./pages/Home";
import Activities from "./pages/Activities";
import Track from "./pages/Track";
import Calendar from "./pages/Calendar";
import Settings from "./pages/Settings";

const App = () => {
  const [theme, setTheme] = useState("light");
  const { backdropUrl, avatarUrl, updateBackdrop, updateAvatar } =
    useUserPrefs();
  const backdropInputRef = useRef(null);

  return (
    <div
      className="dark:bg-black relative bg-cover bg-center bg-no-repeat bg-fixed min-h-screen"
      style={{ backgroundImage: `url(${backdropUrl || bgimage})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10">
        <Navbar
          theme={theme}
          setTheme={setTheme}
          avatarUrl={avatarUrl}
          onAvatarChange={updateAvatar}
        />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/track" element={<Track />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

        {/* Temporary — move into Settings page once it's built out */}
        <button
          onClick={() => backdropInputRef.current?.click()}
          className="fixed bottom-4 right-4 z-20 bg-gray-800 text-white text-sm px-4 py-2 rounded-full shadow-lg"
        >
          Change Background
        </button>
        <input
          ref={backdropInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => updateBackdrop(e.target.files[0])}
        />
      </div>
    </div>
  );
};

export default App;
