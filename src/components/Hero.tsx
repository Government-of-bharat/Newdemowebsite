import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { UserAuthCard } from "./UserAuthCard";
import { useAuth } from "../context/AuthContext";

export function Hero() {
  const { user } = useAuth();
  
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 border border-black/10 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Stable & Compliant Performance Marketing
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.1] mb-6 border-transparent"
            >
              Built for the brands <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-neutral-500">
                that don't settle.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted mb-10 leading-relaxed max-w-lg"
            >
              Scale your business with high-converting Google & Meta ad campaigns.
              Full-funnel media buying that leads the algorithm.
            </motion.p>

            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#contact"
                  className="px-8 py-4 bg-black text-white text-base font-semibold rounded-full hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  Start Scaling Today
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#case-studies"
                  className="px-8 py-4 bg-black/5 border border-black/10 text-neutral-900 text-base font-medium rounded-full hover:bg-black/10 transition-colors flex items-center justify-center w-full sm:w-auto"
                >
                  View Case Studies
                </a>
              </motion.div>
            )}
          </div>

          <motion.div 
            className="w-full flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {!user ? (
               <div className="w-full max-w-md">
                 <UserAuthCard />
               </div>
            ) : (
               <div className="relative w-full aspect-[4/3] max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
                  <img 
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=100&w=2000" 
                    alt="Agency Performance Dashboard" 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-medium text-lg leading-snug">"Unleashing performance with data-driven precision."</p>
                  </div>
               </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
