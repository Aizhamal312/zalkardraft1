import React from 'react';
import { TourConfig } from '../types';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { Icon, IconName } from '../components/Icons';
import { PhotoPlaceholder, TbcBadge } from '../components/Placeholder';

const TOUR_FIELDS: [keyof TourConfig, string, IconName][] = [
  ['duration', 'tours.duration', 'clock'],
  ['difficulty', 'tours.difficulty', 'trend'],
  ['guide', 'tours.guide', 'user'],
  ['groupSize', 'tours.group', 'users'],
  ['price', 'tours.price', 'tag'],
  ['included', 'tours.included', 'list'],
];

export const Tours: React.FC = () => {
  const { lang, t, L, waLink } = useLanguage();
  useReveal([lang]);

  const tour = SITE_CONFIG.tour;
  const tourImages = SITE_CONFIG.tourImages || [];

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-content">
          <p className="eyebrow light">{t('tours.eyebrow')}</p>
          <h1 id="page-title">{t('tours.title')}</h1>
          <p className="page-hero-sub">{t('tours.lead')}</p>
          <div className="hero-actions">
            <a
              className="btn btn-wa btn-lg"
              href={waLink(t('wa.tour'))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span data-icon="wa">
                <Icon name="wa" />
              </span>
              <span>{t('tours.cta')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= HORSEBACK TOURS ================= */}
      <section className="section tours" id="tours" aria-labelledby="page-title">
        <div className="container">
          <div className="tour-features">
            <article className="feature reveal">
              <span className="hl-icon">
                <Icon name="mountain" />
              </span>
              <h3>{t('tours.f1.title')}</h3>
              <p>{t('tours.f1.text')}</p>
            </article>
            <article className="feature reveal">
              <span className="hl-icon">
                <Icon name="yurt" />
              </span>
              <h3>{t('tours.f2.title')}</h3>
              <p>{t('tours.f2.text')}</p>
            </article>
            <article className="feature reveal">
              <span className="hl-icon">
                <Icon name="lake" />
              </span>
              <h3>{t('tours.f3.title')}</h3>
              <p>{t('tours.f3.text')}</p>
            </article>
          </div>

          <div className="tour-layout">
            <div className="tour-details reveal">
              <h3>{t('tours.detailsTitle')}</h3>
              <ul className="detail-list" id="tour-details">
                {TOUR_FIELDS.map(([key, labelKey, iconName]) => {
                  const val = L(tour[key]);
                  return (
                    <li key={key}>
                      <span className="d-icon">
                        <Icon name={iconName} />
                      </span>
                      <div>
                        <span className="d-label">{t(labelKey)}</span>
                        <span className="d-value">
                          {Array.isArray(val) ? (
                            val.map((line, i) => (
                              <React.Fragment key={i}>
                                {i > 0 && <br />}
                                {line}
                              </React.Fragment>
                            ))
                          ) : val ? (
                            val
                          ) : (
                            <TbcBadge />
                          )}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="tour-note">{t('tours.note')}</p>
              <a
                className="btn btn-wa"
                href={waLink(t('wa.tour'))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span data-icon="wa">
                  <Icon name="wa" />
                </span>
                <span>{t('tours.cta')}</span>
              </a>
            </div>

            <div className="tour-mosaic reveal" id="tour-mosaic">
              {tourImages.map((img, idx) => {
                const label = (L(img.caption) as string | null) || t('cat.' + img.category);
                return (
                  <figure key={idx} className="m-item">
                    {img.src ? (
                      <>
                        <img src={img.src} alt={label} loading="lazy" decoding="async" />
                        <figcaption>{label}</figcaption>
                      </>
                    ) : (
                      <PhotoPlaceholder category={img.category} label={label} />
                    )}
                  </figure>
                );
              })}
            </div>
          </div>

          <div className="tour-cta reveal">
            <h3>{t('tours.ctaTitle')}</h3>
            <p>{t('tours.ctaSub')}</p>
            <a
              className="btn btn-gold btn-lg"
              href={waLink(t('wa.tour'))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span data-icon="wa">
                <Icon name="wa" />
              </span>
              <span>{t('tours.cta')}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
