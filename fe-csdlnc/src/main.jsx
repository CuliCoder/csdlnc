import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./output.css";
import { ContextProvider } from "./context/ContextAPI.jsx";
createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
