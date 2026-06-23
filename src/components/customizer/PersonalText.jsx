import { FONTS } from '../../config/fonts.js';
import { ru } from '../../i18n/ru.js';

const TEXT_COLORS = [
  { hex: '#C9A227', label: 'Золотой' },
  { hex: '#F5F5F5', label: 'Белый' },
  { hex: '#1A1A1A', label: 'Чёрный' },
  { hex: '#F5D48A', label: 'Светло-золотой' },
  { hex: '#4A90A4', label: 'Голубой' },
];

export default function PersonalText({ text, textFont, textColor, onTextChange, onFontChange, onColorChange }) {
  const maxLen = 30;

  return (
    <div className="panel-section">
      <p className="panel-label">{ru.customizer.sections.text}</p>

      {/* Text input */}
      <div className="relative mb-3">
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder={ru.customizer.textPlaceholder}
          maxLength={maxLen}
          className="w-full px-3 py-2.5 text-sm border-2 border-gray-100 rounded-xl bg-white
            focus:outline-none focus:border-gold-400 transition-colors placeholder:text-gray-300"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-gray-300">
          {text.length}/{maxLen}
        </span>
      </div>

      {/* Font selector */}
      {text.length > 0 && (
        <>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Шрифт
          </p>
          <div className="flex gap-2 mb-3 flex-wrap">
            {FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => onFontChange(f.id)}
                aria-pressed={textFont === f.id}
                className={`
                  px-3 py-1.5 rounded-lg border-2 text-sm transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500
                  ${textFont === f.id
                    ? 'border-gold-500 bg-amber-50 text-rug-dark'
                    : 'border-gray-100 bg-white text-gray-600 hover:border-gold-300'
                  }
                `}
                style={{ fontFamily: f.family }}
              >
                {f.preview}
              </button>
            ))}
          </div>

          {/* Text color */}
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
            Цвет надписи
          </p>
          <div className="flex gap-2 flex-wrap">
            {TEXT_COLORS.map((c) => (
              <button
                key={c.hex}
                onClick={() => onColorChange(c.hex)}
                title={c.label}
                aria-label={c.label}
                aria-pressed={textColor === c.hex}
                className={`
                  w-7 h-7 rounded-full border-2 transition-all duration-150
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gold-500
                  ${textColor === c.hex ? 'scale-110 border-gold-500 shadow-gold' : 'border-gray-200 hover:scale-105'}
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
