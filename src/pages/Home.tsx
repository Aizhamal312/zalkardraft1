import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { GalleryCategory } from '../types';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { HeroArtSvg, Icon } from '../components/Icons';
import { PhotoPlaceholder } from '../components/Placeholder';

const FILTER_CATEGORIES: ('all' | GalleryCategory)[] = [
  'all',
  'guesthouse',
  'village',
  'horses',
  'sonkul',
  'yurts',
  'culture',
];

export const Home: React.FC = () => {
  const { lang, t, L, waLink } = useLanguage();
  const [galleryFilter, setGalleryFilter] = useState<'all' | GalleryCategory>('all');
  const [isPortrait, setIsPortrait] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia('(orientation: portrait)').matches : false
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  // Lightbox state
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const lbVideoRef = useRef<HTMLVideoElement | null>(null);
  const [lightboxList, setLightboxList] = useState<number[]>([]);
  const [lightboxPos, setLightboxPos] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  useReveal([lang]);

  useEffect(() => {
    const mqPortrait = window.matchMedia('(orientation: portrait)');
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onPortraitChange = () => setIsPortrait(mqPortrait.matches);
    const onMotionChange = () => setPrefersReducedMotion(mqMotion.matches);

    mqPortrait.addEventListener('change', onPortraitChange);
    mqMotion.addEventListener('change', onMotionChange);
    return () => {
      mqPortrait.removeEventListener('change', onPortraitChange);
      mqMotion.removeEventListener('change', onMotionChange);
    };
  }, []);

  // Hero background logic
  const heroVideo =
    isPortrait && SITE_CONFIG.heroVideoMobile
      ? SITE_CONFIG.heroVideoMobile
      : SITE_CONFIG.heroVideo;
  const heroPoster =
    heroVideo === SITE_CONFIG.heroVideoMobile
      ? SITE_CONFIG.heroVideoMobilePoster
      : SITE_CONFIG.heroImage;
  const hasHeroPhotoOrVideo = Boolean(SITE_CONFIG.heroImage || heroVideo);

  // Explore card images
  const tourImg = (SITE_CONFIG.tourImages || []).find((i) => i.src);
  const roomImg =
    (SITE_CONFIG.rooms || []).map((r) => (r.photos || []).find(Boolean)).find(Boolean) ||
    SITE_CONFIG.aboutImage;

  // Gallery items
  const validGalleryItems = (SITE_CONFIG.gallery || [])
    .map((it, i) => ({ it, i }))
    .filter(({ it }) => Boolean(it.video || it.src));

  const availableCategories = new Set<GalleryCategory>(
    validGalleryItems.map(({ it }) => it.category)
  );

  const activeFilter: 'all' | GalleryCategory =
    galleryFilter !== 'all' && !availableCategories.has(galleryFilter) ? 'all' : galleryFilter;

  const visibleGalleryItems = validGalleryItems.filter(
    ({ it }) => activeFilter === 'all' || it.category === activeFilter
  );

  // Open Lightbox
  const openLightbox = (configIndex: number) => {
    const dialog = dialogRef.current;
    if (!dialog || typeof dialog.showModal !== 'function') return;

    const currentVisibleIndices = visibleGalleryItems.map(({ i }) => i);
    const startPos = Math.max(0, currentVisibleIndices.indexOf(configIndex));
    setLightboxList(currentVisibleIndices);
    setLightboxPos(startPos);
    setIsLightboxOpen(true);
    dialog.showModal();
  };

  const closeLightbox = () => {
    if (lbVideoRef.current) {
      lbVideoRef.current.pause();
    }
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
    setIsLightboxOpen(false);
  };

  const stepLightbox = (delta: number) => {
    if (!lightboxList.length) return;
    if (lbVideoRef.current) {
      lbVideoRef.current.pause();
    }
    setLightboxPos((prev) => (prev + delta + lightboxList.length) % lightboxList.length);
  };

  // Play video when lightbox opens or changes item
  useEffect(() => {
    if (!isLightboxOpen || !lightboxList.length) return;
    const item = SITE_CONFIG.gallery[lightboxList[lightboxPos]];
    if (item && item.video && lbVideoRef.current) {
      lbVideoRef.current.play().catch(() => {
        // autoplay blocked — controls remain visible
      });
    }
  }, [isLightboxOpen, lightboxList, lightboxPos]);

  const currentLightboxItem =
    isLightboxOpen && lightboxList.length
      ? SITE_CONFIG.gallery[lightboxList[lightboxPos]]
      : null;

  const currentLightboxCaption = currentLightboxItem
    ? (L(currentLightboxItem.caption) as string | null) ||
      t('cat.' + currentLightboxItem.category)
    : '';

  const aboutLabel = t('about.photoLabel');

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div
          className={`hero-media${hasHeroPhotoOrVideo ? ' has-photo' : ''}`}
          id="hero-media"
        >
          {SITE_CONFIG.heroImage && !heroVideo && (
            <img
              className="hero-video"
              src={SITE_CONFIG.heroImage}
              alt=""
              aria-hidden="true"
            />
          )}
          <HeroArtSvg />
          {heroVideo && (
            <video
              className="hero-video"
              src={heroVideo}
              poster={heroPoster || undefined}
              muted
              loop
              playsInline
              autoPlay={!prefersReducedMotion}
              preload="auto"
              aria-hidden="true"
            />
          )}
        </div>

        <div className="container hero-content">
          <p className="eyebrow light">{t('hero.eyebrow')}</p>
          <h1 id="hero-title">{t('hero.title')}</h1>
          <p className="hero-sub">{t('hero.subtitle')}</p>
          <div className="hero-actions">
            <Link className="btn btn-gold btn-lg" to="/contact?interest=stay#contact">
              <span>{t('hero.btnStay')}</span>
            </Link>
            <Link className="btn btn-ghost-light btn-lg" to="/tours">
              <span>{t('hero.btnTours')}</span>
            </Link>
            <a
              className="btn btn-wa btn-lg"
              href={waLink(t('wa.general'))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span data-icon="wa">
                <Icon name="wa" />
              </span>
              <span>{t('hero.btnWhatsapp')}</span>
            </a>
          </div>
        </div>

        <a className="scroll-cue" href="#highlights" aria-label={t('a11y.scroll')}>
          <span></span>
        </a>
      </section>

      {/* ================= HIGHLIGHTS ================= */}
      <section className="highlights" id="highlights" aria-label="Highlights">
        <div className="container">
          <div className="highlights-grid reveal">
            <div className="hl">
              <span className="hl-icon">
                <Icon name="house" />
              </span>
              <div>
                <h3>{t('hl.1.title')}</h3>
                <p>{t('hl.1.text')}</p>
              </div>
            </div>
            <div className="hl">
              <span className="hl-icon">
                <Icon name="horseshoe" />
              </span>
              <div>
                <h3>{t('hl.2.title')}</h3>
                <p>{t('hl.2.text')}</p>
              </div>
            </div>
            <div className="hl">
              <span className="hl-icon">
                <Icon name="yurt" />
              </span>
              <div>
                <h3>{t('hl.3.title')}</h3>
                <p>{t('hl.3.text')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="container about-grid">
          <div className="about-media reveal">
            <div className="frame" id="about-photo">
              {SITE_CONFIG.aboutImage ? (
                <img
                  src={SITE_CONFIG.aboutImage}
                  alt={aboutLabel}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <PhotoPlaceholder category="guesthouse" label={aboutLabel} />
              )}
            </div>
            <div className="about-badge">
              <span data-icon="pin">
                <Icon name="pin" />
              </span>
              <span>{t('about.badge')}</span>
            </div>
          </div>
          <div className="about-text reveal">
            <p className="eyebrow">{t('about.eyebrow')}</p>
            <h2 id="about-title">{t('about.title')}</h2>
            <p className="lead">{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <ul className="check-list">
              <li>
                <span className="check">
                  <Icon name="check" />
                </span>
                <span>{t('about.point1')}</span>
              </li>
              <li>
                <span className="check">
                  <Icon name="check" />
                </span>
                <span>{t('about.point2')}</span>
              </li>
              <li>
                <span className="check">
                  <Icon name="check" />
                </span>
                <span>{t('about.point3')}</span>
              </li>
            </ul>
            <p>{t('about.p3')}</p>
            <a
              className="btn btn-wa"
              href={waLink(t('wa.general'))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span data-icon="wa">
                <Icon name="wa" />
              </span>
              <span>{t('hero.btnWhatsapp')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= EXPLORE ================= */}
      <section className="section explore" id="explore" aria-labelledby="explore-title">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow">{t('explore.eyebrow')}</p>
            <h2 id="explore-title">{t('explore.title')}</h2>
          </div>
          <div className="explore-grid">
            <Link className="explore-card featured reveal" to="/tours">
              <div className="explore-media">
                {tourImg && tourImg.src ? (
                  <img src={tourImg.src} alt="" loading="lazy" decoding="async" />
                ) : (
                  <PhotoPlaceholder category="horses" label={t('cat.horses')} />
                )}
              </div>
              <div className="explore-body">
                <p className="eyebrow">{t('nav.tours')}</p>
                <h3>{t('tours.title')}</h3>
                <p>{t('explore.tours.text')}</p>
                <span className="explore-more">
                  <span>{t('explore.more')}</span>
                  <span data-icon="arrowR">
                    <Icon name="arrowR" />
                  </span>
                </span>
              </div>
            </Link>

            <Link className="explore-card reveal" to="/stay">
              <div className="explore-media">
                {roomImg ? (
                  <img src={roomImg} alt="" loading="lazy" decoding="async" />
                ) : (
                  <PhotoPlaceholder category="guesthouse" label={t('cat.guesthouse')} />
                )}
              </div>
              <div className="explore-body">
                <p className="eyebrow">{t('nav.stay')}</p>
                <h3>{t('stay.title')}</h3>
                <p>{t('explore.stay.text')}</p>
                <span className="explore-more">
                  <span>{t('explore.more')}</span>
                  <span data-icon="arrowR">
                    <Icon name="arrowR" />
                  </span>
                </span>
              </div>
            </Link>

            <Link className="explore-card reveal" to="/contact">
              <div className="explore-media">
                <PhotoPlaceholder category="village" label={t('cat.village')} />
              </div>
              <div className="explore-body">
                <p className="eyebrow">{t('nav.contact')}</p>
                <h3>{t('explore.contact.title')}</h3>
                <p>{t('explore.contact.text')}</p>
                <span className="explore-more">
                  <span>{t('explore.more')}</span>
                  <span data-icon="arrowR">
                    <Icon name="arrowR" />
                  </span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      {validGalleryItems.length > 0 && (
        <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-head center reveal">
              <p className="eyebrow">{t('gallery.eyebrow')}</p>
              <h2 id="gallery-title">{t('gallery.title')}</h2>
              <p className="lead">{t('gallery.lead')}</p>
            </div>

            {availableCategories.size >= 2 && (
              <div className="gallery-filters" role="group" aria-label="Gallery filter">
                {FILTER_CATEGORIES.map((cat) => {
                  const isHidden = cat !== 'all' && !availableCategories.has(cat);
                  if (isHidden) return null;
                  return (
                    <button
                      key={cat}
                      type="button"
                      className="filter-btn"
                      aria-pressed={activeFilter === cat}
                      onClick={() => setGalleryFilter(cat)}
                    >
                      {t(`cat.${cat}`)}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="gallery-grid" id="gallery-grid">
              {validGalleryItems.map(({ it, i }) => {
                const label = (L(it.caption) as string | null) || t('cat.' + it.category);
                const sizeClass = it.size
                  ? ` ${it.size}`
                  : i % 6 === 0
                  ? ' tall'
                  : i % 6 === 4
                  ? ' wide'
                  : '';
                const isHidden = activeFilter !== 'all' && it.category !== activeFilter;

                return (
                  <figure
                    key={i}
                    className={`g-item${sizeClass}`}
                    data-cat={it.category}
                    hidden={isHidden}
                  >
                    <button
                      type="button"
                      className="g-open"
                      aria-label={label}
                      onClick={() => openLightbox(i)}
                    >
                      {it.video ? (
                        <>
                          {it.poster ? (
                            <img src={it.poster} alt={label} loading="lazy" decoding="async" />
                          ) : (
                            <video
                              src={`${it.video}#t=0.5`}
                              preload="metadata"
                              muted
                              playsInline
                            />
                          )}
                          <span className="play-badge" aria-hidden="true">
                            <Icon name="play" />
                          </span>
                        </>
                      ) : (
                        it.src && (
                          <img src={it.src} alt={label} loading="lazy" decoding="async" />
                        )
                      )}
                    </button>
                    <figcaption>{label}</figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= MAP ================= */}
      <section className="section home-map" id="map" aria-labelledby="map-title">
        <div className="container home-map-grid">
          <div className="home-map-text reveal">
            <p className="eyebrow">{t('loc.eyebrow')}</p>
            <h2 id="map-title">{t('loc.title')}</h2>
            <p className="lead">{t('loc.lead')}</p>
            <p className="home-map-address">
              <span data-icon="pin">
                <Icon name="pin" />
              </span>
              <span>{t('loc.address')}</span>
            </p>
            <div className="loc-actions">
              <a
                className="btn btn-outline"
                href={SITE_CONFIG.mapLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span data-icon="map">
                  <Icon name="map" />
                </span>
                <span>{t('loc.btnMap')}</span>
              </a>
              <a
                className="btn btn-wa"
                href={waLink(t('wa.directions'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span data-icon="wa">
                  <Icon name="wa" />
                </span>
                <span>{t('loc.btnWa')}</span>
              </a>
            </div>
            <Link className="explore-more" to="/contact#location">
              <span>{t('loc.directionsTitle')}</span>
              <span data-icon="arrowR">
                <Icon name="arrowR" />
              </span>
            </Link>
          </div>
          <div className="map-wrap home-map-frame reveal">
            <iframe
              src={SITE_CONFIG.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('loc.mapTitle')}
            ></iframe>
          </div>
        </div>
      </section>

      {/* ================= LIGHTBOX DIALOG ================= */}
      <dialog
        ref={dialogRef}
        className="lightbox"
        id="lightbox"
        onClick={(e) => {
          if (e.target === dialogRef.current) {
            closeLightbox();
          }
        }}
        onClose={() => {
          if (lbVideoRef.current) lbVideoRef.current.pause();
          setIsLightboxOpen(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') stepLightbox(-1);
          if (e.key === 'ArrowRight') stepLightbox(1);
        }}
      >
        <button
          type="button"
          className="lb-btn lb-close"
          aria-label={t('a11y.close')}
          onClick={closeLightbox}
        >
          <span data-icon="close">
            <Icon name="close" />
          </span>
        </button>

        {lightboxList.length > 1 && (
          <button
            type="button"
            className="lb-btn lb-prev"
            aria-label={t('a11y.prev')}
            onClick={() => stepLightbox(-1)}
          >
            <span data-icon="arrowL">
              <Icon name="arrowL" />
            </span>
          </button>
        )}

        <figure className="lb-figure">
          {currentLightboxItem && !currentLightboxItem.video && currentLightboxItem.src && (
            <img id="lb-img" src={currentLightboxItem.src} alt={currentLightboxCaption} />
          )}
          <video
            ref={lbVideoRef}
            id="lb-video"
            controls
            playsInline
            preload="none"
            poster={currentLightboxItem?.poster || undefined}
            src={currentLightboxItem?.video || undefined}
            hidden={!currentLightboxItem?.video}
          />
          <figcaption id="lb-caption">{currentLightboxCaption}</figcaption>
        </figure>

        {lightboxList.length > 1 && (
          <button
            type="button"
            className="lb-btn lb-next"
            aria-label={t('a11y.next')}
            onClick={() => stepLightbox(1)}
          >
            <span data-icon="arrowR">
              <Icon name="arrowR" />
            </span>
          </button>
        )}
      </dialog>
    </>
  );
};
