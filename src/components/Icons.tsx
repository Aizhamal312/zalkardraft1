import React from 'react';
import { GalleryCategory } from '../types';

export type IconName =
  | 'wa'
  | 'house'
  | 'village'
  | 'mountain'
  | 'horseshoe'
  | 'lake'
  | 'yurt'
  | 'sun'
  | 'pin'
  | 'check'
  | 'users'
  | 'user'
  | 'clock'
  | 'trend'
  | 'tag'
  | 'list'
  | 'route'
  | 'car'
  | 'map'
  | 'phone'
  | 'mail'
  | 'insta'
  | 'close'
  | 'arrowL'
  | 'arrowR'
  | 'play';

export const CAT_ICON: Record<GalleryCategory, IconName> = {
  guesthouse: 'house',
  village: 'village',
  horses: 'horseshoe',
  sonkul: 'lake',
  yurts: 'yurt',
  culture: 'mountain',
};

export const Icon: React.FC<{ name: IconName }> = ({ name }) => {
  const isFilled = name === 'wa' || name === 'play';

  const svgProps = isFilled
    ? { fill: 'currentColor' }
    : {
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 1.6,
        strokeLinecap: 'round' as const,
        strokeLinejoin: 'round' as const,
      };

  const renderPaths = () => {
    switch (name) {
      case 'wa':
        return (
          <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.59-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.11.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88a9.83 9.83 0 0 1 9.88 9.89c0 5.45-4.43 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z" />
        );
      case 'house':
        return (
          <>
            <path d="M3 11.5 12 4l9 7.5" />
            <path d="M5.5 10v10h13V10" />
            <path d="M10 20v-5.5h4V20" />
          </>
        );
      case 'village':
        return (
          <>
            <path d="M2 20h20" />
            <path d="M4 20v-7l4-3 4 3v7" />
            <path d="M12 20v-9l4-3 4 3v9" />
            <path d="M7 20v-3h2v3" />
          </>
        );
      case 'mountain':
        return (
          <>
            <path d="m2 20 7-12 4 6.5L16 10l6 10z" />
            <path d="m7.2 11 1.8 1.5 1.6-1.4" />
          </>
        );
      case 'horseshoe':
        return (
          <>
            <path d="M7 4.5C5 6.3 4 8.9 4 11.5 4 16.2 7.6 20 12 20s8-3.8 8-8.5c0-2.6-1-5.2-3-7" />
            <path d="M5.5 4.5H9M15 4.5h3.5" />
            <path d="M6.5 12.5h.01M17.5 12.5h.01M8.5 16.5h.01M15.5 16.5h.01" />
          </>
        );
      case 'lake':
        return (
          <>
            <path d="m3 11 5-6 3 3.5 2.5-2.5L19 11" />
            <path d="M2 15c1.7 0 2.5-1.2 4-1.2S8.3 15 10 15s2.5-1.2 4-1.2 2.3 1.2 4 1.2 2.5-1.2 4-1.2" />
            <path d="M2 19c1.7 0 2.5-1.2 4-1.2S8.3 19 10 19s2.5-1.2 4-1.2 2.3 1.2 4 1.2 2.5-1.2 4-1.2" />
          </>
        );
      case 'yurt':
        return (
          <>
            <path d="M3.5 20v-6.5C6 8.5 18 8.5 20.5 13.5V20z" />
            <path d="M10 20v-4.5h4V20" />
            <path d="M9 7.6 12 5.5l3 2.1" />
            <path d="M3.5 15h17" />
          </>
        );
      case 'sun':
        return (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        );
      case 'pin':
        return (
          <>
            <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </>
        );
      case 'check':
        return <path d="m5 12.5 4.5 4.5L19 7.5" />;
      case 'users':
        return (
          <>
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3 19.5c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
            <path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.8c1.6.6 2.7 2 3 4.7" />
          </>
        );
      case 'user':
        return (
          <>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 20c.7-3.6 3.5-5.5 7-5.5s6.3 1.9 7 5.5" />
          </>
        );
      case 'clock':
        return (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </>
        );
      case 'trend':
        return (
          <>
            <path d="m3 17 6-6 4 4 8-8" />
            <path d="M15 7h6v6" />
          </>
        );
      case 'tag':
        return (
          <>
            <path d="M3 12V4h8l10 10-8 8z" />
            <circle cx="7.5" cy="8.5" r="1.3" />
          </>
        );
      case 'list':
        return (
          <>
            <path d="M9 6h11M9 12h11M9 18h11" />
            <path d="m3.5 6 1 1 2-2M3.5 12l1 1 2-2M3.5 18l1 1 2-2" />
          </>
        );
      case 'route':
        return (
          <>
            <circle cx="6" cy="19" r="2" />
            <circle cx="18" cy="5" r="2" />
            <path d="M8 19h8.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H16" />
          </>
        );
      case 'car':
        return (
          <>
            <path d="M5 16.5V12l2-5h10l2 5v4.5" />
            <path d="M3.5 12h17v4.5h-17z" />
            <circle cx="7.5" cy="18" r="1.6" />
            <circle cx="16.5" cy="18" r="1.6" />
          </>
        );
      case 'map':
        return (
          <>
            <path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z" />
            <path d="M9 4v13.5M15 6.5V20" />
          </>
        );
      case 'phone':
        return (
          <path d="M5 3.5h3.5l1.8 4.5-2.3 1.5a11 11 0 0 0 6.5 6.5l1.5-2.3 4.5 1.8V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.1 1.5 1.5 0 0 1 5 3.5z" />
        );
      case 'mail':
        return (
          <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.5 6 8.5 7 8.5-7" />
          </>
        );
      case 'insta':
        return (
          <>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <path d="M17.5 6.5h.01" />
          </>
        );
      case 'close':
        return <path d="M6 6l12 12M18 6 6 18" />;
      case 'arrowL':
        return <path d="M15 5l-7 7 7 7" />;
      case 'arrowR':
        return <path d="m9 5 7 7-7 7" />;
      case 'play':
        return <path d="M8 5.5v13l10.5-6.5z" />;
    }
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...svgProps}>
      {renderPaths()}
    </svg>
  );
};

