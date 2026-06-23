import { Check } from 'lucide-react';
import { PATTERNS } from '../../config/patterns.js';
import { ru } from '../../i18n/ru.js';

const CATEGORY_COLORS = {
  'Традиционный': 'text-amber-700 bg-amber-50',
  'Геометрия':    'text-blue-700 bg-blue-50',
  'Флоральный':   'text-rose-700 bg-rose-50',
  'Современный':  'text-gray-700 bg-gray-100',
  'Архитектура':  'text-teal-700 bg-teal-50',
  'Орнамент':     'text-purple-700 bg-purple-50',
  'Этнический':   'text-sky-700 bg-sky-50',
  'Чистый':       'text-gray-500 bg-gray-50',
};

export default function PatternSelector({ value, onChange }) {
  return (
    <div className="panel-section">
      <p className="panel-label">{ru.customizer.sections.pattern}</p>
      <div className="grid grid-cols-2 gap-2">
        {PATTERNS.map((p) => (
          <button
            key={p.id}
            onClick={() => onChange(p.id)}
            aria-pressed={value === p.id}
            className={`
              relative text-left p-3 rounded-xl border-2 transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
              ${value === p.id
                ? 'border-gold-500 bg-amber-50'
                : 'border-gray-100 bg-white hover:border-gold-300'
              }
            `}
          >
            {value === p.id && (
              <Check size={12} className="absolute top-2 right-2 text-gold-600" strokeWidth={3} />
            )}
            <span className={`inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full mb-1.5 ${CATEGORY_COLORS[p.category] ?? 'text-gray-600 bg-gray-100'}`}>
              {p.category}
            </span>
            <p className="text-xs font-semibold text-gray-800 leading-tight">{p.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
