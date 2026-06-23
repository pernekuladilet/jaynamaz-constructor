import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext.jsx';
import { ru } from '../../i18n/ru.js';

export default function Navbar() {
  const { totalItems } = useCart();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const links = [
    { to: '/', label: ru.nav.home },
    { to: '/templates', label: ru.nav.templates },
    { to: '/customize', label: ru.nav.customize },
  ];

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 focus-visible:outline-none">
          <span className="text-xl font-display font-semibold text-rug-dark">
            Жайнамаз
          </span>
          <span className="hidden sm:inline-block text-[10px] font-semibold text-gold-500 border border-gold-400 px-1.5 py-0.5 rounded-full tracking-wide">
            BY YOU
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
                ${isActive(to)
                  ? 'bg-rug-dark text-white'
                  : 'text-gray-600 hover:text-rug-dark hover:bg-gray-100'
                }
              `}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/customize"
            className="hidden md:flex btn-gold text-sm py-2 px-4"
          >
            Создать
          </Link>

          <Link
            to="/cart"
            aria-label={`Корзина (${totalItems})`}
            className="relative flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-rug-dark hover:bg-gray-100 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-gold-500 text-white text-[10px] font-bold rounded-full animate-pulse-gold">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Меню"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:bg-gray-100 transition-all"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 animate-fade-in">
          <div className="flex flex-col gap-1 pt-2">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`
                  px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${isActive(to)
                    ? 'bg-rug-dark text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/customize"
              className="btn-gold mt-2 text-sm py-3 justify-center"
            >
              Создать свой жайнамаз
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
