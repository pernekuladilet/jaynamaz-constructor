import { Check } from 'lucide-react';
import { COLORS } from '../../config/colors.js';
import { ru } from '../../i18n/ru.js';

export default function ColorPicker({ value, onChange }) {
  return (
    <div className="panel-section">
      <p className="panel-label">{ru.customizer.sections.color}</p>
      <div className="grid grid-cols-4 gap-2">
        {COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            title={c.name}
            aria-label={c.name}
            aria-pressed={value === c.id}
            className={`
              relative h-10 rounded-lg transition-all duration-150
              ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
              ${value === c.id
                ? 'ring-2 ring-gold-500 scale-105 shadow-gold'
                : 'ring-1 ring-black/10 hover:scale-105 hover:shadow-md'
              }
            `}
            style={{ backgroundColor: c.hex }}
          >
            {value === c.id && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Check size={14} style={{ color: c.accentHex }} strokeWidth={3} />
              </span>
            )}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-400">
        {COLORS.find((c) => c.id === value)?.name}
      </p>
    </div>
  );
}
