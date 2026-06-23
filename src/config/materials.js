export const MATERIALS = [
  {
    id: 'velvet',
    name: 'Бархат',
    description: 'Мягкий классический бархат',
    priceAdd: 0,
    badge: null,
  },
  {
    id: 'velour',
    name: 'Велюр',
    description: 'Практичный и долговечный',
    priceAdd: 1000,
    badge: null,
  },
  {
    id: 'cotton',
    name: 'Хлопок',
    description: 'Натуральный, дышащий',
    priceAdd: 0,
    badge: null,
  },
  {
    id: 'memory_foam',
    name: 'Мемори-пена',
    description: 'Ортопедический комфорт',
    priceAdd: 3000,
    badge: 'Комфорт',
  },
  {
    id: 'silk',
    name: 'Шёлк Premium',
    description: 'Роскошный натуральный шёлк',
    priceAdd: 5000,
    badge: 'Люкс',
  },
  {
    id: 'turkish',
    name: 'Турецкий текстиль',
    description: 'Традиционное турецкое качество',
    priceAdd: 2000,
    badge: 'Турция',
  },
];

export const getMaterialConfig = (id) =>
  MATERIALS.find((m) => m.id === id) ?? MATERIALS[0];
