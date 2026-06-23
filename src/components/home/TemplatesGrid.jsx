import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TEMPLATES } from '../../config/templates.js';
import { useCustomizerStore } from '../../store/customizerStore.js';
import { calculatePrice, formatPrice } from '../../utils/pricing.js';
import RugPreview from '../customizer/RugPreview.jsx';

const FEATURED = TEMPLATES.slice(0, 6);

export default function TemplatesGrid() {
  const loadTemplate = useCustomizerStore((s) => s.loadTemplate);
  const navigate = useNavigate();

  function handleSelect(tmpl) {
    loadTemplate(tmpl.config);
    navigate('/customize');
  }

  return (
    <section className="py-24 bg-rug-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="section-title">Готовые коллекции</h2>
            <p className="section-subtitle">Выбери шаблон и настрой под себя</p>
          </div>
          <Link
            to="/templates"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 hover:text-gold-700 transition-colors shrink-0"
          >
            Все шаблоны <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
          {FEATURED.map((tmpl) => (
            <TemplateCard key={tmpl.id} tmpl={tmpl} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TemplateCard({ tmpl, onSelect }) {
  const price = calculatePrice(tmpl.config);

  return (
    <button
      onClick={() => onSelect(tmpl)}
      className="group card text-left hover:shadow-xl hover:-translate-y-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
    >
      {/* Preview */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden aspect-[2/3] flex items-center justify-center">
        {tmpl.badge && (
          <span className={`absolute top-3 left-3 text-[10px] font-bold text-white px-2 py-0.5 rounded-full z-10 ${tmpl.badgeColor}`}>
            {tmpl.badge}
          </span>
        )}
        {tmpl.image ? (
          <img
            src={tmpl.image}
            alt={tmpl.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <RugPreview design={tmpl.config} className="w-28 sm:w-36 p-4" />
        )}
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-sm text-rug-dark font-display">{tmpl.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{tmpl.description}</p>
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm font-bold text-rug-dark">{formatPrice(price)}</p>
          <span className="text-[10px] font-semibold text-gold-600 group-hover:underline">
            Выбрать →
          </span>
        </div>
      </div>
    </button>
  );
}
