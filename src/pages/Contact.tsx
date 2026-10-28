import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SITE_CONFIG } from '../data/config';
import { useLanguage } from '../context/LanguageContext';
import { useReveal } from '../hooks/useReveal';
import { Icon, IconName } from '../components/Icons';

const INTEREST_OPTIONS = ['stay', 'tour', 'both', 'other'] as const;
type InterestOption = (typeof INTEREST_OPTIONS)[number];

function getTodayIso(): string {
  const today = new Date();
  return new Date(today.getTime() - today.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

export const Contact: React.FC = () => {
  const { lang, t, L, waLink, fmtDate } = useLanguage();
  const [searchParams] = useSearchParams();
  useReveal([lang]);

  const checkoutRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState('');
  const [interest, setInterest] = useState<InterestOption>('stay');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  const todayIso = getTodayIso();

  // Pre-select interest from query parameter (?interest=stay | tour | both | other)
  useEffect(() => {
    const param = searchParams.get('interest');
    if (param && (INTEREST_OPTIONS as readonly string[]).includes(param)) {
      setInterest(param as InterestOption);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (checkin && checkout && checkout <= checkin) {
      setFormError(t('form.dateError'));
      checkoutRef.current?.focus();
      return;
    }
    setFormError('');

    const lines = [t('wa.form.header'), ''];
    const add = (key: string, val: string) => {
      const s = String(val || '').trim();
      if (s) lines.push(`${t(key)}: ${s}`);
    };

    add('wa.form.name', name);
    add('wa.form.interest', t('form.opt.' + interest));
    add('wa.form.checkin', fmtDate(checkin));
    add('wa.form.checkout', fmtDate(checkout));
    add('wa.form.guests', guests);
    add('wa.form.message', message);

    const url = waLink(lines.join('\n'));
    // Create and click a temporary anchor tag to safely open external WhatsApp URL without window.open
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  // Direct contact items
  const contactItems: {
    key: string;
    icon: IconName;
    label: string;
    value: string;
    href: string;
    ext?: boolean;
  }[] = [
    {
      key: 'wa-1',
      icon: 'wa',
      label: 'WhatsApp 1',
      value: SITE_CONFIG.phone || t('contact.waText'),
      href: waLink(t('wa.general'), SITE_CONFIG.whatsappNumber),
      ext: true,
    },
  ];
  if (SITE_CONFIG.whatsappNumber2) {
    contactItems.push({
      key: 'wa-2',
      icon: 'wa',
      label: 'WhatsApp 2',
      value: SITE_CONFIG.phone2 || SITE_CONFIG.whatsappNumber2,
      href: waLink(t('wa.general'), SITE_CONFIG.whatsappNumber2),
      ext: true,
    });
  }

  const directionsText =
    (L(SITE_CONFIG.directions) as string | null) || t('loc.directionsFallback');
  const transfersText =
    (L(SITE_CONFIG.transfers) as string | null) || t('loc.transferFallback');

  return (
    <>
      {/* ================= PAGE HEADER ================= */}
      <section className="page-hero" aria-labelledby="page-title">
        <div className="container page-hero-content">
          <p className="eyebrow light">{t('contact.eyebrow')}</p>
          <h1 id="page-title">{t('contact.title')}</h1>
          <p className="page-hero-sub">{t('contact.lead')}</p>
        </div>
      </section>

      {/* ================= CONTACT / INQUIRY ================= */}
      <section className="section contact" id="contact" aria-labelledby="page-title">
        <div className="container">
          <div className="contact-grid">
            <form
              className="form-card reveal"
              id="inquiry-form"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="f-name">{t('form.name')}</label>
                  <input
                    id="f-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-interest">{t('form.interest')}</label>
                  <select
                    id="f-interest"
                    name="interest"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value as InterestOption)}
                  >
                    <option value="stay">{t('form.opt.stay')}</option>
                    <option value="tour">{t('form.opt.tour')}</option>
                    <option value="both">{t('form.opt.both')}</option>
                    <option value="other">{t('form.opt.other')}</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-checkin">{t('form.checkin')}</label>
                  <input
                    id="f-checkin"
                    name="checkin"
                    type="date"
                    min={todayIso}
                    value={checkin}
                    onChange={(e) => {
                      setCheckin(e.target.value);
                      if (formError) setFormError('');
                    }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-checkout">{t('form.checkout')}</label>
                  <input
                    ref={checkoutRef}
                    id="f-checkout"
                    name="checkout"
                    type="date"
                    min={checkin || todayIso}
                    value={checkout}
                    onChange={(e) => {
                      setCheckout(e.target.value);
                      if (formError) setFormError('');
                    }}
                  />
                </div>
                <div className="field">
                  <label htmlFor="f-guests">{t('form.guests')}</label>
                  <input
                    id="f-guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="50"
                    inputMode="numeric"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
                <div className="field full">
                  <label htmlFor="f-message">{t('form.message')}</label>
                  <textarea
                    id="f-message"
                    name="message"
                    rows={4}
                    placeholder={t('form.messagePh')}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <p className="form-error" id="form-error" role="alert">
                  {formError}
                </p>
                <div className="form-foot">
                  <p className="form-privacy">{t('form.privacy')}</p>
                  <button className="btn btn-wa btn-lg" type="submit">
                    <span data-icon="wa">
                      <Icon name="wa" />
                    </span>
                    <span>{t('form.submit')}</span>
                  </button>
                </div>
              </div>
            </form>

            <aside className="direct-card reveal" aria-labelledby="direct-title">
              <h3 id="direct-title">{t('contact.directTitle')}</h3>
              <ul className="contact-list" id="contact-list">
                {contactItems.map((it) => (
                  <li key={it.key}>
                    <a
                      href={it.href}
                      target={it.ext ? '_blank' : undefined}
                      rel={it.ext ? 'noopener noreferrer' : undefined}
                    >
                      <span className="c-icon">
                        <Icon name={it.icon} />
                      </span>
                      <span>
                        <small>{it.label}</small>
                        {it.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="direct-address">
                <span data-icon="pin">
                  <Icon name="pin" />
                </span>
                <span>{t('loc.address')}</span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ================= LOCATION ================= */}
      <section className="section location" id="location" aria-labelledby="location-title">
        <div className="container">
          <div className="section-head reveal">
            <p className="eyebrow">{t('loc.eyebrow')}</p>
            <h2 id="location-title">{t('loc.title')}</h2>
            <p className="lead">{t('loc.lead')}</p>
          </div>
          <div className="location-grid">
            <div className="map-wrap reveal">
              <iframe
                id="map-frame"
                src={SITE_CONFIG.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t('loc.mapTitle')}
              ></iframe>
            </div>
            <div className="loc-card reveal">
              <div className="loc-item">
                <span className="d-icon">
                  <Icon name="pin" />
                </span>
                <div>
                  <h3>{t('loc.addressTitle')}</h3>
                  <p>{t('loc.address')}</p>
                  <p className="muted-note">{t('loc.mapNote')}</p>
                </div>
              </div>
              <div className="loc-item">
                <span className="d-icon">
                  <Icon name="route" />
                </span>
                <div>
                  <h3>{t('loc.directionsTitle')}</h3>
                  <p id="loc-directions">{directionsText}</p>
                </div>
              </div>
              <div className="loc-item">
                <span className="d-icon">
                  <Icon name="car" />
                </span>
                <div>
                  <h3>{t('loc.transferTitle')}</h3>
                  <p id="loc-transfers">{transfersText}</p>
                </div>
              </div>
              <div className="loc-actions">
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
                <a
                  className="btn btn-outline"
                  id="map-link"
                  href={SITE_CONFIG.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span data-icon="map">
                    <Icon name="map" />
                  </span>
                  <span>{t('loc.btnMap')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="section faq" id="faq" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow">{t('faq.eyebrow')}</p>
            <h2 id="faq-title">{t('faq.title')}</h2>
          </div>
          <div className="faq-list reveal">
            <details>
              <summary>{t('faq.q1')}</summary>
              <p>{t('faq.a1')}</p>
            </details>
            <details>
              <summary>{t('faq.q2')}</summary>
              <p>{t('faq.a2')}</p>
            </details>
            <details>
              <summary>{t('faq.q3')}</summary>
              <p>{t('faq.a3')}</p>
            </details>
            <details>
              <summary>{t('faq.q4')}</summary>
              <p>{t('faq.a4')}</p>
            </details>
          </div>
        </div>
      </section>
    </>
  );
};
