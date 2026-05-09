import { motion } from 'motion/react';

const stats = [
  { value: '$100M+', label: 'Ad Spends Managed' },
  { value: '37%', label: 'Average ROI Increase' },
  { value: '24/7', label: 'Campaign Monitoring' },
  { value: '68%', label: 'Retention Rate' },
];

export function Stats() {
  return (
    <section className="py-12 border-y border-border/50 bg-black/[0.02]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-border/50">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
