import React, { useState } from 'react';
import { RoomConfig } from '../types';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { Icon } from '../components/Icons';
import { PhotoPlaceholder, TbcBadge } from '../components/Placeholder';

const RoomCard: React.FC<{ room: RoomConfig; index: number }> = ({ room, index }) => {
  const { t, L, waLink } = useLanguage();
  const [photoIdx, setPhotoIdx] = useState(0);

  const name = (L(room.name) as string | null) || t('stay.roomFallback', { n: index + 1 });
  const desc = L(room.description) as string | null;
  const guests = L(room.guests) as string | null;
  const facilities = L(room.facilities) as string[] | null;
  const price = L(room.price) as string | null;
  const photos = (room.photos || []).filter(Boolean);

  const currentIdx = photos.length ? photoIdx % photos.length : 0;

  const stepPhoto = (delta: number) => {
    if (!photos.length) return;
    setPhotoIdx((prev) => (prev + delta + photos.length) % photos.length);
  };

  return (
    <article className="room-card" data-room={index}>
      <div className="room-media">
        {!photos.length ? (
          <PhotoPlaceholder category="guesthouse" label={name} />
        ) : (
          <>
            <img
              src={photos[currentIdx]}
              alt={name}
              loading="lazy"
              decoding="async"
            />
            {photos.length >= 2 && (
              <>
                <button
                  type="button"
                  className="media-btn prev"
                  aria-label={t('a11y.prev')}
                  onClick={() => stepPhoto(-1)}
                >
                  <Icon name="arrowL" />
                </button>
                <button
                  type="button"
                  className="media-btn next"
                  aria-label={t('a11y.next')}
                  onClick={() => stepPhoto(1)}
                >
                  <Icon name="arrowR" />
                </button>
                <span className="media-count">
                  {currentIdx + 1} / {photos.length}
                </span>
              </>
            )}
          </>
        )}
      </div>
      <div className="room-body">
        <h3>{name}</h3>
        <p className={`room-desc${desc ? '' : ' is-tbc'}`}>
          {desc || t('stay.descFallback')}
        </p>
        <dl className="room-meta">
          <div>
            <dt>
              <Icon name="users" />
              {t('stay.guests')}
            </dt>
            <dd>{guests ? guests : <TbcBadge text={t('stay.askUs')} />}</dd>
          </div>
        </dl>
        <div className="room-facilities">
          <span className="mini-label">{t('stay.facilities')}</span>
          {facilities ? (
            <ul className="chips">
              {facilities.map((f, idx) => (
                <li key={idx} className="chip">
                  {f}
                </li>
              ))}
            </ul>
          ) : (
            <p className="room-desc is-tbc">{t('stay.facilitiesFallback')}</p>
          )}
        </div>
        <div className="room-foot">
          <div className="room-price">
            <span>{t('stay.price')}</span>
            <strong>{price ? price : <TbcBadge text={t('stay.onRequest')} />}</strong>
          </div>
          <a
            className="btn btn-wa btn-sm"
            href={waLink(t('wa.room', { room: name }))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="wa" />
            <span>{t('stay.ask')}</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export const Stay: React.FC = () => {
  const { lang, t, waLink } = useLanguage();
  useReveal([lang]);

  const rooms = SITE_CONFIG.rooms || [];

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-content">
          <p className="eyebrow light">{t('stay.eyebrow')}</p>
          <h1 id="page-title">{t('stay.title')}</h1>
          <p className="page-hero-sub">{t('stay.lead')}</p>
        </div>
      </section>

      {/* ================= ACCOMMODATION ================= */}
      <section className="section stay" id="stay" aria-labelledby="page-title">
        <div className="container">
          <div className="rooms-grid" id="rooms-grid">
            {rooms.map((room, i) => (
              <RoomCard key={i} room={room} index={i} />
            ))}
          </div>
          <div className="stay-more reveal">
            <div>
              <h3>{t('stay.moreTitle')}</h3>
              <p>{t('stay.moreText')}</p>
            </div>
            <a
              className="btn btn-wa"
              href={waLink(t('wa.stay'))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span data-icon="wa">
                <Icon name="wa" />
              </span>
              <span>{t('stay.moreBtn')}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
