import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AppProvider from "./context/AppProvider.tsx";
import QuizProvider from "./context/QuizProvider.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </AppProvider>
  </StrictMode>,
);
