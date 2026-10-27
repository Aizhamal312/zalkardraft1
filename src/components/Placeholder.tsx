import React from 'react';
import { GalleryCategory } from '../types';
import { CAT_ICON, Icon } from './Icons';
import { useLanguage } from '../context/LanguageContext';

interface PlaceholderProps {
  category: GalleryCategory;
  label: string;
}

export const PhotoPlaceholder: React.FC<PlaceholderProps> = ({ category, label }) => {
  const { t } = useLanguage();
  const iconName = CAT_ICON[category] || 'mountain';

  return (
    <div
      className={`ph ph--${category}`}
      role="img"
      aria-label={`${label} — ${t('photo.soon')}`}
    >
      <div className="ph-inner">
        <span className="ph-icon">
          <Icon name={iconName} />
        </span>
        <span className="ph-label">{label}</span>
        <span className="ph-soon">{t('photo.soon')}</span>
      </div>
    </div>
  );
};

export const TbcBadge: React.FC<{ text?: string }> = ({ text }) => {
  const { t } = useLanguage();
  return <span className="tbc">{text || t('tours.tbc')}</span>;
};
