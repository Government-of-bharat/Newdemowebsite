import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { caseStudiesData } from '../data/caseStudies';

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold mb-6"
            >
              Real Results. <br /> <span className="text-muted">No Nonsense.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted"
            >
              We measure our success entirely by the net profit we generate for our partners. Here is what that looks like in practice.
            </motion.p>
          </div>
          <motion.a 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#portfolio"
            className="flex items-center gap-2 text-neutral-900 hover:text-blue-400 pb-1 border-b border-transparent hover:border-blue-400 transition-all"
          >
            View all work <ArrowUpRight className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudiesData.map((study, i) => (
            <motion.div
              key={study.client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group"
            >
              <Link to={`/case-study/${study.id}`} className="block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl mb-6">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={study.image} 
                    alt={study.client} 
                    className="w-full h-full object-cover grayscale mix-blend-luminosity group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 z-20">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                    <div className="flex gap-4 items-end">
                      <div>
                        <div className="text-4xl font-display font-bold text-white mb-1">{study.metric}</div>
                        <div className="text-sm font-medium text-blue-400 uppercase tracking-wide">{study.metricLabel}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="px-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-display font-bold">{study.client}</h3>
                    <span className="text-sm font-medium text-muted bg-black/5 px-2 py-1 rounded-md">{study.niche}</span>
                  </div>
                  <p className="text-neutral-600 text-sm leading-relaxed line-clamp-3">
                    {study.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
