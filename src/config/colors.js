export const COLORS = [
  { id: 'dark_green',  name: 'Тёмно-зелёный', hex: '#1B4332', accentHex: '#C9A227' },
  { id: 'burgundy',   name: 'Бордовый',       hex: '#6B1E2E', accentHex: '#F5D48A' },
  { id: 'dark_blue',  name: 'Тёмно-синий',    hex: '#1B2A4A', accentHex: '#C9A227' },
  { id: 'black',      name: 'Чёрный',          hex: '#1A1A1A', accentHex: '#C9A227' },
  { id: 'beige',      name: 'Бежевый',         hex: '#8B6914', accentHex: '#F8F0D8' },
  { id: 'gray',       name: 'Серый',           hex: '#3A3A4A', accentHex: '#C9A227' },
  { id: 'emerald',    name: 'Изумрудный',      hex: '#0D6B4A', accentHex: '#F5D48A' },
  { id: 'teal',       name: 'Бирюзовый',       hex: '#0A5B5B', accentHex: '#F5D48A' },
];

export const getColorConfig = (id) =>
  COLORS.find((c) => c.id === id) ?? COLORS[0];
