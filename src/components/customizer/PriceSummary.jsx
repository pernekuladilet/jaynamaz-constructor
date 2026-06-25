import { ShoppingCart, RotateCcw } from 'lucide-react';
import { calculatePrice, getPriceBreakdown, formatPrice } from '../../utils/pricing.js';
import { ru } from '../../i18n/ru.js';

export default function PriceSummary({ design, onAddToCart, onReset, added }) {
  const price = calculatePrice(design);
  const breakdown = getPriceBreakdown(design);

  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-100 pt-4 pb-4 mt-6">
      {/* Price breakdown */}
      <div className="space-y-1 mb-3">
        {breakdown.map((line) => (
          <div key={line.label} className="flex justify-between text-xs text-gray-500">
            <span>{line.label}</span>
            <span className="font-medium">{formatPrice(line.amount)}</span>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-baseline mb-4 border-t border-gray-100 pt-3">
        <span className="text-sm font-semibold text-gray-700">{ru.customizer.total}</span>
        <span className="text-2xl font-bold text-rug-dark font-display">
          {formatPrice(price)}
        </span>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onReset}
          title={ru.customizer.resetDesign}
          aria-label={ru.customizer.resetDesign}
          className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-gray-100 text-gray-400 hover:border-gold-300 hover:text-gold-600 transition-all duration-150 shrink-0"
        >
          <RotateCcw size={16} />
        </button>

        <button
          onClick={onAddToCart}
          className={`
            flex-1 flex items-center justify-center gap-2 h-11 rounded-full font-semibold text-sm
            transition-all duration-200 active:scale-[0.98]
            ${added
              ? 'bg-rug-green text-white'
              : 'bg-gold-500 text-white hover:bg-gold-600 hover:-translate-y-0.5 hover:shadow-lg shadow-gold'
            }
          `}
        >
          <ShoppingCart size={17} />
          {added ? ru.customizer.addedToCart : ru.customizer.addToCart}
        </button>
      </div>
    </div>
  );
}
