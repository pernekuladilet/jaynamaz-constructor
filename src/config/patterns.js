export const PATTERNS = [
  {
    id: 'classic_mihrab',
    name: 'Классический михраб',
    category: 'Традиционный',
    description: 'Классическая арка с исламскими мотивами',
  },
  {
    id: 'geometric',
    name: 'Геометрический',
    category: 'Геометрия',
    description: 'Восьмиконечные звёзды и многоугольники',
  },
  {
    id: 'floral',
    name: 'Цветочный',
    category: 'Флоральный',
    description: 'Арабеска с цветочными мотивами',
  },
  {
    id: 'minimal',
    name: 'Минимализм',
    category: 'Современный',
    description: 'Чистые линии и простые формы',
  },
  {
    id: 'mosque',
    name: 'Силуэт мечети',
    category: 'Архитектура',
    description: 'Купол и минареты в профиль',
  },
  {
    id: 'arabesque',
    name: 'Арабеска',
    category: 'Орнамент',
    description: 'Сложный переплетённый растительный орнамент',
  },
  {
    id: 'kazakh',
    name: 'Казахский',
    category: 'Этнический',
    description: 'Традиционные казахские мотивы',
  },
  {
    id: 'none',
    name: 'Без узора',
    category: 'Чистый',
    description: 'Однотонный коврик без рисунка',
  },
];

export const getPatternConfig = (id) =>
  PATTERNS.find((p) => p.id === id) ?? PATTERNS[0];
