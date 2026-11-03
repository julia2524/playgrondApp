// context/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import i18n, { changeLanguage, SupportedLanguage } from "../i18n"; // 👈 SupportedLanguage 추가

interface LanguageContextType {
  locale: string;
  setLanguage: (lang: SupportedLanguage) => Promise<void>; // 👈 38개 언어 타입 지원
}

const LanguageContext = createContext<LanguageContextType>({
  locale: i18n.locale || "en",
  setLanguage: async () => {},
});

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [locale, setLocale] = useState<string>(i18n.locale || "en");

  const setLanguage = async (lang: SupportedLanguage) => {
    await changeLanguage(lang);
    setLocale(lang); // 전역 상태 변경 -> 하위 컴포넌트 자동 리렌더링
  };

  return (
    <LanguageContext.Provider value={{ locale, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
