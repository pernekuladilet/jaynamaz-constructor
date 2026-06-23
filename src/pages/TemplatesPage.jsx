import { useNavigate } from 'react-router-dom';
import { useCustomizerStore } from '../store/customizerStore.js';
import { TEMPLATES } from '../config/templates.js';
import { TemplateCard } from '../components/home/TemplatesGrid.jsx';

export default function TemplatesPage() {
  const loadTemplate = useCustomizerStore((s) => s.loadTemplate);
  const navigate = useNavigate();

  function handleSelect(tmpl) {
    loadTemplate(tmpl.config);
    navigate('/customize');
  }

  return (
    <main className="min-h-screen bg-rug-cream pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-gold-600 uppercase tracking-widest mb-2">
            Коллекции
          </p>
          <h1 className="section-title">Готовые шаблоны</h1>
          <p className="section-subtitle mx-auto">
            Выбери любой шаблон как основу и персонализируй в конструкторе
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {TEMPLATES.map((tmpl) => (
            <TemplateCard key={tmpl.id} tmpl={tmpl} onSelect={handleSelect} />
          ))}
        </div>
      </div>
    </main>
  );
}
