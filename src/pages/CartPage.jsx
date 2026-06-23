import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/pricing.js';
import { getColorConfig } from '../config/colors.js';
import { getMaterialConfig } from '../config/materials.js';
import { getPatternConfig } from '../config/patterns.js';
import { getSizeConfig } from '../config/sizes.js';
import RugPreview from '../components/customizer/RugPreview.jsx';
import { ru } from '../i18n/ru.js';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-rug-cream pt-20 flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <ShoppingBag size={56} className="text-gray-200 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-semibold text-rug-dark mb-2">
            {ru.cart.empty}
          </h2>
          <p className="text-gray-400 mb-8">{ru.cart.emptyDesc}</p>
          <Link to="/customize" className="btn-gold">
            {ru.cart.goCustomize}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-rug-cream pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="section-title mb-8">{ru.cart.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onQuantity={(q) => updateQuantity(item.id, q)}
              />
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-display text-lg font-semibold text-rug-dark mb-4">
                Итого
              </h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-500">
                    <span className="truncate mr-2">
                      {getPatternConfig(item.pattern).name} × {item.quantity}
                    </span>
                    <span className="shrink-0 font-medium">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between items-baseline mb-6">
                <span className="font-semibold text-gray-700">{ru.cart.total}</span>
                <span className="text-2xl font-bold text-rug-dark font-display">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <Link to="/checkout" className="btn-gold w-full justify-center text-base">
                {ru.cart.checkout}
                <ArrowRight size={18} />
              </Link>
              <Link to="/customize" className="block text-center text-sm text-gray-400 hover:text-gold-600 mt-3 transition-colors">
                + Добавить ещё
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function CartItem({ item, onRemove, onQuantity }) {
  const color = getColorConfig(item.color);
  const material = getMaterialConfig(item.material);
  const pattern = getPatternConfig(item.pattern);
  const size = getSizeConfig(item.size);

  return (
    <div className="card flex gap-4 p-4">
      {/* Preview */}
      <div className="shrink-0 w-20 h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        <RugPreview design={item} className="w-16" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm text-rug-dark font-display">
              {pattern.name}
            </h3>
            <div className="mt-1 space-y-0.5">
              <p className="text-xs text-gray-400">
                <span
                  className="inline-block w-3 h-3 rounded-full border border-gray-200 mr-1 align-middle"
                  style={{ backgroundColor: color.hex }}
                />
                {color.name} · {material.name}
              </p>
              <p className="text-xs text-gray-400">{size.name} ({size.dimensions})</p>
              {item.text && (
                <p className="text-xs text-gray-400">Надпись: «{item.text}»</p>
              )}
              {item.tassels && (
                <p className="text-xs text-gray-400">Кисточки: да</p>
              )}
            </div>
          </div>
          <button
            onClick={onRemove}
            aria-label="Удалить"
            className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Quantity + price */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2 border border-gray-200 rounded-full px-1">
            <button
              onClick={() => onQuantity(item.quantity - 1)}
              aria-label="Уменьшить"
              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-rug-dark transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="text-sm font-semibold text-rug-dark w-4 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => onQuantity(item.quantity + 1)}
              aria-label="Увеличить"
              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-rug-dark transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>
          <p className="font-bold text-rug-dark">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
