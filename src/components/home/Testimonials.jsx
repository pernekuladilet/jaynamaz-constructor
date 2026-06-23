import { Star } from 'lucide-react';
import { ru } from '../../i18n/ru.js';

const REVIEWS = [
  {
    name: 'Асель Н.',
    city: 'Алматы',
    text: 'Заказала жайнамаз с именем мамы в подарок — она была в восторге. Качество бархата превзошло ожидания. Буду заказывать ещё!',
    rating: 5,
    date: 'Декабрь 2024',
  },
  {
    name: 'Нуржан К.',
    city: 'Астана',
    text: 'Конструктор очень удобный, сразу видно как будет выглядеть. Турецкий текстиль — плотный и красивый. Доставили за 10 дней.',
    rating: 5,
    date: 'Ноябрь 2024',
  },
  {
    name: 'Гульнара М.',
    city: 'Шымкент',
    text: 'Взяла Ramadan Edition. Изумрудный цвет такой насыщенный, золотые узоры выглядят дорого. Очень довольна покупкой.',
    rating: 5,
    date: 'Октябрь 2024',
  },
];

export default function Testimonials() {
  const { title, subtitle } = ru.testimonials;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="card p-6 flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(r.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-gold-500 fill-gold-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-gray-600 leading-relaxed flex-1">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div>
                  <p className="text-sm font-semibold text-rug-dark">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.city}</p>
                </div>
                <p className="text-xs text-gray-300">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
