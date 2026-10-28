import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, LocalizedValue } from '../types';
import { I18N } from '../data/i18n';
import { SITE_CONFIG } from '../data/config';

interface LanguageContextValue {
  lang: Language;
  setLang: (next: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  L: (v: LocalizedValue) => string | string[] | null;
  waLink: (text: string, customNumber?: string) => string;
  fmtDate: (v: string) => string;
}

const LANGS: Language[] = [Language.EN, Language.RU, Language.KY];

const LOCALES: Record<Language, string> = {
  [Language.EN]: 'en-GB',
  [Language.RU]: 'ru-RU',
  [Language.KY]: 'ky-KG',
};

function detectInitialLang(): Language {
  if (typeof window === 'undefined') return Language.EN;
  const fromUrl = new URLSearchParams(window.location.search).get('lang') as Language | null;
  if (fromUrl && LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem('zalkar-lang') as Language | null;
    if (saved && LANGS.includes(saved)) return saved;
  } catch {
    // storage unavailable
  }
  const nav = (navigator.languages || [navigator.language || 'en']).map((l) =>
    String(l).slice(0, 2).toLowerCase()
  );
  const matched = nav.find((l) => LANGS.includes(l as Language)) as Language | undefined;
  return matched || Language.EN;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(detectInitialLang);

  const setLang = useCallback((next: Language) => {
    const valid = LANGS.includes(next) ? next : Language.EN;
    setLangState(valid);
    try {
      localStorage.setItem('zalkar-lang', valid);
    } catch {
      // storage unavailable
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      let s = (I18N[lang] && I18N[lang][key]) || (I18N[Language.EN] && I18N[Language.EN][key]) || '';
      if (vars) {
        Object.keys(vars).forEach((k) => {
          s = s.split('{' + k + '}').join(String(vars[k]));
        });
      }
      return s;
    },
    [lang]
  );

  const L = useCallback(
    (v: LocalizedValue): string | string[] | null => {
      if (v == null) return null;
      if (Array.isArray(v)) return v.length ? v : null;
      if (typeof v !== 'object') return String(v).trim() || null;
      const own = v[lang];
      const en = v.en;
      if (Array.isArray(own) || Array.isArray(en)) {
        if (Array.isArray(own) && own.length) return own;
        return Array.isArray(en) && en.length ? en : null;
      }
      return (own && String(own).trim()) || (en && String(en).trim()) || null;
    },
    [lang]
  );

  const waNumber = String(SITE_CONFIG.whatsappNumber || '').replace(/\D/g, '');
  const waLink = useCallback(
    (text: string, customNumber?: string): string => {
      const target = customNumber
        ? String(customNumber).replace(/\D/g, '')
        : waNumber;
      const q = 'text=' + encodeURIComponent(text);
      return target.length >= 8 ? `https://wa.me/${target}?${q}` : `https://wa.me/?${q}`;
    },
    [waNumber]
  );

  const fmtDate = useCallback(
    (v: string): string => {
      if (!v) return '';
      try {
        return new Date(v + 'T00:00:00').toLocaleDateString(LOCALES[lang], {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
      } catch {
        return v;
      }
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, L, waLink, fmtDate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
