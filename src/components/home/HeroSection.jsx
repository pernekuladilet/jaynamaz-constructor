import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import RugPreview from '../customizer/RugPreview.jsx';
import { ru } from '../../i18n/ru.js';

const HERO_DESIGN = {
  color: 'dark_green',
  material: 'silk',
  pattern: 'classic_mihrab',
  border: 'ornate',
  text: '',
  textFont: 'arabic',
  textColor: '#F5D48A',
  tassels: true,
  tasselColor: '#C9A227',
  size: 'standard',
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-dark-gradient overflow-hidden flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-islamic opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-rug-dark/80 via-rug-dark/60 to-rug-dark/90" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — Text */}
          <div className="text-white animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Sparkles size={12} />
              {ru.hero.badge}
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              {ru.hero.title}
              <br />
              <span className="text-gradient-gold">{ru.hero.titleHighlight}</span>
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed mb-10 max-w-lg">
              {ru.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/customize"
                className="btn-gold text-base py-3.5 px-7 animate-pulse-gold"
              >
                {ru.hero.cta}
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/templates"
                className="btn-outline border-white/30 text-white hover:bg-white hover:text-rug-dark text-base py-3.5 px-7"
              >
                {ru.hero.ctaSecondary}
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { n: '500+', label: 'Заказов' },
                { n: '4.9★', label: 'Рейтинг' },
                { n: '14', label: 'Дней доставки' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-gradient-gold font-display">{n}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Rug Preview */}
          <div className="flex items-center justify-center animate-float">
            <div className="relative">
              {/* Glow behind rug */}
              <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full scale-75 translate-y-8" />
              <RugPreview design={HERO_DESIGN} className="relative z-10 w-64 sm:w-72 lg:w-80" />
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-gold-500/50" />
      </div>
    </section>
  );
}
