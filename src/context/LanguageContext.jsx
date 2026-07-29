// src/context/LanguageContext.jsx
//
// Context global untuk bahasa aktif website (id/en).
// Bungkus <App /> dengan <LanguageProvider> di main.jsx supaya
// semua komponen bisa akses bahasa aktif lewat hook useLanguage().

import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "id";
    return localStorage.getItem("lang") || "id";
  });

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "id" ? "en" : "id"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook dipakai di komponen mana pun: const { language, toggleLanguage } = useLanguage();
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage harus dipakai di dalam <LanguageProvider>");
  }
  return ctx;
}