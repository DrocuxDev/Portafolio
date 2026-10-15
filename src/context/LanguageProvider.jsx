import { useCallback, useEffect, useState } from 'react';
import { LanguageContext } from './LanguageContext.jsx';

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('drocux-lang');
      return saved === 'en' || saved === 'es' ? saved : 'es';
    } catch {
      return 'es';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('drocux-lang', lang);
    } catch {
      /* almacenamiento no disponible */
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'es' ? 'en' : 'es'));
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};
