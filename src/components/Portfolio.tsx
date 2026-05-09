import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';

const portfolioItems = [
  {
    title: "Global E-Com Expansion",
    category: "Performance Marketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=100&w=2000",
    stats: "+145% ROAS",
    description: "Expanded a regional e-commerce brand into global markets. Optimized feed management and localized campaigns across 12 countries to maximize reach and drive scalable, profitable growth.",
    services: ["Google Shopping", "Meta Ads", "Feed Localization", "CRO"]
  },
  {
    title: "Direct-to-Consumer Launch",
    category: "Brand & Acquisition",
    image: "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?auto=format&fit=crop&q=100&w=2000",
    stats: "$2.1M Rev",
    description: "Orchestrated a massive launch for a highly anticipated D2C brand. Built up a 100k+ waitlist prior to launch and converted them at unprecedented rates through aggressive retargeting and premium creatives.",
    services: ["Brand Strategy", "TikTok Ads", "Email Marketing", "Waitlist Funnels"]
  },
  {
    title: "SaaS Lead Generation",
    category: "B2B Scaling",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=100&w=2000",
    stats: "-40% CPA",
    description: "Revamped the lead generation pipeline for a B2B SaaS platform. Transitioned from broad targeting to account-based marketing (ABM) on LinkedIn, coupled with high-intent search capture.",
    services: ["LinkedIn Ads", "Google Search", "ABM Strategy", "Landing Page Design"]
  },
  {
    title: "App Install Campaign",
    category: "Mobile Growth",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=100&w=2000",
    stats: "500k+ Installs",
    description: "Executed a massive user acquisition blitz for a mobile fintech application. Utilized UAC (Universal App Campaigns) and Apple Search Ads to drive high-LTV users at scale.",
    services: ["UAC", "Apple Search Ads", "App Store Optimization", "In-App Analytics"]
  },
  {
    title: "Luxury Fashion Scaling",
    category: "Meta & TikTok Ads",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e07?auto=format&fit=crop&q=100&w=2000",
    stats: "3.5x Blended ROAS",
    description: "Scaled a high-end luxury fashion brand while maintaining brand prestige. Leveraged creator-led TikTok content combined with highly polished Meta catalog ads.",
    services: ["TikTok Ads", "Meta Catalog Sales", "Creator Partnerships", "Creative Strategy"]
  },
  {
    title: "Q4 BFCM Domination",
    category: "Omnichannel Media",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=100&w=2000",
    stats: "$10M+ Generated",
    description: "Designed and executed a comprehensive Black Friday / Cyber Monday strategy. Integrated email, SMS, Meta, and Google ads to ensure maximum revenue extraction during the peak holiday season.",
    services: ["Omnichannel Strategy", "SMS Marketing", "Offer Architecture", "Peak Scaling"]
  }
];

export function Portfolio() {
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  return (
    <>
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold mb-6"
            >
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Outcomes</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted"
            >
              A glimpse into the creatives, websites, and data-driven funnels we have built for high-growth brands worldwide.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                 <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 border border-black/5 mb-4">
                   <img 
                     src={item.image} 
                     alt={item.title} 
                     className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity group-hover:mix-blend-normal"
                   />
                   <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-neutral-200 z-20">
                     <span className="text-sm font-semibold text-neutral-900 tracking-wide">{item.stats}</span>
                   </div>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                     <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                       <ArrowUpRight className="w-6 h-6" />
                     </div>
                   </div>
                 </div>
                 <div>
                   <div className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-2">
                     {item.category}
                   </div>
                   <h3 className="text-2xl font-display font-bold text-neutral-900 group-hover:text-blue-300 transition-colors">
                     {item.title}
                   </h3>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden border border-neutral-200 shadow-2xl z-10 max-h-[90vh] flex flex-col md:flex-row"
            >
              <button 
                className="absolute top-6 right-6 w-10 h-10 bg-black/10 backdrop-blur-md rounded-full flex items-center justify-center text-black/70 hover:text-black hover:bg-black/20 transition-colors z-20"
                onClick={() => setSelectedItem(null)}
              >
                <X size={20} />
              </button>
              
              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                 <img 
                   src={selectedItem.image} 
                   alt={selectedItem.title} 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-white md:bg-gradient-to-r md:from-transparent md:to-white opacity-80 md:opacity-100" />
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <div className="text-sm font-medium text-blue-400 uppercase tracking-wider mb-3">
                  {selectedItem.category}
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-6">
                  {selectedItem.title}
                </h3>
                
                <div className="inline-flex items-center justify-center py-2 px-4 bg-black/5 border border-black/10 rounded-lg mb-8 w-fit">
                   <div className="flex flex-col">
                     <span className="text-xs text-neutral-600 uppercase font-semibold">Key Metric</span>
                     <span className="text-2xl font-bold text-neutral-900">{selectedItem.stats}</span>
                   </div>
                </div>

                <p className="text-neutral-700 leading-relaxed mb-8 text-lg">
                  {selectedItem.description}
                </p>
                
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-4 border-b border-black/10 pb-2">Services Provided</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.services.map((service, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-blue-500/10 text-blue-600 text-sm font-medium rounded-full border border-blue-500/20">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
