import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

const features = [
  'Full-funnel media buying that leads the algorithm',
  'Creatives built to outperform competitors',
  'Retention and email flows to keep your funnel alive',
  'Dedicated growth partners working 24/7'
];

export function About() {
  return (
    <section id="about" className="py-24 bg-black/[0.02]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
              Your top competitors are already scaling. <span className="text-muted">It's your turn.</span>
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              When the funnel, creatives, and accounts work together flawlessly, growth becomes predictable. We are a team of data-obsessed growth partners building scaling architectures for ambitious brands.
            </p>
            
            <ul className="space-y-4 mb-10">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0" />
                  <span className="text-neutral-700">{feature}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-neutral-900 font-medium pb-1 border-b border-black hover:text-blue-600 hover:border-blue-600 transition-colors"
            >
              Learn more about our methodology <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 border border-black/10 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent z-10" />
              {/* Abstract data representation or agency floor */}
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=100&w=3840" 
                alt="Data Dashboard" 
                className="w-full h-full object-cover opacity-60 grayscale mix-blend-luminosity"
              />
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-neutral-200 z-20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-neutral-500 mb-1">ROAS Growth</div>
                    <div className="text-2xl font-bold text-neutral-900">+ 42.8%</div>
                  </div>
                  <div className="w-16 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600/30 blur-[50px] rounded-full z-0" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 blur-[60px] rounded-full z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
