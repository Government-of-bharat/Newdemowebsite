import { motion } from 'motion/react';

const brands = [
  "Ghar Soaps", "HoYoLAB", "NATURES SUNRISE", "Sana",
  "Cured.", "Publix.", "Enhanced Scents", "histrips.",
  "OLD MONEY", "HOYER", "KURO", "OBSESSIVE",
  "HOUSE OF AYURVEDA", "EHS", "Veganic.", "F1 Marketing", "KROM"
];

export function ClientBrands() {
  return (
    <section className="py-20 bg-black/[0.02] border-b border-black/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-10 text-center md:text-left">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
          <span className="text-blue-500">$100,364,780</span> Ad spends
        </h2>
        <p className="text-lg text-muted">Just a normal month at F1 Marketing</p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-6">
        {/* Left/Right Gradients for smooth fade */}
        <div className="absolute py-4 left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute py-4 right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div 
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap gap-6 w-max"
        >
          {[...brands, ...brands].map((brand, i) => (
            <div 
              key={i} 
              className="px-10 py-8 w-64 flex items-center justify-center rounded-2xl bg-black/[0.03] border border-black/10 shrink-0 shadow-lg"
            >
              <span className="text-xl font-bold font-display tracking-widest text-neutral-700 uppercase">{brand}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
