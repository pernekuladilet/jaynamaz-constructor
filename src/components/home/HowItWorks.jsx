import { Palette, Type, Truck } from 'lucide-react';
import { ru } from '../../i18n/ru.js';

const ICONS = [Palette, Type, Truck];

export default function HowItWorks() {
  const { title, subtitle, steps } = ru.howItWorks;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, i) => {
            const Icon = ICONS[i];
            return (
              <div key={i} className="relative text-center group">
                {/* Connector */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] right-[-50%] h-px bg-gradient-to-r from-gold-400/50 to-transparent" />
                )}

                {/* Step number */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-full bg-rug-cream border-2 border-gold-200 flex items-center justify-center group-hover:border-gold-500 transition-colors duration-300">
                    <Icon size={28} className="text-gold-600" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center font-display">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-rug-dark mb-3 font-display">
                  {step.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
