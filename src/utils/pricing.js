import {
  BASE_PRICE,
  MATERIAL_PRICE_ADD,
  SIZE_PRICE_ADD,
  PERSONALIZATION_PRICE,
  TASSELS_PRICE,
} from '../config/pricing.js';

export function calculatePrice(design) {
  const { material, size, text, tassels } = design;

  let total = BASE_PRICE;
  total += MATERIAL_PRICE_ADD[material] ?? 0;
  total += SIZE_PRICE_ADD[size] ?? 0;
  if (text && text.trim().length > 0) total += PERSONALIZATION_PRICE;
  if (tassels) total += TASSELS_PRICE;

  return total;
}

export function getPriceBreakdown(design) {
  const { material, size, text, tassels } = design;
  const lines = [{ label: 'Базовая цена', amount: BASE_PRICE }];

  const matAdd = MATERIAL_PRICE_ADD[material] ?? 0;
  if (matAdd > 0) lines.push({ label: 'Материал', amount: matAdd });

  const sizeAdd = SIZE_PRICE_ADD[size] ?? 0;
  if (sizeAdd > 0) lines.push({ label: 'Размер', amount: sizeAdd });

  if (text && text.trim().length > 0)
    lines.push({ label: 'Персонализация', amount: PERSONALIZATION_PRICE });

  if (tassels) lines.push({ label: 'Кисточки', amount: TASSELS_PRICE });

  return lines;
}

export function formatPrice(amount) {
  return `${amount.toLocaleString('ru-RU')} ₸`;
}
