import { Check } from 'lucide-react';
import { SIZES } from '../../config/sizes.js';
import { formatPrice } from '../../utils/pricing.js';
import { ru } from '../../i18n/ru.js';

export default function SizeSelector({ value, onChange }) {
  return (
    <div className="panel-section">
      <p className="panel-label">{ru.customizer.sections.size}</p>
      <div className="grid grid-cols-2 gap-2">
        {SIZES.map((s) => (
          <button
            key={s.id}
            onClick={() => onChange(s.id)}
            aria-pressed={value === s.id}
            className={`
              relative text-left p-3 rounded-xl border-2 transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
              ${value === s.id
                ? 'border-gold-500 bg-amber-50'
                : 'border-gray-100 bg-white hover:border-gold-300'
              }
            `}
          >
            {value === s.id && (
              <Check size={12} className="absolute top-2 right-2 text-gold-600" strokeWidth={3} />
            )}
            <p className="text-xs font-semibold text-gray-800">{s.name}</p>
            <p className="text-[10px] text-gray-400 mt-0.5">{s.dimensions}</p>
            {s.priceAdd > 0 && (
              <p className="text-[10px] font-semibold text-gold-600 mt-1">
                +{formatPrice(s.priceAdd)}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
