import { Hero } from '../components/Hero';
import { ClientBrands } from '../components/ClientBrands';
import { Stats } from '../components/Stats';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { CaseStudies } from '../components/CaseStudies';
import { Testimonials } from '../components/Testimonials';
import { Portfolio } from '../components/Portfolio';
import { SocialConnect } from '../components/SocialConnect';
import { AdminLoginBlock } from '../components/AdminLoginBlock';

export function Home() {
  return (
    <main>
      <Hero />
      <ClientBrands />
      <Stats />
      <About />
      <Services />
      <CaseStudies />
      <Testimonials />
      <Portfolio />
      <SocialConnect />
      <AdminLoginBlock />
    </main>
  );
}
