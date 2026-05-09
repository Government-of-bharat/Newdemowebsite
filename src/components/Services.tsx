import { motion } from 'motion/react';
import { ShoppingCart, TrendingUp, Sparkles, Search, Monitor, Globe2 } from 'lucide-react';

const services = [
  {
    title: 'Ecommerce Solutions',
    description: 'End-to-end commerce architecture designed for conversion, scaling, and high-volume operations.',
    icon: ShoppingCart,
  },
  {
    title: 'Performance Marketing',
    description: 'Data-driven Google & Meta campaigns. Full-funnel media buying that leads the algorithm.',
    icon: TrendingUp,
  },
  {
    title: 'Brand Building',
    description: 'Crafting premium, recognizable identities that resonate with your target audience and drive loyalty.',
    icon: Sparkles,
  },
  {
    title: 'SEO (Search Engine Optimization)',
    description: 'Technical and content-driven strategies to dominate search engine results and capture organic intent.',
    icon: Search,
  },
  {
    title: 'Website Designing',
    description: 'Aesthetic, fast, and highly-converting web experiences built on modern technology stacks.',
    icon: Monitor,
  },
  {
    title: 'Overseas Business Development',
    description: 'Strategic expansion frameworks to take your winning formulas to new international markets securely.',
    icon: Globe2,
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold mb-6"
          >
            End-to-End <br /> Growth Infrastructure
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted"
          >
            We don't just run ads. We build the complete ecosystem required to scale aggressively and profitably.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm hover:shadow-md transition-all group flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mb-6 text-neutral-900 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all">
                <service.icon size={24} />
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{service.title}</h3>
              <p className="text-sm text-muted leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
