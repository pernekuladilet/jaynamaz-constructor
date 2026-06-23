import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowLeft, Send } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../utils/pricing.js';
import { sendOrderToTelegram } from '../utils/telegram.js';
import { ru } from '../i18n/ru.js';

const DELIVERY_OPTIONS = [
  { id: 'courier', label: 'Курьер по городу' },
  { id: 'pickup',  label: 'Самовывоз (Алматы)' },
  { id: 'kazpost', label: 'Казпочта по Казахстану' },
];

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = ru.checkout.required;
  if (!form.phone.trim()) {
    errors.phone = ru.checkout.required;
  } else if (!/^\+7[\s\-]?\d{3}[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(form.phone.trim())) {
    errors.phone = ru.checkout.phoneError;
  }
  if (!form.city.trim()) errors.city = ru.checkout.required;
  return errors;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', phone: '', city: '', address: '', comment: '', delivery: 'courier',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  if (items.length === 0 && status !== 'success') {
    return (
      <main className="min-h-screen bg-rug-cream pt-20 flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <p className="text-gray-400 mb-6">Корзина пуста</p>
          <Link to="/customize" className="btn-gold">Создать жайнамаз</Link>
        </div>
      </main>
    );
  }

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-rug-cream pt-20 flex items-center justify-center">
        <div className="text-center py-20 px-4 max-w-md mx-auto animate-slide-up">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-5" />
          <h1 className="font-display text-3xl font-bold text-rug-dark mb-3">
            {ru.checkout.successTitle}
          </h1>
          <p className="text-gray-500 leading-relaxed mb-8">
            {ru.checkout.successDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/" className="btn-dark">На главную</Link>
            <Link to="/customize" className="btn-outline">Создать ещё</Link>
          </div>
        </div>
      </main>
    );
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setStatus('loading');
    try {
      await sendOrderToTelegram(items, { ...form });
      clearCart();
      setStatus('success');
    } catch (err) {
      setErrorMsg(err.message || 'Неизвестная ошибка');
      setStatus('error');
    }
  }

  const f = ru.checkout.fields;
  const p = ru.checkout.placeholders;

  return (
    <main className="min-h-screen bg-rug-cream pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Back */}
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gold-600 transition-colors mb-8">
          <ArrowLeft size={15} />
          Назад в корзину
        </Link>

        <h1 className="section-title mb-8">{ru.checkout.title}</h1>

        {status === 'error' && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-fade-in">
            <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-700">{ru.checkout.errorTitle}</p>
              <p className="text-sm text-red-600 mt-0.5">{errorMsg}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="lg:col-span-2 space-y-4">
            <div className="card p-6 space-y-4">
              <h2 className="font-semibold text-gray-700 text-sm">Контактные данные</h2>

              <Field label={f.name} error={errors.name}>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder={p.name} className={inputClass(errors.name)} />
              </Field>

              <Field label={f.phone} error={errors.phone}>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  placeholder={p.phone} className={inputClass(errors.phone)} />
              </Field>

              <Field label={f.city} error={errors.city}>
                <input name="city" value={form.city} onChange={handleChange}
                  placeholder={p.city} className={inputClass(errors.city)} />
              </Field>
            </div>

            <div className="card p-6 space-y-4">
              <h2 className="font-semibold text-gray-700 text-sm">Доставка</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {DELIVERY_OPTIONS.map((opt) => (
                  <label
                    key={opt.id}
                    className={`
                      flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all
                      ${form.delivery === opt.id
                        ? 'border-gold-500 bg-amber-50'
                        : 'border-gray-100 hover:border-gold-300'
                      }
                    `}
                  >
                    <input type="radio" name="delivery" value={opt.id}
                      checked={form.delivery === opt.id} onChange={handleChange}
                      className="accent-gold-500" />
                    <span className="text-sm text-gray-700">{opt.label}</span>
                  </label>
                ))}
              </div>

              {form.delivery !== 'pickup' && (
                <Field label={f.address}>
                  <input name="address" value={form.address} onChange={handleChange}
                    placeholder={p.address} className={inputClass()} />
                </Field>
              )}
            </div>

            <div className="card p-6">
              <Field label={f.comment}>
                <textarea name="comment" value={form.comment} onChange={handleChange}
                  placeholder={p.comment} rows={3}
                  className={`${inputClass()} resize-none`} />
              </Field>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold w-full justify-center text-base py-3.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <Send size={17} />
              {status === 'loading' ? ru.checkout.submitting : ru.checkout.submit}
            </button>
          </form>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="font-semibold text-gray-700 text-sm mb-4">Ваш заказ</h2>
              <div className="space-y-2 mb-4">
                {items.map((item, i) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-500">
                    <span>Жайнамаз #{i + 1} × {item.quantity}</span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between items-baseline">
                <span className="font-semibold text-gray-700 text-sm">Итого</span>
                <span className="text-xl font-bold text-rug-dark font-display">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                Оплата при получении. Мы свяжемся для подтверждения в течение нескольких часов.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full px-3 py-2.5 text-sm border-2 rounded-xl bg-white transition-colors
    focus:outline-none placeholder:text-gray-300
    ${error
      ? 'border-red-300 focus:border-red-400'
      : 'border-gray-100 focus:border-gold-400'
    }`;
}
