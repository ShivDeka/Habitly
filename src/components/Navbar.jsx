import React, { useState } from "react";
import assets from "../assets/assets";

const Navbar = ({ theme, setTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div
      className="flex justify-between items-center px-15 sm:px-12 lg:px-24 
    xl:px-40 py-12 sticky top-0 z-20  font-m"
    >
      <img
        src={theme === "dark" ? assets.logo_dark : assets.logo}
        className="w-40 sm:w-40"
        alt=""
      />

      <div
        className={`text-gray-700 dark:text-white sm:text-xl
          sm:bg-white/70
          dark:sm:bg-gray-900/80
          sm:backdrop-blur-xl
          sm:rounded-full
          sm:px-8
          sm:py-3
          sm:shadow-xl ${
            !sidebarOpen
              ? "max-sm:w-0 overflow-hidden"
              : "max-sm:w-60 max-sm:p1-10"
          } 
        max-sm:fixed top-0 bottom-e right-0 max-sm:min-h-screen max-sm:h-full 
        max-sm:flex-col max-sm:bg-primary max-sm:text-white max-sm:pt-10 flex 
        sm:items-center gap-5 transition-all`}
      >
        <img
          src={assets.close_icon}
          alt=""
          className="w-5 absolute right-4 top-4 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
        <a
          onClick={() => setSidebarOpen(false)}
          href="#"
          className="sm:hover:border-b"
        >
          Home
        </a>
        <a
          onClick={() => setSidebarOpen(false)}
          href="#routine"
          className="sm:hover:border-b"
        >
          Routine
        </a>
        <a
          onClick={() => setSidebarOpen(false)}
          href="#calender"
          className="sm:hover:border-b"
        >
          Celender
        </a>
        <a
          onClick={() => setSidebarOpen(false)}
          href="#activities"
          className="sm:hover:border-b"
        >
          Activities
        </a>
        <a
          onClick={() => setSidebarOpen(false)}
          href="#account"
          className="sm:hover:border-b"
        >
          Profile
        </a>
      </div>

      <div>
        <img
          src={theme === "dark" ? assets.menu_icon_dark : assets.menu_icon}
          alt=""
          onClick={() => setSidebarOpen(true)}
          className="w-8 sm:hidden"
        />
        <a
          href="#account"
          className="text-sm max-sm:hidden flex items-center 
        gap-2 bg-primary text-white px-6 py-2 rounded-full cursor-pointer 
        hover:scale-103 transition-all"
        >
          Profile <img src={assets.user} width={40} alt="user" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
