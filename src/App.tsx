import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import React from "react";
function App() {
  React.useEffect(() => {
    // const savedTheme = localStorage.getItem("theme") || "light";
    const savedTheme = "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
