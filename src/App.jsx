import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Gridlayout from "./components/GridLayout";

const App = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div className="dark:bg-black relative">
      <Navbar theme={theme} setTheme={setTheme} />

      <main>
        <Gridlayout />
      </main>
    </div>
  );
};

export default App;
