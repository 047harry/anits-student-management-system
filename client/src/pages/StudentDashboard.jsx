import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import RetroButton from '../components/common/RetroButton';
import RetroCard from '../components/common/RetroCard';
import StatBadge from '../components/functional/StatBadge';
import {
  Award,
  Clock,
  BookOpen,
  Code,
  Mail,
  Phone,
  UserCheck,
  FileCheck2,
  AlertCircle,
  PlayCircle,
  Building2
} from 'lucide-react';

export const StudentDashboard = ({ setCurrentView }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await studentAPI.getMyProfile();
        setProfile(res.data.data);
      } catch (err) {
        console.error('Error fetching student profile:', err);
        setError('No associated student profile record was found. Contact ANITS faculty to link your account.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 font-mono">
        <div className="animate-spin w-8 h-8 border-4 border-cyber-cyan border-t-transparent mx-auto mb-3"></div>
        <p className="text-xs uppercase text-slate-500">Retrieving ANITS B.Tech Student Record...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-xl mx-auto py-12">
        <div className="border-4 border-black dark:border-red-500 bg-white dark:bg-cyber-darkSurface p-8 shadow-retro-lg text-center font-mono space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
          <h3 className="font-display font-black text-xl uppercase">Profile Record Not Linked</h3>
          <p className="text-xs text-slate-500">{error}</p>
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Your registered user email: <strong className="text-cyber-cyan">{user?.email}</strong>
            </p>
            <RetroButton size="sm" variant="cyan" onClick={() => setCurrentView('quiz')}>
              Take Timed Assessment Anyway
            </RetroButton>
          </div>
        </div>
      </div>
    );
  }

  const isAttendanceLow = profile.attendancePercentage < 75;

  return (
    <div className="space-y-8 py-4">
      
      {/* ANITS Student Profile Hero Strip */}
      <div className="border-4 border-black dark:border-cyber-cyan bg-white dark:bg-cyber-darkSurface p-6 shadow-retro-lg dark:shadow-retro-cyan">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 border-2 border-black bg-cyber-yellow flex items-center justify-center font-display font-black text-3xl shadow-retro text-black">
              🎓
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 bg-black text-cyber-cyan font-mono text-xs font-bold uppercase tracking-wider">
                  ROLL: {profile.rollNo}
                </span>
                <span className="px-2 py-0.5 bg-cyber-pink text-white font-mono text-xs font-bold uppercase">
                  ANITS // {profile.department}
                </span>
              </div>
              <h1 className="font-display font-black text-3xl sm:text-4xl uppercase text-slate-900 dark:text-white mt-1">
                {profile.name}
              </h1>
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                Anil Neerukonda Institute of Technology & Sciences • Year {profile.year} • Sem {profile.semester} • Section {profile.section}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <RetroButton
              size="md"
              variant="yellow"
              icon={PlayCircle}
              onClick={() => setCurrentView('quiz')}
            >
              Take Timed Assessment
            </RetroButton>
          </div>
        </div>
      </div>

      {/* Primary KPI Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatBadge
          label="Cumulative Grade Point Average"
          value={profile.cgpa.toFixed(2)}
          subtext="ANITS Autonomous Scale of 10.0"
          color="yellow"
          icon={Award}
        />

        <StatBadge
          label="Attendance Status"
          value={`${profile.attendancePercentage}%`}
          subtext={isAttendanceLow ? '⚠️ Below 75% Mandatory Quota' : '✅ Optimal Standing'}
          color={isAttendanceLow ? 'pink' : 'green'}
          icon={Clock}
        />

        <StatBadge
          label="Assessments Completed"
          value={profile.quizResults ? profile.quizResults.length : 0}
          subtext="Skill validations on record"
          color="cyan"
          icon={FileCheck2}
        />
      </div>

      {/* Main Student Profile Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Details & Capstone */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Capstone Project Overview */}
          <RetroCard
            title="ANITS B.Tech Capstone Project"
            badge="FINAL YEAR PROJECT"
            badgeColor="yellow"
          >
            <div className="space-y-3 font-mono text-xs">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Project Title:</span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                  {profile.projectTitle || 'ANITS Autonomous Smart Campus Telemetry'}
                </h4>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase block">Abstract / Scope:</span>
                <p className="text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  {profile.projectAbstract ||
                    'Developing microservices-based architecture for IoT telemetry, incorporating real-time time-series modeling.'}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 text-[11px]">
                <span className="text-slate-500">Faculty Guide / Mentor:</span>
                <span className="font-bold text-cyber-cyan">{profile.mentorName || 'Dr. K. S. Deepthi'}</span>
              </div>
            </div>
          </RetroCard>

          {/* Technical Skills Competency */}
          <RetroCard title="Technical Competencies & Stack" badge="VERIFIED" badgeColor="green">
            <div className="flex flex-wrap gap-2">
              {profile.skills && profile.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 font-mono text-xs font-bold border-2 border-black dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white shadow-retro-sm"
                >
                  ⚡ {skill}
                </span>
              ))}
            </div>
          </RetroCard>

          {/* Timed Assessment History */}
          <RetroCard
            title="ANITS Assessment Results"
            badge="POINT 7 TELEMETRY"
            badgeColor="pink"
          >
            {profile.quizResults && profile.quizResults.length > 0 ? (
              <div className="divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs">
                {profile.quizResults.map((result, idx) => (
                  <div key={idx} className="py-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">
                        {result.quizTitle || 'ANITS Core Technical Diagnostic'}
                      </p>
                      <span className="text-[10px] text-slate-400">
                        {new Date(result.completedAt).toLocaleDateString()} at{' '}
                        {new Date(result.completedAt).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-1 bg-cyber-green text-black font-bold text-xs border border-black">
                        Score: {result.score} / {result.totalQuestions}
                      </span>
                      <span className="font-display font-black text-lg text-cyber-cyan">
                        {result.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 font-mono text-xs text-slate-500">
                <p>No timed assessments recorded yet.</p>
                <button
                  onClick={() => setCurrentView('quiz')}
                  className="mt-2 font-bold underline text-cyber-yellow hover:text-cyber-pink"
                >
                  Launch your first assessment now →
                </button>
              </div>
            )}
          </RetroCard>

        </div>

        {/* Right Col: Verified Identification Card */}
        <div className="space-y-6">
          <RetroCard title="ANITS Digital Student ID" badge="VERIFIED" badgeColor="cyan">
            <div className="space-y-4 font-mono text-xs">
              <div className="text-center py-4 bg-slate-100 dark:bg-slate-900 border border-black">
                <div className="w-16 h-16 rounded-full bg-cyber-yellow border-2 border-black mx-auto mb-2 flex items-center justify-center font-display font-black text-2xl text-black">
                  {profile.name.charAt(0)}
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase">
                  {profile.name}
                </h3>
                <span className="text-cyber-pink font-bold">{profile.rollNo}</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">ANITS AUTONOMOUS</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-slate-800 dark:text-slate-200 truncate max-w-[170px]">
                    {profile.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="text-slate-800 dark:text-slate-200">{profile.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-bold text-cyber-yellow">{profile.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Section:</span>
                  <span className="text-slate-800 dark:text-slate-200">{profile.section}</span>
                </div>
              </div>
            </div>
          </RetroCard>
        </div>

      </div>

    </div>
  );
};

export default StudentDashboard;
