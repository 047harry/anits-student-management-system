import React from 'react';
import { Award, BookOpen, Clock, Code, Mail, Phone, Edit, Trash2 } from 'lucide-react';
import RetroButton from '../common/RetroButton';

export const StudentCard = ({ student, isTeacher = false, onEdit, onDelete }) => {
  const isAttendanceWarning = student.attendancePercentage < 75;

  const departmentColors = {
    CSE: 'bg-cyber-cyan text-black',
    'AI&DS': 'bg-cyber-yellow text-black',
    IT: 'bg-cyber-green text-black',
    ECE: 'bg-cyber-pink text-white',
    EEE: 'bg-purple-400 text-black',
    MECH: 'bg-orange-400 text-black',
    CIVIL: 'bg-amber-300 text-black'
  };

  const deptBadgeClass = departmentColors[student.department] || 'bg-slate-300 text-black';

  return (
    <div className="border-2 border-black dark:border-slate-700 bg-white dark:bg-cyber-darkSurface shadow-retro dark:shadow-retro-cyan hover:-translate-y-1 transition-all duration-200">
      {/* Top Header Strip with Roll No & Branch */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-900 border-b-2 border-black dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs font-black tracking-widest text-black dark:text-cyber-cyan">
            {student.rollNo}
          </span>
          <span className={`px-2 py-0.5 text-[11px] font-mono font-bold uppercase border border-black ${deptBadgeClass}`}>
            {student.department}
          </span>
        </div>
        <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
          YR-{student.year} // SEM-{student.semester}
        </span>
      </div>

      <div className="p-4 space-y-4">
        {/* Name and Basic Info */}
        <div>
          <h3 className="font-display font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight">
            {student.name}
          </h3>
          <div className="flex flex-col space-y-1 mt-1 text-xs font-mono text-slate-600 dark:text-slate-400">
            <span className="flex items-center">
              <Mail className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              {student.email}
            </span>
            {student.phone && (
              <span className="flex items-center">
                <Phone className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                {student.phone}
              </span>
            )}
          </div>
        </div>

        {/* Academic Metrics: CGPA & Attendance */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2 border border-black dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
              Cumulative GPA
            </span>
            <div className="flex items-center space-x-1 mt-0.5">
              <Award className="w-4 h-4 text-cyber-yellow" />
              <span className="font-display font-black text-xl text-slate-900 dark:text-white">
                {student.cgpa.toFixed(2)}
              </span>
              <span className="text-[10px] font-mono text-slate-400">/ 10</span>
            </div>
          </div>

          <div className={`p-2 border border-black dark:border-slate-800 ${
            isAttendanceWarning
              ? 'bg-red-50 dark:bg-red-950/30 text-red-600'
              : 'bg-slate-50 dark:bg-slate-800/40'
          }`}>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 block">
              Attendance
            </span>
            <div className="flex items-center space-x-1 mt-0.5">
              <Clock className="w-4 h-4 text-cyber-cyan" />
              <span className={`font-display font-black text-xl ${
                isAttendanceWarning ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-white'
              }`}>
                {student.attendancePercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Skills Tag Cloud */}
        {student.skills && student.skills.length > 0 && (
          <div>
            <span className="text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center mb-1.5">
              <Code className="w-3 h-3 mr-1" />
              Tech Competencies
            </span>
            <div className="flex flex-wrap gap-1">
              {student.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 text-[10px] font-mono font-bold border border-black dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Capstone Project Info */}
        {student.projectTitle && (
          <div className="p-2 border border-black dark:border-slate-800 bg-slate-50 dark:bg-slate-800/20 text-xs font-mono">
            <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              Capstone Project
            </span>
            <p className="font-bold text-slate-900 dark:text-slate-200 truncate mt-0.5">
              {student.projectTitle}
            </p>
          </div>
        )}

        {/* Teacher Action Controls */}
        {isTeacher && (
          <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <RetroButton
              size="sm"
              variant="outline"
              icon={Edit}
              onClick={() => onEdit(student)}
            >
              Edit
            </RetroButton>
            <RetroButton
              size="sm"
              variant="pink"
              icon={Trash2}
              onClick={() => onDelete(student._id, student.name)}
            >
              Delete
            </RetroButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentCard;
