import { ru } from '../../i18n/ru.js';

const TASSEL_COLORS = [
  { hex: '#C9A227', label: 'Золотой' },
  { hex: '#F5D48A', label: 'Светло-золотой' },
  { hex: '#1B4332', label: 'Тёмно-зелёный' },
  { hex: '#F5F5F5', label: 'Белый' },
  { hex: '#1A1A1A', label: 'Чёрный' },
  { hex: '#6B1E2E', label: 'Бордовый' },
];

export default function TasselControl({ tassels, tasselColor, onToggle, onColorChange }) {
  return (
    <div className="panel-section">
      <div className="flex items-center justify-between mb-3">
        <p className="panel-label mb-0">{ru.customizer.sections.tassels}</p>
        {/* Toggle switch */}
        <button
          role="switch"
          aria-checked={tassels}
          onClick={() => onToggle(!tassels)}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
            ${tassels ? 'bg-gold-500' : 'bg-gray-200'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200
              ${tassels ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </div>

      {tassels && (
        <>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
            {ru.customizer.sections.tasselColor}
          </p>
          <div className="flex gap-2 flex-wrap">
            {TASSEL_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => onColorChange(c.hex)}
                title={c.label}
                aria-label={c.label}
                aria-pressed={tasselColor === c.hex}
                className={`
                  w-7 h-7 rounded-full border-2 transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gold-500
                  ${tasselColor === c.hex ? 'scale-110 border-gold-500 shadow-gold' : 'border-gray-200 hover:scale-105'}
                `}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
