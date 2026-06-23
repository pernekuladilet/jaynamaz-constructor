export const BORDERS = [
  {
    id: 'classic',
    name: 'Классическая',
    description: 'Двойная золотая рамка',
  },
  {
    id: 'ornate',
    name: 'Орнаментальная',
    description: 'Декоративный узор по периметру',
  },
  {
    id: 'double',
    name: 'Двойная',
    description: 'Две параллельные линии',
  },
  {
    id: 'simple',
    name: 'Простая',
    description: 'Тонкая однолинейная рамка',
  },
  {
    id: 'none',
    name: 'Без бордюра',
    description: 'Без декоративной каймы',
  },
];

export const getBorderConfig = (id) =>
  BORDERS.find((b) => b.id === id) ?? BORDERS[0];
