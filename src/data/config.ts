import { SiteConfig } from '../types';

export const SITE_CONFIG: SiteConfig = {
  whatsappNumber: '996705554708',
  phone: '+996 705 554 708',
  email: '',
  instagram: '',

  heroImage: '',
  aboutImage: '',
  heroVideo: '',
  heroVideoMobile: '/videos/hero-mobile.mp4',
  heroVideoMobilePoster: '/videos/hero-mobile.jpg',

  geo: { lat: 41.999668, lng: 74.965294 },
  mapEmbedUrl: 'https://www.google.com/maps?q=41.999668,74.965294&z=15&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=41.999668%2C74.965294',

  directions: { en: '', ru: '', ky: '' },
  transfers: { en: '', ru: '', ky: '' },

  rooms: [
    {
      name: { en: '', ru: '', ky: '' },
      description: { en: '', ru: '', ky: '' },
      guests: '',
      facilities: { en: [], ru: [], ky: [] },
      price: '',
      photos: [],
    },
    {
      name: { en: '', ru: '', ky: '' },
      description: { en: '', ru: '', ky: '' },
      guests: '',
      facilities: { en: [], ru: [], ky: [] },
      price: '',
      photos: [],
    },
  ],

  tour: {
    duration: { en: '', ru: '', ky: '' },
    difficulty: {
      en: 'From beginner to expert',
      ru: 'От начинающего до эксперта',
      ky: 'Жаңы баштагандан экспертке чейин',
    },
    guide: {
      en: 'Provided',
      ru: 'Предоставляется',
      ky: 'Берилет',
    },
    groupSize: {
      en: 'From 1 person',
      ru: 'От 1 человека',
      ky: '1 адамдан баштап',
    },
    price: {
      en: ['Horse — 1,500 KGS per day', 'Overnight stay — 3,000 KGS per person'],
      ru: ['Лошадь — 1500 сом в день', 'Ночлег — 3000 сом с человека'],
      ky: ['Ат — күнүнө 1500 сом', 'Түнөө — бир адамга 3000 сом'],
    },
    included: {
      en: 'Meals and overnight stay',
      ru: 'Еда и ночлег',
      ky: 'Тамак-аш жана түнөө',
    },
  },

  tourImages: [
    {
      src: '/videos/rider-kyrgyz-flag.jpg',
      category: 'horses',
      caption: {
        en: 'Rider with the Kyrgyz flag',
        ru: 'Всадник с флагом Кыргызстана',
        ky: 'Кыргыз желеги менен атчан',
      },
    },
    {
      src: '/videos/mountain-trail.jpg',
      category: 'horses',
      caption: {
        en: 'Riding up a mountain trail',
        ru: 'Подъём верхом по горной тропе',
        ky: 'Тоо жолу менен ат менен өйдө',
      },
    },
    {
      src: '/videos/yurt-inside.jpg',
      category: 'yurts',
      caption: {
        en: 'Inside a yurt',
        ru: 'Внутри юрты',
        ky: 'Боз үйдүн ичи',
      },
    },
  ],

  gallery: [
    {
      video: '/videos/group-ride-valley.mp4',
      poster: '/videos/group-ride-valley.jpg',
      category: 'horses',
      size: 'tall',
      caption: {
        en: 'Group horseback ride through a mountain valley',
        ru: 'Конная прогулка группой по горной долине',
        ky: 'Тоо өрөөнүндө топ менен ат сейили',
      },
    },
    {
      video: '/videos/rider-kyrgyz-flag.mp4',
      poster: '/videos/rider-kyrgyz-flag.jpg',
      category: 'culture',
      size: 'tall',
      caption: {
        en: 'Rider with the Kyrgyz flag',
        ru: 'Всадник с флагом Кыргызстана',
        ky: 'Кыргыз желеги менен атчан',
      },
    },
    {
      video: '/videos/yurt-inside.mp4',
      poster: '/videos/yurt-inside.jpg',
      category: 'yurts',
      size: 'tall',
      caption: {
        en: 'Inside a yurt',
        ru: 'Внутри юрты',
        ky: 'Боз үйдүн ичи',
      },
    },
    {
      video: '/videos/mountain-trail.mp4',
      poster: '/videos/mountain-trail.jpg',
      category: 'horses',
      size: 'tall',
      caption: {
        en: 'Riding up a mountain trail',
        ru: 'Подъём верхом по горной тропе',
        ky: 'Тоо жолу менен ат менен өйдө',
      },
    },
    {
      video: '/videos/riders-village-road.mp4',
      poster: '/videos/riders-village-road.jpg',
      category: 'horses',
      size: 'tall',
      caption: {
        en: 'Riders setting off',
        ru: 'Всадники отправляются в путь',
        ky: 'Атчандар жолго чыгышты',
      },
    },
  ],
};