export const BrandMark: React.FC = () => (
  <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <circle
      cx="20"
      cy="20"
      r="18.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      opacity=".5"
    />
    <path
      d="M8 27 16 16l5 6 4-5 7 10"
      fill="none"
      stroke="#c39a50"
      strokeWidth="2.2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path
      d="M13.5 30.5h13"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      opacity=".7"
    />
  </svg>
);

export const HeroArtSvg: React.FC = () => (
  <svg
    className="hero-art"
    viewBox="0 0 1440 900"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="g-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#18301f" />
        <stop offset=".42" stopColor="#4d6b55" />
        <stop offset=".7" stopColor="#c7a466" />
        <stop offset="1" stopColor="#ead4a5" />
      </linearGradient>
      <radialGradient id="g-sun">
        <stop offset="0" stopColor="#fff2cf" stopOpacity=".95" />
        <stop offset=".35" stopColor="#f1cf88" stopOpacity=".55" />
        <stop offset="1" stopColor="#f1cf88" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="g-lake" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e8d1a0" />
        <stop offset="1" stopColor="#6d8d84" />
      </linearGradient>
    </defs>
    <rect width="1440" height="900" fill="url(#g-sky)" />
    <circle className="sun-glow" cx="1060" cy="470" r="230" fill="url(#g-sun)" />
    <circle cx="1060" cy="470" r="44" fill="#f7e2b0" opacity=".9" />
    <path
      d="M760 290q9-9 18 0q9-9 18 0M830 250q6-6 12 0q6-6 12 0"
      fill="none"
      stroke="#1d3427"
      strokeWidth="2"
      strokeLinecap="round"
      opacity=".55"
    />
    <path
      fill="#8aa293"
      opacity=".9"
      d="M0 560 90 500l80 30 130-100 80 50 140-100 90 60 110-40 120 70 120-110 100 70 120-50 120 70 140-50V900H0Z"
    />
    <path
      fill="#f4ecdc"
      opacity=".9"
      d="M300 430l-22 17 14-3 9 8 11-9 10 3ZM520 380l-28 22 16-4 12 10 14-11 14 4ZM960 360l-30 27 17-3 13 9 15-10 15 1ZM1180 380l-24 10 12 2 12 6 12-7 13 4Z"
    />
    <path
      fill="#4c6b57"
      d="M0 650 130 560l100 50 140-90 100 70 130-60 120 80 130-70 130 80 130-90 130 70 100-40 100 30V900H0Z"
    />
    <path
      fill="#2f4c3c"
      d="M0 720c180-52 330-20 500-36 190-18 340 40 530 14 170-22 300 6 410-8V900H0Z"
    />
    <path
      fill="url(#g-lake)"
      d="M0 770c320-22 1120-22 1440 0v42c-320-16-1120-16-1440 0Z"
    />
    <path
      d="M980 772h160M1010 782h100M1035 792h50"
      stroke="#f6e3b8"
      strokeOpacity=".55"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      fill="#1d3529"
      d="M0 805c260-17 560 7 860-5 260-10 440 6 580-2V900H0Z"
    />
    <g transform="translate(1150 808)">
      <path fill="#f3ead8" d="M-30 0v-20q30-26 60 0V0Z" />
      <path fill="#b8924a" d="M-30-15h60v4h-60Z" />
      <rect x="-6" y="-13" width="12" height="13" fill="#7a5235" />
    </g>
    <g transform="translate(1222 810) scale(.72)">
      <path fill="#efe4cf" d="M-30 0v-20q30-26 60 0V0Z" />
      <path fill="#b8924a" d="M-30-15h60v4h-60Z" />
      <rect x="-6" y="-13" width="12" height="13" fill="#7a5235" />
    </g>
  </svg>
);
