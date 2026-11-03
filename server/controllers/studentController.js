import Student from '../models/Student.js';

// @desc    Get all students (Search & Filter support)
// @route   GET /api/students
// @access  Private (Teacher only)
export const getAllStudents = async (req, res) => {
  try {
    const { search, department, year, sortBy } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { rollNo: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (department && department !== 'ALL') {
      query.department = department;
    }

    if (year && year !== 'ALL') {
      query.year = Number(year);
    }

    let sortOptions = { createdAt: -1 };
    if (sortBy === 'cgpa_desc') sortOptions = { cgpa: -1 };
    if (sortBy === 'cgpa_asc') sortOptions = { cgpa: 1 };
    if (sortBy === 'attendance') sortOptions = { attendancePercentage: -1 };
    if (sortBy === 'name') sortOptions = { name: 1 };

    const students = await Student.find(query).sort(sortOptions);

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve students list.'
    });
  }
};

// @desc    Get logged in student's own profile
// @route   GET /api/students/me
// @access  Private (Student)
export const getMyProfile = async (req, res) => {
  try {
    const student = await Student.findOne({
      $or: [{ user: req.user._id }, { rollNo: req.user.rollNo }]
    });

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'No student record found associated with this account.'
      });
    }

    return res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch personal profile.'
    });
  }
};

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Private
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.'
      });
    }

    // Role security check: If student, ensure they can only view their own record
    if (req.user.role === 'student') {
      const isOwner =
        (student.user && student.user.toString() === req.user._id.toString()) ||
        student.rollNo === req.user.rollNo;

      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: 'Access Denied: You are only authorized to view your own profile.'
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: student
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching student record.'
    });
  }
};

// @desc    Create new student profile (CRUD - Create)
// @route   POST /api/students
// @access  Private (Teacher)
export const createStudent = async (req, res) => {
  try {
    const {
      rollNo,
      name,
      email,
      phone,
      department,
      year,
      semester,
      section,
      cgpa,
      attendancePercentage,
      skills,
      projectTitle,
      projectAbstract,
      mentorName,
      status
    } = req.body;

    if (!rollNo || !name || !email || !department) {
      return res.status(400).json({
        success: false,
        message: 'Roll number, Name, Email, and Department are required fields.'
      });
    }

    const existingStudent = await Student.findOne({ rollNo: rollNo.toUpperCase() });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: `Student with Roll Number ${rollNo.toUpperCase()} already exists.`
      });
    }

    const student = await Student.create({
      rollNo: rollNo.toUpperCase(),
      name,
      email,
      phone,
      department,
      year: year || 3,
      semester: semester || 6,
      section: section || 'A',
      cgpa: Number(cgpa) || 8.0,
      attendancePercentage: Number(attendancePercentage) || 85,
      skills: Array.isArray(skills)
        ? skills
        : typeof skills === 'string'
        ? skills.split(',').map((s) => s.trim())
        : [],
      projectTitle,
      projectAbstract,
      mentorName,
      status: status || 'Active'
    });

    return res.status(201).json({
      success: true,
      message: 'Student record created successfully!',
      data: student
    });
  } catch (error) {
    console.error('Error creating student:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create student record.'
    });
  }
};

// @desc    Update student profile (CRUD - Update)
// @route   PUT /api/students/:id
// @access  Private
export const updateStudent = async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.'
      });
    }

    // Role check: If student, restrict editable fields to personal contact/project/skills
    if (req.user.role === 'student') {
      const isOwner =
        (student.user && student.user.toString() === req.user._id.toString()) ||
        student.rollNo === req.user.rollNo;

      if (!isOwner) {
        return res.status(403).json({
          success: false,
          message: 'Access Denied: You cannot edit other students profiles.'
        });
      }

      // Restrict fields for students (cannot alter CGPA, attendance, or rollNo)
      const allowedStudentUpdates = ['phone', 'skills', 'projectTitle', 'projectAbstract'];
      allowedStudentUpdates.forEach((field) => {
        if (req.body[field] !== undefined) {
          if (field === 'skills' && typeof req.body.skills === 'string') {
            student.skills = req.body.skills.split(',').map((s) => s.trim());
          } else {
            student[field] = req.body[field];
          }
        }
      });

      await student.save();
      return res.status(200).json({
        success: true,
        message: 'Personal profile updated successfully!',
        data: student
      });
    }

    // Teacher can update any field
    const updates = { ...req.body };
    if (updates.rollNo) updates.rollNo = updates.rollNo.toUpperCase();
    if (typeof updates.skills === 'string') {
      updates.skills = updates.skills.split(',').map((s) => s.trim());
    }

    student = await Student.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    return res.status(200).json({
      success: true,
      message: 'Student record updated successfully!',
      data: student
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update student profile.'
    });
  }
};

// @desc    Delete student profile (CRUD - Delete)
// @route   DELETE /api/students/:id
// @access  Private (Teacher only)
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student record not found.'
      });
    }

    await Student.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: `Student [${student.rollNo}] deleted successfully.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete student record.'
    });
  }
};

// @desc    Get aggregated analytics (Teachers only)
// @route   GET /api/students/stats/overview
// @access  Private (Teacher only)
export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const students = await Student.find({}, 'cgpa attendancePercentage department');

    const avgCGPA =
      totalStudents > 0
        ? (students.reduce((acc, curr) => acc + (curr.cgpa || 0), 0) / totalStudents).toFixed(2)
        : 0;

    const avgAttendance =
      totalStudents > 0
        ? (
            students.reduce((acc, curr) => acc + (curr.attendancePercentage || 0), 0) /
            totalStudents
          ).toFixed(1)
        : 0;

    // Department counts
    const departmentCounts = {};
    students.forEach((s) => {
      departmentCounts[s.department] = (departmentCounts[s.department] || 0) + 1;
    });

    // Attendance warnings (< 75%)
    const attendanceAlerts = students.filter((s) => s.attendancePercentage < 75).length;

    return res.status(200).json({
      success: true,
      data: {
        totalStudents,
        avgCGPA: Number(avgCGPA),
        avgAttendance: Number(avgAttendance),
        attendanceAlerts,
        departmentDistribution: departmentCounts
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error compiling analytics.'
    });
  }
};
