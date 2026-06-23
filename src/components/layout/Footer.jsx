import { Link } from 'react-router-dom';
import { ru } from '../../i18n/ru.js';

export default function Footer() {
  return (
    <footer className="bg-rug-dark text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl font-display font-semibold">Жайнамаз</span>
              <span className="text-[10px] font-semibold text-gold-400 border border-gold-600 px-1.5 py-0.5 rounded-full">
                BY YOU
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {ru.footer.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Навигация
            </p>
            <ul className="space-y-2">
              {[
                { to: '/', label: ru.nav.home },
                { to: '/templates', label: ru.nav.templates },
                { to: '/customize', label: ru.nav.customize },
                { to: '/cart', label: ru.nav.cart },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-gray-400 hover:text-gold-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
              Контакты
            </p>
            <ul className="space-y-2">
              <li className="text-sm text-gray-400">Казахстан, Алматы</li>
              <li>
                <a href="https://wa.me/77001234567" className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                  WhatsApp: +7 700 123 45 67
                </a>
              </li>
              <li>
                <a href="https://t.me/jaynamaz_kz" className="text-sm text-gray-400 hover:text-gold-400 transition-colors">
                  Telegram: @jaynamaz_kz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">{ru.footer.rights}</p>
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">Сделано с</span>
            <span className="text-gold-500">♥</span>
            <span className="text-xs text-gray-500">в Казахстане</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
