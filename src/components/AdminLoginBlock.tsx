import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight, Lock, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { auth } from '../lib/firebase';

export function AdminLoginBlock() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { signInWithGoogle, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAdminSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signInWithGoogle();
      
      if (auth.currentUser?.email !== 'sauravvarmag8@gmail.com') {
        await signOut();
        setErrorMsg('Access Denied: You are not authorized as an admin.');
        setIsLoading(false);
        return;
      }

      // Navigate to admin dashboard after successful login
      setTimeout(() => {
        setIsLoading(false);
        navigate('/admin');
      }, 500);
    } catch (err) {
      setErrorMsg('Login failed.');
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-neutral-50 py-16 border-t border-black/5 flex flex-col items-center justify-center overflow-hidden w-full relative" id="admin-portal">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
        {!isOpen ? (
          <motion.button 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setIsOpen(true)}
            className="text-neutral-400 hover:text-black flex items-center gap-2 text-sm font-semibold transition-colors bg-white px-6 py-3 rounded-full border border-neutral-200 shadow-sm hover:shadow-md"
          >
            <ShieldCheck size={18} />
            Admin Portal Access
          </motion.button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full bg-white border border-neutral-200 p-8 rounded-3xl shadow-xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
            
            <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-neutral-100">
              <UserCog size={28} className="text-neutral-700" />
            </div>
            
            <h4 className="text-2xl font-display font-bold mb-2 text-neutral-900">Admin Authentication</h4>
            <p className="text-sm text-neutral-500 mb-6 px-4">
              Secure area. Authorized personnel only. Please sign in with your corporate Google internal account.
            </p>

            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6 font-medium">
                {errorMsg}
              </div>
            )}
            
            <button 
              onClick={handleAdminSignIn}
              disabled={isLoading}
              className="w-full py-4 bg-black text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all active:scale-[0.98] disabled:opacity-70 group"
            >
              {isLoading ? (
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
              ) : (
                <>
                  <Lock size={16} className="text-neutral-400 group-hover:text-white transition-colors" />
                  Sign in as Administrator
                  <ArrowRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                </>
              )}
            </button>
            
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-6 text-xs text-neutral-400 hover:text-neutral-600 font-medium underline-offset-4 hover:underline transition-all"
            >
              Cancel and return to site
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
