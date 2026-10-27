import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Language } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../data/config';
import { BrandMark, Icon } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { lang, setLang, t, waLink } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // Determine current page key
  const pathname = location.pathname;
  const pageKey =
    pathname === '/stay' || pathname === '/stay.html'
      ? 'stay'
      : pathname === '/tours' || pathname === '/tours.html'
      ? 'tours'
      : pathname === '/contact' || pathname === '/contact.html'
      ? 'contact'
      : 'home';

  // Legacy hash redirects on home page (index.html#tours -> /tours, etc.)
  useEffect(() => {
    if (pageKey === 'home' && location.hash) {
      const hashName = location.hash.slice(1);
      const moved: Record<string, string> = {
        stay: '/stay',
        tours: '/tours',
        contact: '/contact',
        location: '/contact#location',
        faq: '/contact#faq',
      };
      if (moved[hashName]) {
        navigate(moved[hashName], { replace: true });
      }
    }
  }, [pageKey, location.hash, navigate]);

  // Handle scrolling on route or hash change
  useEffect(() => {
    setNavOpen(false);
    if (location.hash) {
      const targetId = location.hash.slice(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [location.pathname, location.hash]);

  // Header scroll listener & Escape key listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Update document title, meta description, and Schema.org JSON-LD
  useEffect(() => {
    const getMeta = (k: string) =>
      (pageKey !== 'home' && t(`meta.${pageKey}.${k}`)) || t(`meta.${k}`);

    document.title = getMeta('title');
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', getMeta('description'));
    }

    const schemaData: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Zalkar Guest House',
      description: t('meta.description'),
      address: {
        '@type': 'PostalAddress',
        streetAddress: '5a Chungulav Street',
        addressLocality: 'Kyzart',
        addressRegion: 'Naryn Region',
        addressCountry: 'KG',
      },
      availableLanguage: ['en', 'ru', 'ky'],
    };

    if (/^https?:/.test(window.location.protocol)) {
      schemaData.url = window.location.origin + window.location.pathname;
    }
    if (SITE_CONFIG.geo && SITE_CONFIG.geo.lat && SITE_CONFIG.geo.lng) {
      schemaData.geo = {
        '@type': 'GeoCoordinates',
        latitude: SITE_CONFIG.geo.lat,
        longitude: SITE_CONFIG.geo.lng,
      };
    }
    if (SITE_CONFIG.mapLink) schemaData.hasMap = SITE_CONFIG.mapLink;
    if (SITE_CONFIG.phone) schemaData.telephone = SITE_CONFIG.phone;
    if (SITE_CONFIG.email) schemaData.email = SITE_CONFIG.email;
    if (SITE_CONFIG.heroImage) {
      schemaData.image = new URL(SITE_CONFIG.heroImage, window.location.href).href;
    }
    if (SITE_CONFIG.instagram) schemaData.sameAs = [SITE_CONFIG.instagram];

    const schemaEl = document.getElementById('schema-ld');
    if (schemaEl) {
      schemaEl.textContent = JSON.stringify(schemaData);
    }
  }, [lang, pageKey, t]);

  // Footer contact items
  const footerContactItems: {
    icon: string;
    label: string;
    value: string;
    href: string;
    ext?: boolean;
  }[] = [
    {
      icon: 'wa',
      label: t('contact.whatsapp'),
      value: SITE_CONFIG.phone || t('contact.waText'),
      href: waLink(t('wa.general')),
      ext: true,
    },
  ];
  if (SITE_CONFIG.phone) {
    footerContactItems.push({
      icon: 'phone',
      label: t('contact.phone'),
      value: SITE_CONFIG.phone,
      href: 'tel:' + String(SITE_CONFIG.phone).replace(/[^\d+]/g, ''),
    });
  }
  if (SITE_CONFIG.email) {
    footerContactItems.push({
      icon: 'mail',
      label: t('contact.email'),
      value: SITE_CONFIG.email,
      href: 'mailto:' + SITE_CONFIG.email,
    });
  }
  if (SITE_CONFIG.instagram) {
    const handle = '@' + String(SITE_CONFIG.instagram).replace(/\/+$/, '').split('/').pop();
    footerContactItems.push({
      icon: 'insta',
      label: t('contact.instagram'),
      value: handle,
      href: SITE_CONFIG.instagram,
      ext: true,
    });
  }

  const headerClasses = [
    'site-header',
    isScrolled ? 'is-scrolled' : '',
    navOpen ? 'nav-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <a className="skip-link" href="#main">
        {t('a11y.skip')}
      </a>

      {/* ================= HEADER ================= */}
      <header className={headerClasses} id="site-header">
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label={t('a11y.home')}>
            <BrandMark />
            <span className="brand-text">
              <span className="brand-name">Zalkar</span>
              <span className="brand-sub">{t('brand.sub')}</span>
            </span>
          </Link>

          <nav className="main-nav" id="main-nav" aria-label="Main">
            <ul>
              <li>
                <Link
                  to="/"
                  className={pageKey === 'home' ? 'is-active' : undefined}
                  aria-current={pageKey === 'home' ? 'page' : undefined}
                  onClick={() => setNavOpen(false)}
                >
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link
                  to="/stay"
                  className={pageKey === 'stay' ? 'is-active' : undefined}
                  aria-current={pageKey === 'stay' ? 'page' : undefined}
                  onClick={() => setNavOpen(false)}
                >
                  {t('nav.stay')}
                </Link>
              </li>
              <li>
                <Link
                  to="/tours"
                  className={pageKey === 'tours' ? 'is-active' : undefined}
                  aria-current={pageKey === 'tours' ? 'page' : undefined}
                  onClick={() => setNavOpen(false)}
                >
                  {t('nav.tours')}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={pageKey === 'contact' ? 'is-active' : undefined}
                  aria-current={pageKey === 'contact' ? 'page' : undefined}
                  onClick={() => setNavOpen(false)}
                >
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header-actions">
            <div className="lang-switch" role="group" aria-label={t('a11y.lang')}>
              <button
                type="button"
                aria-pressed={lang === Language.EN}
                lang="en"
                onClick={() => setLang(Language.EN)}
              >
                EN
              </button>
              <button
                type="button"
                aria-pressed={lang === Language.RU}
                lang="ru"
                onClick={() => setLang(Language.RU)}
              >
                RU
              </button>
              <button
                type="button"
                aria-pressed={lang === Language.KY}
                lang="ky"
                onClick={() => setLang(Language.KY)}
              >
                KY
              </button>
            </div>
            <a
              className="btn btn-wa btn-sm header-wa"
              href={waLink(t('wa.general'))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span data-icon="wa">
                <Icon name="wa" />
              </span>
              <span>WhatsApp</span>
            </a>
            <button
              className="nav-toggle"
              type="button"
              aria-expanded={navOpen}
              aria-controls="main-nav"
              aria-label={t('a11y.menu')}
              onClick={() => setNavOpen((prev) => !prev)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <main id="main">{children}</main>

      {/* ================= FOOTER ================= */}
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link className="brand" to="/" aria-label={t('a11y.home')}>
              <BrandMark />
              <span className="brand-text">
                <span className="brand-name">Zalkar</span>
                <span className="brand-sub">{t('brand.sub')}</span>
              </span>
            </Link>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4>{t('footer.nav')}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/">{t('nav.home')}</Link>
              </li>
              <li>
                <Link to="/stay">{t('nav.stay')}</Link>
              </li>
              <li>
                <Link to="/tours">{t('nav.tours')}</Link>
              </li>
              <li>
                <Link to="/#gallery">{t('nav.gallery')}</Link>
              </li>
              <li>
                <Link to="/contact#location">{t('nav.location')}</Link>
              </li>
              <li>
                <Link to="/contact#faq">{t('faq.eyebrow')}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t('footer.contact')}</h4>
            <ul className="footer-links" id="footer-contacts">
              {footerContactItems.map((it) => (
                <li key={it.icon}>
                  <a
                    href={it.href}
                    target={it.ext ? '_blank' : undefined}
                    rel={it.ext ? 'noopener noreferrer' : undefined}
                  >
                    {it.icon === 'wa' ? it.label : it.value}
                  </a>
                </li>
              ))}
              <li>{t('loc.address')}</li>
            </ul>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © <span id="year">{new Date().getFullYear()}</span> Zalkar Guest House.{' '}
            <span>{t('footer.rights')}</span>
          </span>
          <span>{t('loc.address')}</span>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        className="wa-float"
        href={waLink(t('wa.general'))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('a11y.wa')}
      >
        <span data-icon="wa">
          <Icon name="wa" />
        </span>
      </a>
    </>
  );
};
