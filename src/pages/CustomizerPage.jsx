import { useState } from 'react';
import { useCustomizerStore } from '../store/customizerStore.js';
import { useCart } from '../context/CartContext.jsx';
import { calculatePrice } from '../utils/pricing.js';

import RugPreview from '../components/customizer/RugPreview.jsx';
import ColorPicker from '../components/customizer/ColorPicker.jsx';
import MaterialSelector from '../components/customizer/MaterialSelector.jsx';
import PatternSelector from '../components/customizer/PatternSelector.jsx';
import BorderSelector from '../components/customizer/BorderSelector.jsx';
import PersonalText from '../components/customizer/PersonalText.jsx';
import SizeSelector from '../components/customizer/SizeSelector.jsx';
import TasselControl from '../components/customizer/TasselControl.jsx';
import PriceSummary from '../components/customizer/PriceSummary.jsx';

const TABS = [
  { id: 'color',    label: 'Цвет' },
  { id: 'material', label: 'Материал' },
  { id: 'pattern',  label: 'Узор' },
  { id: 'border',   label: 'Бордюр' },
  { id: 'size',     label: 'Размер' },
  { id: 'personal', label: 'Надпись' },
];

export default function CustomizerPage() {
  const store = useCustomizerStore();
  const { addItem } = useCart();
  const [activeTab, setActiveTab] = useState('color');
  const [added, setAdded] = useState(false);

  const design = {
    color:      store.color,
    material:   store.material,
    pattern:    store.pattern,
    border:     store.border,
    size:       store.size,
    text:       store.text,
    textFont:   store.textFont,
    textColor:  store.textColor,
    tassels:    store.tassels,
    tasselColor: store.tasselColor,
  };

  function handleAddToCart() {
    const price = calculatePrice(design);
    addItem(design, price);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <main className="min-h-screen bg-rug-cream pt-16">
      <div className="max-w-6xl mx-auto px-0 sm:px-6">
        <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">

          {/* ── LEFT: Preview ── */}
          <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-64px)] lg:w-[45%] xl:w-[48%] shrink-0
            flex flex-col items-center justify-center bg-gradient-to-br from-rug-dark to-rug-green
            py-8 px-4 lg:px-8">

            {/* Mobile header */}
            <div className="lg:hidden w-full text-center mb-4">
              <p className="text-xs font-semibold text-gold-400 uppercase tracking-widest">
                Превью
              </p>
            </div>

            <RugPreview design={design} className="w-full max-w-[220px] sm:max-w-[260px] lg:max-w-[300px]" />

            {/* Design name (desktop) */}
            <div className="hidden lg:block text-center mt-8">
              <p className="text-xs text-gray-400 uppercase tracking-widest">Ваш дизайн</p>
              <p className="text-white font-display text-lg mt-1 capitalize">
                {store.pattern.replace(/_/g, ' ')}
              </p>
            </div>
          </div>

          {/* ── RIGHT: Controls ── */}
          <div className="flex-1 flex flex-col">
            {/* Tab bar */}
            <div className="sticky top-16 z-20 bg-white border-b border-gray-100 px-4 sm:px-6">
              <div className="flex gap-1 overflow-x-auto scrollbar-thin py-3">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
                      ${activeTab === tab.id
                        ? 'bg-rug-dark text-white'
                        : 'text-gray-500 hover:text-rug-dark hover:bg-gray-100'
                      }
                    `}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel content */}
            <div className="flex-1 px-4 sm:px-6 pt-6 pb-2 overflow-y-auto scrollbar-thin">
              <div className="max-w-lg">
                {activeTab === 'color' && (
                  <ColorPicker value={store.color} onChange={store.setColor} />
                )}
                {activeTab === 'material' && (
                  <MaterialSelector value={store.material} onChange={store.setMaterial} />
                )}
                {activeTab === 'pattern' && (
                  <PatternSelector value={store.pattern} onChange={store.setPattern} />
                )}
                {activeTab === 'border' && (
                  <BorderSelector value={store.border} onChange={store.setBorder} />
                )}
                {activeTab === 'size' && (
                  <SizeSelector value={store.size} onChange={store.setSize} />
                )}
                {activeTab === 'personal' && (
                  <>
                    <PersonalText
                      text={store.text}
                      textFont={store.textFont}
                      textColor={store.textColor}
                      onTextChange={store.setText}
                      onFontChange={store.setTextFont}
                      onColorChange={store.setTextColor}
                    />
                    <TasselControl
                      tassels={store.tassels}
                      tasselColor={store.tasselColor}
                      onToggle={store.setTassels}
                      onColorChange={store.setTasselColor}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Price summary — always visible at bottom */}
            <div className="px-4 sm:px-6">
              <PriceSummary
                design={design}
                onAddToCart={handleAddToCart}
                onReset={store.reset}
                added={added}
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
