import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RetroButton from '../components/common/RetroButton';
import { KeyRound, Mail, AlertTriangle, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';

export const LoginPage = ({ setCurrentView }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      setCurrentView('dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Authentication failed. Verify credentials or check your connection.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="border-4 border-black dark:border-cyber-cyan bg-white dark:bg-cyber-darkSurface p-6 sm:p-8 shadow-retro-lg dark:shadow-retro-cyan">
        
        {/* Header */}
        <div className="text-center pb-6 border-b-2 border-black dark:border-slate-800">
          <div className="w-12 h-12 mx-auto mb-3 border-2 border-black bg-cyber-yellow text-black flex items-center justify-center font-display text-2xl shadow-retro">
            🏛️
          </div>
          <h2 className="font-display font-black text-2xl uppercase tracking-tight text-slate-900 dark:text-white">
            ANITS PORTAL ACCESS
          </h2>
          <p className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-400">
            Sign in with your registered Faculty or Student credentials
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <div className="p-3 border-2 border-red-500 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-mono text-xs flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1 text-slate-700 dark:text-slate-300">
              Institutional Email (@anits.edu.in)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@anits.edu.in"
                required
                className="w-full pl-9 pr-3 py-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm focus:outline-hidden focus:border-cyber-cyan"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1 text-slate-700 dark:text-slate-300">
              Access Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-3 py-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm focus:outline-hidden focus:border-cyber-cyan"
              />
            </div>
          </div>

          <RetroButton
            type="submit"
            size="lg"
            variant="cyan"
            disabled={loading}
            icon={ArrowRight}
            className="w-full mt-2"
          >
            {loading ? 'Authenticating...' : 'Authorize Login'}
          </RetroButton>
        </form>

        {/* Register switch link */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center font-mono text-xs text-slate-600 dark:text-slate-400">
          <span>Need a new ANITS student or faculty account? </span>
          <button
            onClick={() => setCurrentView('register')}
            className="font-bold underline text-slate-900 dark:text-cyber-cyan hover:text-cyber-pink transition-colors cursor-pointer"
          >
            Register Here
          </button>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
