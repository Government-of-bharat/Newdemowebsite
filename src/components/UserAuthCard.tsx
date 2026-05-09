import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, ArrowRight } from 'lucide-react';

export function UserAuthCard() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword, user } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (user || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your email address to reset password.');
      return;
    }
    setIsLoading(true);
    setErrorMsg('');
    try {
      await resetPassword(email);
      setSuccessMsg('Password reset email sent! Check your inbox.');
    } catch (err: any) {
      setErrorMsg('Failed to send reset email.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      await signInWithGoogle();
    } catch (err: any) {
      setErrorMsg('Google sign in failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }}
      className="w-full max-w-sm mx-auto relative group text-left"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-700 animate-pulse" />
      
      <div className="relative bg-white/90 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="relative z-10 w-full">
          {/* Tab Selector */}
          <div className="flex bg-neutral-100/80 p-1.5 rounded-full mb-8 relative backdrop-blur-md border border-neutral-200/50 shadow-inner">
            <motion.div
              className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-sm"
              animate={{ left: isSignUp ? 'calc(50% + 1px)' : '5px' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 text-sm font-semibold z-10 transition-colors ${!isSignUp ? 'text-black' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
              className={`flex-1 py-2 text-sm font-semibold z-10 transition-colors ${isSignUp ? 'text-black' : 'text-neutral-500 hover:text-neutral-700'}`}
            >
              Sign Up
            </button>
          </div>

          <h3 className="text-2xl font-display font-bold mb-2 tracking-tight text-center">
            {isSignUp ? 'Create an Account' : 'Welcome Back'}
          </h3>
          <p className="text-neutral-500 text-sm mb-6 text-center">
            {isSignUp ? 'Start scaling your brand today.' : 'Access your dashboard metrics.'}
          </p>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-4 font-medium border border-red-100">
              {errorMsg}
            </div>
          )}
          
          {successMsg && (
            <div className="bg-green-50 text-green-600 p-3 rounded-xl text-sm mb-4 font-medium border border-green-100">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
            
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {!isSignUp && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-xs font-semibold text-neutral-500 hover:text-black transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-neutral-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group mt-2"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-400">Or continue with</span>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-3.5 bg-white border border-neutral-200 text-neutral-800 rounded-xl font-semibold hover:bg-neutral-50 shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
        </div>
      </div>
    </motion.div>
  );
}
