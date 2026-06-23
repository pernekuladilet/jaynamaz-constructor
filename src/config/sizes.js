export const SIZES = [
  {
    id: 'standard',
    name: 'Стандарт',
    dimensions: '60 × 100 см',
    description: 'Классический размер для взрослых',
    priceAdd: 0,
  },
  {
    id: 'large',
    name: 'Большой',
    dimensions: '80 × 120 см',
    description: 'Увеличенный размер — больше комфорта',
    priceAdd: 2000,
  },
  {
    id: 'child',
    name: 'Детский',
    dimensions: '45 × 80 см',
    description: 'Для детей от 5 лет',
    priceAdd: 0,
  },
  {
    id: 'gift',
    name: 'Подарочный',
    dimensions: '60 × 100 см',
    description: 'С фирменной коробкой и лентой',
    priceAdd: 500,
  },
];

export const getSizeConfig = (id) =>
  SIZES.find((s) => s.id === id) ?? SIZES[0];
