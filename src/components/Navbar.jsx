import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import assets from "../assets/assets";

const Navbar = ({
  theme,
  userName = "Shiv",
  taskCompletion = 35,
  avatarUrl,
  onAvatarChange,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const avatarInputRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-GB");
  const formattedDate = currentTime.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });

  const navLinkClass = ({ isActive }) =>
    `px-4 py-1.5 rounded-full font-medium transition-colors ${
      isActive ? "bg-gray-600 text-white" : "text-gray-100 hover:text-white"
    }`;

  return (
    <div
      className="fixed top-0 left-0 w-full z-70 
  bg-white/30 dark:bg-black/30 backdrop-blur-xl
  px-6 sm:px-12 lg:px-24 xl:px-40 pt-3 pb-4 font-m"
    >
      {/* Top row: logo + greeting/weather/clock */}
      <div className="flex justify-between items-centre">
        <img
          src={theme === "dark" ? assets.logo_dark : assets.logo}
          className="w-25 sm:w-35"
          alt="logo"
        />

        <div className="hidden sm:flex items-center gap-5">
          {/* Avatar — click to change */}
          <div className="relative group">
            <img
              src={avatarUrl || assets.avatar}
              alt="avatar"
              className="h-24 lg:h-28 object-contain cursor-pointer rounded-full"
              onClick={() => avatarInputRef.current?.click()}
            />
            <span className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/40 rounded-full text-white text-xs">
              Change
            </span>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => onAvatarChange(e.target.files[0])}
            />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl lg:text-2xl font-semibold text-yellow-200">
              Good Morning {userName}
            </h2>

            <div className="flex items-center gap-3">
              <span className="bg-white rounded-lg px-3 py-1 text-sm shadow-sm">
                {formattedDate}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-300">
                <img src={assets.weather_icon} alt="" className="w-5 h-5" />
                sunny day / rain expected
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-40 h-5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 flex items-center justify-center text-[10px] text-white font-medium"
                  style={{ width: `${taskCompletion}%` }}
                >
                  Task {taskCompletion}%
                </div>
              </div>
              <span className="bg-yellow-400 text-black text-sm font-semibold px-3 py-1 rounded-md">
                {formattedTime}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile menu icon */}
        <img
          src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon}
          alt=""
          onClick={() => setSidebarOpen(true)}
          className="w-8 sm:hidden"
        />
      </div>

      {/* Pill nav bar */}
      <div
        className={`mt-1 text-white text-base sm:text-m
          bg-gray-800/90 backdrop-blur-xl rounded-full
          px-3 py-3 shadow-xl w-fit
          ${!sidebarOpen ? "max-sm:hidden" : "max-sm:flex"}
          flex items-center gap-2 transition-all`}
      >
        <img
          src={assets.close_icon}
          alt=""
          className="w-5 absolute right-4 top-4 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
        <NavLink
          to="/"
          end
          onClick={() => setSidebarOpen(false)}
          className={navLinkClass}
        >
          Home
        </NavLink>
        <NavLink
          to="/activities"
          onClick={() => setSidebarOpen(false)}
          className={navLinkClass}
        >
          Activities
        </NavLink>
        <NavLink
          to="/track"
          onClick={() => setSidebarOpen(false)}
          className={navLinkClass}
        >
          Track
        </NavLink>
        <NavLink
          to="/calendar"
          onClick={() => setSidebarOpen(false)}
          className={navLinkClass}
        >
          Calendar
        </NavLink>
        <NavLink
          to="/settings"
          onClick={() => setSidebarOpen(false)}
          className={navLinkClass}
        >
          Settings
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
