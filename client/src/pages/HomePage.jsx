import React from 'react';
import { useAuth } from '../context/AuthContext';
import RetroButton from '../components/common/RetroButton';
import RetroCard from '../components/common/RetroCard';
import {
  Shield,
  GraduationCap,
  Award,
  Terminal,
  Database,
  Layers,
  ArrowRight,
  Zap,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const HomePage = ({ setCurrentView }) => {
  const { isAuthenticated, isTeacher, isStudent } = useAuth();

  return (
    <div className="space-y-12 py-6">
      
      {/* ANITS College Hero Section */}
      <section className="relative border-4 border-black dark:border-cyber-yellow bg-white dark:bg-cyber-darkSurface p-6 sm:p-12 shadow-retro-lg dark:shadow-retro-yellow overflow-hidden">
        {/* Background Cyber Grid Accent */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyber-yellow/10 dark:bg-cyber-cyan/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 border-2 border-black dark:border-cyber-yellow bg-cyber-yellow text-black font-mono text-xs font-black uppercase tracking-wider mb-6 shadow-retro-sm">
            <Building2 className="w-4 h-4" />
            <span>ANIL NEERUKONDA INSTITUTE OF TECHNOLOGY & SCIENCES (ANITS)</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl uppercase tracking-tight text-slate-900 dark:text-white leading-none">
            ANITS B.TECH <br />
            <span className="text-cyber-pink underline decoration-black dark:decoration-cyber-cyan decoration-wavy decoration-2">
              STUDENT MANAGEMENT
            </span>{' '}
            PORTAL
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-mono leading-relaxed">
            Autonomous institutional portal for ANITS Engineering Departments (CSE, IT, AI&DS, ECE, EEE, MECH).
            Featuring role-gated faculty management, isolated student records, MongoDB Atlas Cloud telemetry,
            and interactive timed assessments.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {isAuthenticated ? (
              <RetroButton
                size="lg"
                variant="cyan"
                icon={ArrowRight}
                onClick={() => setCurrentView('dashboard')}
              >
                Launch {isTeacher ? 'Faculty Command Center' : 'Student Portal'}
              </RetroButton>
            ) : (
              <>
                <RetroButton
                  size="lg"
                  variant="cyan"
                  icon={ArrowRight}
                  onClick={() => setCurrentView('login')}
                >
                  Enter Portal (Sign In)
                </RetroButton>
                <RetroButton
                  size="lg"
                  variant="yellow"
                  onClick={() => setCurrentView('register')}
                >
                  Enroll ANITS Account
                </RetroButton>
              </>
            )}

            <RetroButton
              size="lg"
              variant="outline"
              icon={Award}
              onClick={() => setCurrentView('quiz')}
            >
              Timed Technical Assessment
            </RetroButton>
          </div>
        </div>

        {/* System Status Banner */}
        <div className="mt-8 p-3.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900/80 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2 text-slate-700 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-green animate-ping inline-block"></span>
            <span className="font-bold">MONGODB ATLAS CLUSTER: ONLINE</span>
          </div>
          <span className="text-slate-500 dark:text-slate-400">
            Click <strong>"Enroll ANITS Account"</strong> to register new faculty or student profiles.
          </span>
        </div>
      </section>

      {/* Feature Breakdown Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b-2 border-black dark:border-slate-800 pb-3">
          <h2 className="font-display font-black text-2xl uppercase tracking-wide text-slate-900 dark:text-white flex items-center">
            <Layers className="w-6 h-6 mr-2 text-cyber-cyan" />
            CORE SYSTEM ARCHITECTURE & FEATURES
          </h2>
          <span className="font-mono text-xs font-bold text-slate-500 uppercase">
            ANITS MERN SPECIFICATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RetroCard
            title="Timed Assessment Chamber"
            badge="LIVE JS TIMER"
            badgeColor="yellow"
            shadow="yellow"
          >
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              Interactive technical assessment engine driven by an embedded JavaScript countdown timer.
              Evaluates answers, awards marks, and automatically updates student profiles upon completion.
            </p>
          </RetroCard>

          <RetroCard
            title="Dual React Architecture"
            badge="CLASS & FUNCTIONAL"
            badgeColor="pink"
            shadow="pink"
          >
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              Engineered with specialized React Class Components utilizing lifecycle methods (<code>componentDidMount</code>, <code>componentWillUnmount</code>) alongside modern Functional Hooks.
            </p>
          </RetroCard>

          <RetroCard
            title="MongoDB Atlas Cloud Data Layer"
            badge="CRUD ENGINE"
            badgeColor="green"
            shadow="green"
          >
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              Complete CRUD engine for B.Tech students: 12-digit roll numbers, CGPA metrics, attendance meters,
              skills, and capstone project telemetry with validation.
            </p>
          </RetroCard>

          <RetroCard
            title="JWT & Cryptographic Security"
            badge="ROLE ISOLATION"
            badgeColor="cyan"
            shadow="retro"
          >
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              10-round salted bcrypt hashing and Bearer JWT token validation.
              Ensures students view only their own records while faculty manage all students.
            </p>
          </RetroCard>

          <RetroCard
            title="Modular Node.js & REST API"
            badge="POSTMAN VERIFIED"
            badgeColor="yellow"
            shadow="retro"
          >
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              ES Module-based backend separating routes, controllers, middleware, and models.
              Pre-built Postman collection included for API verification.
            </p>
          </RetroCard>

          <RetroCard
            title="Production Cloud Deployment"
            badge="CLOUD READY"
            badgeColor="green"
            shadow="retro"
          >
            <p className="text-xs font-mono text-slate-600 dark:text-slate-300 leading-relaxed">
              Decoupled cloud architecture configured for zero-config deployment across Vercel, Netlify,
              Render, and MongoDB Atlas with secure environment variables.
            </p>
          </RetroCard>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
