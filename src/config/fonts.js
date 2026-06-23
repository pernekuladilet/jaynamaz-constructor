export const FONTS = [
  {
    id: 'playfair',
    name: 'Playfair',
    family: '"Playfair Display", serif',
    preview: 'Аб',
    description: 'Элегантный с засечками',
  },
  {
    id: 'arabic',
    name: 'Арабский',
    family: '"Scheherazade New", serif',
    preview: 'بسم',
    description: 'Стиль арабской каллиграфии',
  },
  {
    id: 'inter',
    name: 'Современный',
    family: '"Inter", sans-serif',
    preview: 'Аб',
    description: 'Чистый и минималистичный',
  },
];

export const getFontConfig = (id) =>
  FONTS.find((f) => f.id === id) ?? FONTS[0];
