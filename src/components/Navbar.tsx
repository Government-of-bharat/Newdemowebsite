import { useState, useEffect } from 'react';
import { Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const links = [
  { href: '/#about', label: 'About' },
  { href: '/#services', label: 'Service' },
  { href: '/#case-studies', label: 'Case Studies' },
  { href: '/#portfolio', label: 'Portfolio' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-border/50 py-4' 
          : 'bg-transparent border-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="/" className="text-xl font-display font-bold tracking-tight z-50 flex items-center gap-2">
          <div className="w-6 h-6 bg-black rounded-sm rotate-45 flex items-center justify-center">
             <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          F1 Marketing
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a 
                  href={link.href} 
                  className="text-sm font-medium text-muted hover:text-neutral-900 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-700 hidden lg:block">{user.email}</span>
                <button
                  onClick={signOut}
                  className="px-5 py-2.5 bg-neutral-100 text-neutral-900 text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors flex items-center gap-2"
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <LogIn size={16} /> Sign In
              </button>
            )}
            <a
              href="/#contact"
              className="px-5 py-2.5 bg-black text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors hidden lg:block"
            >
              Reach Out
            </a>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 p-2 -mr-2 text-neutral-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-background border-b border-border/50 p-6 flex flex-col gap-6 shadow-2xl md:hidden"
            >
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.href}>
                    <a 
                      href={link.href} 
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-muted hover:text-neutral-900 transition-colors block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <hr className="border-border/50" />
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-neutral-700 px-2">
                    <User size={18} />
                    <span className="text-sm truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center px-5 py-3 bg-neutral-100 text-neutral-900 text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    signInWithGoogle();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center px-5 py-3 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn size={18} /> Sign In
                </button>
              )}
              <a
                href="/#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center px-5 py-3 bg-black text-white text-sm font-semibold rounded-full hover:bg-neutral-800 transition-colors"
              >
                Reach Out
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
