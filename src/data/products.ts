import paint1 from '@/assets/images/paint_1.png';
import paint2 from '@/assets/images/paint_2.png';
import paint3 from '@/assets/images/paint_3.png';
import paint4 from '@/assets/images/paint_4.png';
import p1d1 from '@/assets/images/p_1_d_1.jpg';
import p1d2 from '@/assets/images/p_1_d_2.jpg';
import p1d3 from '@/assets/images/p_1_d_3.jpg';
import p2d1 from '@/assets/images/p_2_d_1.jpg';
import p2d2 from '@/assets/images/p_2_d_2.jpg';
import p2d3 from '@/assets/images/p_2_d_3.jpg';
import p3d1 from '@/assets/images/p_3_d_1.jpg';
import p3d2 from '@/assets/images/p_3_d_2.jpg';
import p3d3 from '@/assets/images/p_3_d_3.jpg';
import p4d1 from '@/assets/images/p_4_d_1.jpg';
import p4d2 from '@/assets/images/p_4_d_2.jpg';
import p4d3 from '@/assets/images/p_4_d_3.jpg';
import type { NavLink, Product } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Каталог', to: '/' },
  { label: 'Доставка', to: '/delivery' },
  { label: 'Оплата', to: '/payment' },
  { label: 'Контакты', to: '/contacts' },
  { label: 'О компании', to: '/about' },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: '«Рождение Венеры»',
    author: 'Сандро Боттичелли',
    description:
      'Картина итальянского художника тосканской школы Сандро Боттичелли. Представляет собой живопись темперой на холсте размером 172,5 × 278,5 см. В настоящее время хранится в галерее Уффици, Флоренция.',
    image: paint1,
    gallery: [paint1, p1d1, p1d2, p1d3],
    oldPrice: 2000000,
    price: 1000000,
    isSold: false,
  },
  {
    id: 2,
    title: '«Тайная вечеря»',
    author: 'Леонардо да Винчи',
    description:
      'Монументальная роспись работы Леонардо да Винчи, изображающая сцену последней трапезы Христа со своими учениками. Создана в 1495—1498 годы в доминиканском монастыре Санта-Мария-делле-Грацие в Милане.',
    image: paint2,
    gallery: [paint2, p2d1, p2d2, p2d3],
    oldPrice: null,
    price: 3000000,
    isSold: false,
  },
  {
    id: 3,
    title: '«Сотворение Адама»',
    author: 'Микеланджело',
    description:
      'Фреска Микеланджело, написанная около 1511 года. Является четвёртой из девяти центральных композиций потолка Сикстинской капеллы, посвящённых девяти сюжетам книги Бытия.',
    image: paint3,
    gallery: [paint3, p3d1, p3d2, p3d3],
    oldPrice: 6000000,
    price: 5000000,
    isSold: false,
  },
  {
    id: 4,
    title: '«Урок анатомии»',
    author: 'Рембрандт',
    description:
      'Центральная фигура картины — доктор Николас Тульп, который показывает собравшимся устройство мускулатуры руки человека. Одна из самых известных работ раннего периода Рембрандта.',
    image: paint4,
    gallery: [paint4, p4d1, p4d2, p4d3],
    oldPrice: null,
    price: null,
    isSold: true,
  },
];

export function findProductById(id: number): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}
