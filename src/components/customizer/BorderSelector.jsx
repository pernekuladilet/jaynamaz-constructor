import { Check } from 'lucide-react';
import { BORDERS } from '../../config/borders.js';
import { ru } from '../../i18n/ru.js';

export default function BorderSelector({ value, onChange }) {
  return (
    <div className="panel-section">
      <p className="panel-label">{ru.customizer.sections.border}</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {BORDERS.map((b) => (
          <button
            key={b.id}
            onClick={() => onChange(b.id)}
            aria-pressed={value === b.id}
            className={`
              relative text-left p-3 rounded-xl border-2 transition-all duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
              ${value === b.id
                ? 'border-gold-500 bg-amber-50'
                : 'border-gray-100 bg-white hover:border-gold-300'
              }
            `}
          >
            {value === b.id && (
              <Check size={12} className="absolute top-2 right-2 text-gold-600" strokeWidth={3} />
            )}
            <BorderPreviewIcon id={b.id} selected={value === b.id} />
            <p className="text-xs font-semibold text-gray-800 mt-1.5">{b.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function BorderPreviewIcon({ id, selected }) {
  const color = selected ? '#C9A227' : '#9CA3AF';
  const icons = {
    classic: (
      <svg viewBox="0 0 28 20" className="w-7 h-5">
        <rect x="1" y="1" width="26" height="18" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
        <rect x="3" y="3" width="22" height="14" rx="1" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
      </svg>
    ),
    ornate: (
      <svg viewBox="0 0 28 20" className="w-7 h-5">
        <rect x="1" y="1" width="26" height="18" rx="2" fill="none" stroke={color} strokeWidth="1.5" />
        <circle cx="1" cy="1" r="2" fill={color} />
        <circle cx="27" cy="1" r="2" fill={color} />
        <circle cx="1" cy="19" r="2" fill={color} />
        <circle cx="27" cy="19" r="2" fill={color} />
        <rect x="12" y="9" width="4" height="4" fill={color} opacity="0.5" transform="rotate(45,14,11)" />
      </svg>
    ),
    double: (
      <svg viewBox="0 0 28 20" className="w-7 h-5">
        <rect x="1" y="1" width="26" height="18" rx="2" fill="none" stroke={color} strokeWidth="2" />
        <rect x="4" y="4" width="20" height="12" rx="1" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      </svg>
    ),
    simple: (
      <svg viewBox="0 0 28 20" className="w-7 h-5">
        <rect x="2" y="2" width="24" height="16" rx="2" fill="none" stroke={color} strokeWidth="1" opacity="0.8" />
      </svg>
    ),
    none: (
      <svg viewBox="0 0 28 20" className="w-7 h-5">
        <rect x="1" y="1" width="26" height="18" rx="2" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="3,2" opacity="0.4" />
      </svg>
    ),
  };
  return icons[id] ?? icons.simple;
}
