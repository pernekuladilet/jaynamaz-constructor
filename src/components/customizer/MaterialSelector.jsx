import { MATERIALS } from '../../config/materials.js';
import { formatPrice } from '../../utils/pricing.js';
import { ru } from '../../i18n/ru.js';

export default function MaterialSelector({ value, onChange }) {
  return (
    <div className="panel-section">
      <p className="panel-label">{ru.customizer.sections.material}</p>
      <div className="space-y-2">
        {MATERIALS.map((m) => (
          <button
            key={m.id}
            onClick={() => onChange(m.id)}
            aria-pressed={value === m.id}
            className={`
              w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2
              text-left transition-all duration-150 text-sm
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
              ${value === m.id
                ? 'border-gold-500 bg-amber-50'
                : 'border-gray-100 bg-white hover:border-gold-300'
              }
            `}
          >
            <span>
              <span className={`font-medium ${value === m.id ? 'text-rug-dark' : 'text-gray-700'}`}>
                {m.name}
              </span>
              <span className="block text-xs text-gray-400 mt-0.5">{m.description}</span>
            </span>
            <span className="flex flex-col items-end gap-1 shrink-0 ml-2">
              {m.priceAdd > 0 && (
                <span className="text-xs font-semibold text-gold-600">
                  +{formatPrice(m.priceAdd)}
                </span>
              )}
              {m.badge && (
                <span className="text-[10px] font-semibold bg-gold-500 text-white px-1.5 py-0.5 rounded-full">
                  {m.badge}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
