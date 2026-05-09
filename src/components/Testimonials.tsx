import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  "Six Months In. Service That Actually Delivers.",
  "Two Years of Dropshipping. One Switch That Changed Everything.",
  "Almost One Year with F1 Marketing. Best Decision We Ever Made.",
  "Five Years in E-Commerce. One Partnership That Made It All Possible.",
  "From Daily Stress to Sleeping Soundly.",
  "Years of Partnership. Consistently Phenomenal.",
  "Flawless Experience with F1 Marketing’s Ad Accounts",
  "Secure Ads with a Personal Touch",
  "They have boosted my ad-performance",
  "Real Results, No Nonsense :)"
];

export function Testimonials() {
  return (
    <section className="py-24 bg-neutral-50 border-y border-black/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-1 mb-4"
        >
          {[1,2,3,4,5].map((s) => <Star key={s} className="w-5 h-5 fill-[#00B67A] text-[#00B67A]" />)}
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-display font-bold mb-6"
        >
          What our clients say after <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Scaling</span>
        </motion.h2>
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="text-muted"
        >
          Our rating on Trustpilot is excellent because we do not compromise on performance.
        </motion.p>
      </div>

      {/* Marquee effect */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6">
        <div className="absolute py-4 left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-50 to-transparent z-10" />
        <div className="absolute py-4 right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent z-10" />

        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap gap-6 w-max"
        >
          {[...testimonials, ...testimonials].map((text, i) => (
            <div 
              key={i} 
              className="px-8 py-6 rounded-2xl bg-black/[0.03] border border-black/10 shrink-0 shadow-lg text-lg font-medium text-neutral-700"
            >
              "{text}"
            </div>
          ))}
        </motion.div>

        <motion.div 
          animate={{ x: [-1035, 0] }}
          transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
          className="flex whitespace-nowrap gap-6 w-max"
        >
          {[...testimonials, ...testimonials].reverse().map((text, i) => (
            <div 
              key={i} 
              className="px-8 py-6 rounded-2xl bg-black/[0.03] border border-black/10 shrink-0 shadow-lg text-lg font-medium text-neutral-700"
            >
              "{text}"
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
