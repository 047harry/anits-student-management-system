import React, { useState, useEffect } from 'react';
import { studentAPI } from '../services/api';
import StudentCard from '../components/functional/StudentCard';
import StudentModal from '../components/functional/StudentModal';
import StatBadge from '../components/functional/StatBadge';
import RetroButton from '../components/common/RetroButton';
import {
  Users,
  Award,
  Clock,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  RefreshCw,
  LayoutGrid,
  List,
  Building2
} from 'lucide-react';

export const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('ALL');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [studentsRes, statsRes] = await Promise.all([
        studentAPI.getAll({
          search: search || undefined,
          department: selectedDept !== 'ALL' ? selectedDept : undefined
        }),
        studentAPI.getStats()
      ]);

      setStudents(studentsRes.data.data);
      setStats(statsRes.data.data);
    } catch (err) {
      console.error('Error loading ANITS faculty data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedDept]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDashboardData();
  };

  const handleCreateNew = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ANITS student record [${name}]? This action is permanent.`)) {
      try {
        await studentAPI.delete(id);
        fetchDashboardData();
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete student.');
      }
    }
  };

  const handleSaveStudent = async (formData, studentId) => {
    if (studentId) {
      await studentAPI.update(studentId, formData);
    } else {
      await studentAPI.create(formData);
    }
    fetchDashboardData();
  };

  const departments = ['ALL', 'CSE', 'AI&DS', 'IT', 'ECE', 'EEE', 'MECH'];

  return (
    <div className="space-y-8 py-4">
      
      {/* Top Banner with ANITS College branding */}
      <div className="border-4 border-black dark:border-cyber-pink bg-white dark:bg-cyber-darkSurface p-6 shadow-retro-lg dark:shadow-retro-pink">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 border border-black bg-cyber-pink text-white font-mono text-xs font-black uppercase mb-2">
              <Building2 className="w-3.5 h-3.5 inline mr-1" />
              ANITS FACULTY PORTAL // CRUD COMMAND CENTER
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-slate-900 dark:text-white">
              ANITS B.TECH ROSTER & TELEMETRY
            </h1>
            <p className="font-mono text-xs text-slate-500 dark:text-slate-400 mt-1">
              Full CRUD management: Create, Read, Update, and Delete enrolled ANITS engineering students.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <RetroButton
              size="md"
              variant="outline"
              icon={RefreshCw}
              onClick={fetchDashboardData}
            >
              Sync Atlas
            </RetroButton>
            <RetroButton
              size="md"
              variant="cyan"
              icon={Plus}
              onClick={handleCreateNew}
            >
              Add Student
            </RetroButton>
          </div>
        </div>
      </div>

      {/* Aggregate Statistics Overview */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBadge
            label="Total Enrolled"
            value={stats.totalStudents}
            subtext="ANITS B.Tech Students"
            color="cyan"
            icon={Users}
          />
          <StatBadge
            label="Class Average CGPA"
            value={stats.avgCGPA}
            subtext="Autonomous 10.0 Scale"
            color="yellow"
            icon={Award}
          />
          <StatBadge
            label="Average Attendance"
            value={`${stats.avgAttendance}%`}
            subtext="Cohort Mean"
            color="green"
            icon={Clock}
          />
          <StatBadge
            label="Attendance Alerts"
            value={stats.attendanceAlerts}
            subtext="Students < 75% Quota"
            color="pink"
            icon={AlertTriangle}
          />
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="border-2 border-black dark:border-slate-800 bg-white dark:bg-cyber-darkSurface p-4 shadow-retro">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search ANITS students by Name, Roll No (e.g. 322126510047), or Email..."
                className="w-full pl-9 pr-3 py-2 border-2 border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-xs focus:outline-hidden focus:border-cyber-cyan"
              />
            </div>
            <RetroButton type="submit" size="sm" variant="dark">
              Search
            </RetroButton>
          </form>

          {/* Department Filter Pills */}
          <div className="flex items-center flex-wrap gap-1.5">
            <Filter className="w-4 h-4 mr-1 text-slate-400 hidden sm:block" />
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border border-black transition-all ${
                  selectedDept === dept
                    ? 'bg-cyber-yellow text-black shadow-retro-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {/* Layout Toggle */}
          <div className="hidden sm:flex items-center border border-black dark:border-slate-700 p-0.5 bg-slate-100 dark:bg-slate-900">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 ${viewMode === 'grid' ? 'bg-black text-white dark:bg-cyber-cyan dark:text-black' : 'text-slate-400'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 ${viewMode === 'table' ? 'bg-black text-white dark:bg-cyber-cyan dark:text-black' : 'text-slate-400'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Main Student Records Display */}
      {loading ? (
        <div className="text-center py-16 border-2 border-black dark:border-slate-800 bg-white dark:bg-cyber-darkSurface">
          <div className="animate-spin w-8 h-8 border-4 border-cyber-cyan border-t-transparent mx-auto mb-3"></div>
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
            Querying MongoDB Atlas Roster Data...
          </p>
        </div>
      ) : students.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-black dark:border-slate-700 bg-slate-50 dark:bg-slate-900 font-mono text-sm">
          <p className="font-bold text-slate-700 dark:text-slate-300">No ANITS student records found.</p>
          <p className="text-xs text-slate-500 mt-1">Try adjusting search parameters or register a new student.</p>
          <RetroButton size="sm" variant="cyan" onClick={handleCreateNew} className="mt-4">
            Enroll First ANITS Student
          </RetroButton>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <StudentCard
              key={student._id}
              student={student}
              isTeacher={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="border-2 border-black dark:border-slate-800 bg-white dark:bg-cyber-darkSurface shadow-retro overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-100 dark:bg-slate-900 border-b-2 border-black dark:border-slate-800 uppercase font-black">
              <tr>
                <th className="p-3">Roll No</th>
                <th className="p-3">Name</th>
                <th className="p-3">Dept</th>
                <th className="p-3">Year / Sem</th>
                <th className="p-3">CGPA</th>
                <th className="p-3">Attendance</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {students.map((s) => (
                <tr key={s._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-cyber-pink">{s.rollNo}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{s.name}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-black text-white dark:bg-cyber-cyan dark:text-black text-[10px] font-bold">
                      {s.department}
                    </span>
                  </td>
                  <td className="p-3">Y{s.year} / S{s.semester}</td>
                  <td className="p-3 font-bold text-amber-500">{s.cgpa?.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={s.attendancePercentage < 75 ? 'text-red-500 font-bold' : ''}>
                      {s.attendancePercentage}%
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleEdit(s)}
                      className="px-2 py-1 bg-cyber-yellow text-black font-bold uppercase hover:bg-yellow-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s._id, s.name)}
                      className="px-2 py-1 bg-red-500 text-white font-bold uppercase hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Student Modal */}
      <StudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveStudent}
        studentToEdit={editingStudent}
      />

    </div>
  );
};

export default TeacherDashboard;
