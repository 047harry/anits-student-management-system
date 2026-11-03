import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RetroButton from '../components/common/RetroButton';
import { User, Shield, ArrowRight, AlertCircle } from 'lucide-react';

export const RegisterPage = ({ setCurrentView }) => {
  const { register } = useAuth();
  const [role, setRole] = useState('student'); // 'student' | 'teacher'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rollNo: '',
    department: 'CSE',
    year: 3,
    semester: 6
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all mandatory fields.');
      return;
    }

    if (role === 'student' && !formData.rollNo) {
      setError('Roll number / USN is mandatory for B.Tech students.');
      return;
    }

    setLoading(true);
    try {
      await register({
        ...formData,
        role
      });
      setCurrentView('dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Check connection or try another email.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      <div className="border-4 border-black dark:border-cyber-yellow bg-white dark:bg-cyber-darkSurface p-6 sm:p-8 shadow-retro-lg dark:shadow-retro-yellow">
        
        {/* Header */}
        <div className="text-center pb-6 border-b-2 border-black dark:border-slate-800">
          <h2 className="font-display font-black text-2xl uppercase tracking-tight text-slate-900 dark:text-white">
            PORTAL ENROLLMENT
          </h2>
          <p className="mt-1 text-xs font-mono text-slate-500 dark:text-slate-400">
            Create an institutional account for B.Tech SMS
          </p>
        </div>

        {/* Role Toggle Selector */}
        <div className="grid grid-cols-2 gap-2 my-5">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`p-3 border-2 border-black font-mono text-xs font-bold uppercase flex items-center justify-center space-x-2 transition-all ${
              role === 'student'
                ? 'bg-cyber-cyan text-black shadow-retro-sm translate-x-0.5 translate-y-0.5'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Student Role</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('teacher')}
            className={`p-3 border-2 border-black font-mono text-xs font-bold uppercase flex items-center justify-center space-x-2 transition-all ${
              role === 'teacher'
                ? 'bg-cyber-pink text-white shadow-retro-sm translate-x-0.5 translate-y-0.5'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Teacher Role</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 border-2 border-red-500 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-mono text-xs flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1">
              Full Legal Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Chen"
              required
              className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm focus:outline-hidden focus:border-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1">
              Institutional Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@nexus.edu"
              required
              className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm focus:outline-hidden focus:border-cyber-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1">
              Secure Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min. 6 characters"
              required
              minLength={6}
              className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm focus:outline-hidden focus:border-cyber-cyan"
            />
          </div>

          {/* Conditional Student Fields */}
          {role === 'student' && (
            <div className="p-4 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 space-y-3">
              <span className="block text-xs font-mono font-bold uppercase text-cyber-pink">
                // B.Tech Enrollment Telemetry
              </span>

              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1">
                  Roll Number / USN *
                </label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleChange}
                  placeholder="e.g. 23BCSE204"
                  required={role === 'student'}
                  className="w-full p-2 border-2 border-black dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-sm uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase mb-1">Branch</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full p-2 border-2 border-black dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"
                  >
                    <option value="CSE">CSE</option>
                    <option value="AI&DS">AI&DS</option>
                    <option value="IT">IT</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase mb-1">Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full p-2 border-2 border-black dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs"
                  >
                    <option value={1}>1st Yr</option>
                    <option value={2}>2nd Yr</option>
                    <option value={3}>3rd Yr</option>
                    <option value={4}>4th Yr</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <RetroButton
            type="submit"
            size="lg"
            variant={role === 'teacher' ? 'pink' : 'cyan'}
            disabled={loading}
            icon={ArrowRight}
            className="w-full mt-2"
          >
            {loading ? 'Registering...' : `Register as ${role.toUpperCase()}`}
          </RetroButton>
        </form>

        {/* Back to sign in */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 text-center font-mono text-xs text-slate-600 dark:text-slate-400">
          <span>Already enrolled? </span>
          <button
            onClick={() => setCurrentView('login')}
            className="font-bold underline text-slate-900 dark:text-cyber-cyan hover:text-cyber-pink cursor-pointer"
          >
            Sign In Here
          </button>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
