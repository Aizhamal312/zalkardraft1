export enum Language {
  EN = 'en',
  RU = 'ru',
  KY = 'ky',
}

export type LocalizedString = {
  en: string;
  ru: string;
  ky: string;
};

export type LocalizedStringArray = {
  en: string[];
  ru: string[];
  ky: string[];
};

export type LocalizedValue =
  | string
  | number
  | string[]
  | LocalizedString
  | LocalizedStringArray
  | null
  | undefined;

export type GalleryCategory =
  | 'guesthouse'
  | 'village'
  | 'horses'
  | 'sonkul'
  | 'yurts'
  | 'culture';

export interface RoomConfig {
  name: LocalizedString;
  description: LocalizedString;
  guests: string;
  facilities: LocalizedStringArray;
  price: string;
  photos: string[];
}

export interface TourConfig {
  duration: LocalizedString;
  difficulty: LocalizedString;
  guide: LocalizedString;
  groupSize: LocalizedString;
  price: LocalizedStringArray | LocalizedString;
  included: LocalizedString;
}

export interface TourImageConfig {
  src: string;
  category: GalleryCategory;
  caption: LocalizedString;
}

export interface GalleryItemConfig {
  src?: string;
  video?: string;
  poster?: string;
  category: GalleryCategory;
  size?: 'tall' | 'wide' | 'normal';
  caption: LocalizedString;
}

export interface SiteConfig {
  whatsappNumber: string;
  phone: string;
  whatsappNumber2?: string;
  phone2?: string;
  email: string;
  instagram: string;
  heroImage: string;
  aboutImage: string;
  heroVideo: string;
  heroVideoMobile: string;
  heroVideoMobilePoster: string;
  geo: {
    lat: number;
    lng: number;
  };
  mapEmbedUrl: string;
  mapLink: string;
  directions: LocalizedString;
  transfers: LocalizedString;
  rooms: RoomConfig[];
  tour: TourConfig;
  tourImages: TourImageConfig[];
  gallery: GalleryItemConfig[];
}
