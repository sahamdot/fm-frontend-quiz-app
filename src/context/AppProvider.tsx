import { createContext, useEffect, useState } from "react";

type Context = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const AppContext = createContext<Context>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((state) => !state);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </AppContext.Provider>
  );
}
