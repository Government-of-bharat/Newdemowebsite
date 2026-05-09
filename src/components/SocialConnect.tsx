import { motion } from 'motion/react';
import { Linkedin, Instagram, Twitter, ArrowUpRight } from 'lucide-react';

const socials = [
  {
    name: 'LinkedIn',
    handle: '@f1marketing',
    icon: Linkedin,
    link: '#',
    color: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
  },
  {
    name: 'Instagram',
    handle: '@f1.marketing',
    icon: Instagram,
    link: '#',
    color: 'hover:bg-[#E1306C] hover:border-[#E1306C]',
  },
  {
    name: 'Twitter / X',
    handle: '@f1_marketing',
    icon: Twitter,
    link: '#',
    color: 'hover:bg-neutral-900 hover:text-white hover:border-white',
  },
];

export function SocialConnect() {
  return (
    <section className="py-24 bg-black/[0.02] border-t border-black/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-display font-bold mb-4"
            >
              Stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Connected</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted"
            >
              Follow our journey, get the latest marketing insights, and connect with our community of driven founders.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.link}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`group flex items-center justify-between p-8 rounded-3xl bg-white border border-neutral-200 shadow-sm transition-all duration-300 ${social.color} hover:text-white`}
            >
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <social.icon size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-display font-bold text-neutral-900 group-hover:text-white transition-colors">{social.name}</h3>
                  <p className="text-sm text-neutral-500 group-hover:text-white/80 transition-colors">{social.handle}</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-900 group-hover:bg-white/20 group-hover:text-white group-hover:border-transparent transition-all">
                <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
