import Navigation from '../components/navigation';
import HeroSection from '../components/hero-section';
import ServicesShowcase from '../components/plan-showcase';
import WhyChooseUsSection from '../components/why-choose-us';
import TestimonialsSection from '../components/testimonials-new';
import Footer from '../components/footer-new';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServicesShowcase />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
