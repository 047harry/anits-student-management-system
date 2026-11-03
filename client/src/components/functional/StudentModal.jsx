import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import RetroButton from '../common/RetroButton';

export const StudentModal = ({ isOpen, onClose, onSave, studentToEdit = null }) => {
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    email: '',
    phone: '',
    department: 'CSE',
    year: 3,
    semester: 6,
    section: 'A',
    cgpa: 8.5,
    attendancePercentage: 85,
    skills: '',
    projectTitle: '',
    projectAbstract: '',
    mentorName: 'Prof. Marcus Vance'
  });

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        rollNo: studentToEdit.rollNo || '',
        name: studentToEdit.name || '',
        email: studentToEdit.email || '',
        phone: studentToEdit.phone || '',
        department: studentToEdit.department || 'CSE',
        year: studentToEdit.year || 3,
        semester: studentToEdit.semester || 6,
        section: studentToEdit.section || 'A',
        cgpa: studentToEdit.cgpa || 8.0,
        attendancePercentage: studentToEdit.attendancePercentage || 85,
        skills: Array.isArray(studentToEdit.skills)
          ? studentToEdit.skills.join(', ')
          : studentToEdit.skills || '',
        projectTitle: studentToEdit.projectTitle || '',
        projectAbstract: studentToEdit.projectAbstract || '',
        mentorName: studentToEdit.mentorName || 'Prof. Marcus Vance'
      });
    } else {
      // Reset form
      setFormData({
        rollNo: '',
        name: '',
        email: '',
        phone: '',
        department: 'CSE',
        year: 3,
        semester: 6,
        section: 'A',
        cgpa: 8.5,
        attendancePercentage: 85,
        skills: 'C++, Python, React, Node.js',
        projectTitle: '',
        projectAbstract: '',
        mentorName: 'Prof. Marcus Vance'
      });
    }
    setError('');
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

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

    if (!formData.rollNo || !formData.name || !formData.email) {
      setError('Roll Number, Full Name, and Email are mandatory fields.');
      return;
    }

    setSaving(true);
    try {
      await onSave(formData, studentToEdit?._id);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save student profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
      <div className="w-full max-w-2xl border-4 border-black dark:border-cyber-cyan bg-white dark:bg-cyber-darkSurface shadow-retro-lg dark:shadow-retro-cyan max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b-2 border-black dark:border-slate-800 bg-cyber-yellow text-black font-display font-black text-lg uppercase tracking-wide">
          <span>{studentToEdit ? '⚡ UPDATE B.TECH PROFILE' : '⚡ REGISTER NEW B.TECH STUDENT'}</span>
          <button
            onClick={onClose}
            className="p-1 border-2 border-black bg-white hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          {error && (
            <div className="p-3 border-2 border-red-500 bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-mono text-xs flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Roll Number */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1">
                Roll Number / USN *
              </label>
              <input
                type="text"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleChange}
                placeholder="e.g. 22BCSE142"
                required
                disabled={!!studentToEdit} // Keep rollNo immutable in edit
                className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm focus:outline-hidden focus:border-cyber-cyan"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Student full legal name"
                required
                className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-hidden focus:border-cyber-cyan"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1">
                Institutional Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="student@nexus.edu"
                required
                className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-hidden focus:border-cyber-cyan"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-hidden focus:border-cyber-cyan"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1">
                Department / Branch *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm focus:outline-hidden focus:border-cyber-cyan"
              >
                <option value="CSE">CSE - Computer Science & Engineering</option>
                <option value="AI&DS">AI&DS - Artificial Intelligence & Data Science</option>
                <option value="IT">IT - Information Technology</option>
                <option value="ECE">ECE - Electronics & Communication</option>
                <option value="EEE">EEE - Electrical & Electronics</option>
                <option value="MECH">MECH - Mechanical Engineering</option>
                <option value="CIVIL">CIVIL - Civil Engineering</option>
              </select>
            </div>

            {/* Year & Semester */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1">Semester</label>
                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>
                      Sem {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* CGPA */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1">
                CGPA (0.00 - 10.00)
              </label>
              <input
                type="number"
                name="cgpa"
                step="0.01"
                min="0"
                max="10"
                value={formData.cgpa}
                onChange={handleChange}
                className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
              />
            </div>

            {/* Attendance % */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase mb-1">
                Attendance Percentage (%)
              </label>
              <input
                type="number"
                name="attendancePercentage"
                min="0"
                max="100"
                value={formData.attendancePercentage}
                onChange={handleChange}
                className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm"
              />
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1">
              Tech Stack / Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. React, Node.js, Python, Docker, AWS"
              className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm font-mono"
            />
          </div>

          {/* Capstone Project Title */}
          <div>
            <label className="block text-xs font-mono font-bold uppercase mb-1">
              Capstone Project Title
            </label>
            <input
              type="text"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              placeholder="e.g. Edge AI Telemetry for Smart Grids"
              className="w-full p-2.5 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t-2 border-black dark:border-slate-800">
            <RetroButton type="button" variant="outline" onClick={onClose}>
              Cancel
            </RetroButton>
            <RetroButton type="submit" variant="cyan" disabled={saving} icon={Save}>
              {saving ? 'Saving...' : studentToEdit ? 'Save Changes' : 'Create Record'}
            </RetroButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentModal;
