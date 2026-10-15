import { createContext } from 'react';

export const LanguageContext = createContext({ lang: 'es', toggle: () => {}, setLang: () => {} });
