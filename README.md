# Жайнамаз — Конструктор молитвенных ковриков

Веб-приложение для кастомизации и заказа жайнамазов в стиле Nike By You.

## Быстрый старт

```bash
cd jaynamaz
npm install
cp .env.example .env   # заполни токен Telegram
npm run dev
```

Открой [http://localhost:5173](http://localhost:5173)

---

## Настройка Telegram

Заказы отправляются в Telegram. Получи токен и chat_id:

1. Напиши @BotFather → `/newbot` → получи **BOT_TOKEN**
2. Напиши @userinfobot → получи **CHAT_ID**
3. Заполни `.env`:

```env
VITE_TG_BOT_TOKEN=123456789:AAHdqTcvCH1vGWJxfSeofSs0K95sCNm1
VITE_TG_CHAT_ID=987654321
```

> **⚠️ Безопасность:** токен бота виден в браузере (Vite `VITE_` переменные встраиваются в бандл).
> Для продакшена вынеси отправку на backend (Vercel Functions / Railway).
> Для MVP это допустимо — боту можно только **отправлять** сообщения, не читать другие.

---

## Структура проекта

```
src/
├── config/         ← все опции и цены (менять здесь)
│   ├── colors.js
│   ├── materials.js
│   ├── patterns.js
│   ├── borders.js
│   ├── sizes.js
│   ├── fonts.js
│   ├── pricing.js  ← BASE_PRICE и все надбавки
│   └── templates.js
├── utils/
│   ├── pricing.js  ← calculatePrice(), formatPrice()
│   └── telegram.js ← sendOrderToTelegram()
├── store/
│   └── customizerStore.js  (Zustand)
├── context/
│   └── CartContext.jsx     (localStorage)
├── i18n/
│   └── ru.js       ← все UI-строки на русском
├── components/
│   ├── layout/     (Navbar, Footer)
│   ├── customizer/ (RugPreview + панели)
│   └── home/       (HeroSection и др.)
└── pages/          (5 страниц)
```

---

## Как менять цены

Открой `src/config/pricing.js`:

```js
export const BASE_PRICE = 10000;        // базовая цена в тенге

export const MATERIAL_PRICE_ADD = {
  velvet:      0,
  velour:      1000,
  silk:        5000,
  // ...
};
```

Изменения подхватываются автоматически — пересчёт в реальном времени.

---

## Как добавить новый цвет

В `src/config/colors.js`:

```js
{ id: 'olive', name: 'Оливковый', hex: '#4A5240', accentHex: '#C9A227' },
```

---

## Как добавить новый шаблон

В `src/config/templates.js` добавь объект:

```js
{
  id: 'my_new',
  name: 'My New Design',
  description: 'Описание',
  badge: 'Новинка',
  badgeColor: 'bg-green-600',
  config: {
    color: 'dark_green',
    material: 'velvet',
    pattern: 'classic_mihrab',
    border: 'classic',
    size: 'standard',
    text: '',
    textFont: 'playfair',
    textColor: '#C9A227',
    tassels: false,
    tasselColor: '#C9A227',
  },
},
```

---

## Добавить новый язык (казахский)

1. Создай `src/i18n/kz.js` по образцу `ru.js`
2. В компонентах замени `import { ru }` → добавь переключатель языка

---

## Деплой на Vercel

```bash
npm install -g vercel
vercel
```

При первом деплое Vercel спросит параметры проекта.
В дашборде Vercel → Settings → Environment Variables добавь:
- `VITE_TG_BOT_TOKEN`
- `VITE_TG_CHAT_ID`

Готово — приложение доступно по `https://your-project.vercel.app`

---

## Tech Stack

- **React 18** + **Vite** — сборка
- **Tailwind CSS** — стили
- **Zustand** — состояние конструктора
- **react-router-dom** — роутинг
- **lucide-react** — иконки
- **localStorage** — корзина
- **Telegram Bot API** — доставка заказов
