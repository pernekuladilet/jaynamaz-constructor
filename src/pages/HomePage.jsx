import HeroSection from '../components/home/HeroSection.jsx';
import HowItWorks from '../components/home/HowItWorks.jsx';
import TemplatesGrid from '../components/home/TemplatesGrid.jsx';
import Testimonials from '../components/home/Testimonials.jsx';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <TemplatesGrid />
      <Testimonials />
    </main>
  );
}
