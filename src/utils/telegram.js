import { formatPrice } from './pricing.js';
import { getColorConfig } from '../config/colors.js';
import { getMaterialConfig } from '../config/materials.js';
import { getPatternConfig } from '../config/patterns.js';
import { getBorderConfig } from '../config/borders.js';
import { getSizeConfig } from '../config/sizes.js';

function buildOrderMessage(cartItems, buyer) {
  const lines = [
    '🕌 *НОВЫЙ ЗАКАЗ — Жайнамаз*',
    '━━━━━━━━━━━━━━━━━━━━',
    '',
    '👤 *Покупатель:*',
    `• Имя: ${buyer.name}`,
    `• Телефон: ${buyer.phone}`,
    `• Город: ${buyer.city}`,
    `• Адрес: ${buyer.address || 'Самовывоз'}`,
    buyer.comment ? `• Комментарий: ${buyer.comment}` : '',
    '',
    '🛍 *Заказ:*',
  ];

  cartItems.forEach((item, idx) => {
    const color = getColorConfig(item.color);
    const material = getMaterialConfig(item.material);
    const pattern = getPatternConfig(item.pattern);
    const border = getBorderConfig(item.border);
    const size = getSizeConfig(item.size);

    lines.push(`\n*Позиция ${idx + 1}* (кол-во: ${item.quantity})`);
    lines.push(`• Цвет: ${color.name}`);
    lines.push(`• Материал: ${material.name}`);
    lines.push(`• Узор: ${pattern.name}`);
    lines.push(`• Бордюр: ${border.name}`);
    lines.push(`• Размер: ${size.name} (${size.dimensions})`);
    if (item.text) lines.push(`• Надпись: «${item.text}»`);
    lines.push(`• Кисточки: ${item.tassels ? 'Да' : 'Нет'}`);
    lines.push(`• Цена: ${formatPrice(item.price)}`);
  });

  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━');
  lines.push(`💰 *Итого: ${formatPrice(total)}*`);

  return lines.filter((l) => l !== '').join('\n');
}

export async function sendOrderToTelegram(cartItems, buyer) {
  const token = import.meta.env.VITE_TG_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TG_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Telegram не настроен: укажите VITE_TG_BOT_TOKEN и VITE_TG_CHAT_ID в .env');
  }

  const text = buildOrderMessage(cartItems, buyer);
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.description || 'Ошибка отправки в Telegram');
  }

  return true;
}
