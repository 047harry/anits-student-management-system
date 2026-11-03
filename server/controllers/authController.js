import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Student from '../models/Student.js';

// Helper to generate JWT token
const generateToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'nexus_super_secret_jwt_key_2026',
    { expiresIn: '30d' }
  );
};

// @desc    Register a new user (Student or Teacher)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, rollNo, department, year, semester } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and password.'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email address.'
      });
    }

    const assignedRole = role === 'teacher' ? 'teacher' : 'student';

    // If student, check if rollNo is unique
    if (assignedRole === 'student') {
      if (!rollNo) {
        return res.status(400).json({
          success: false,
          message: 'Roll number / USN is mandatory for student registration.'
        });
      }

      const rollExists = await User.findOne({ rollNo: rollNo.toUpperCase() });
      if (rollExists) {
        return res.status(400).json({
          success: false,
          message: 'Roll number is already registered to another user.'
        });
      }
    }

    const user = await User.create({
      name,
      email,
      password,
      role: assignedRole,
      rollNo: rollNo ? rollNo.toUpperCase() : ''
    });

    // If registering as a student, automatically initialize or link their Student profile
    let studentProfile = null;
    if (assignedRole === 'student') {
      const existingStudent = await Student.findOne({ rollNo: rollNo.toUpperCase() });
      if (existingStudent) {
        existingStudent.user = user._id;
        existingStudent.email = email;
        await existingStudent.save();
        studentProfile = existingStudent;
      } else {
        studentProfile = await Student.create({
          user: user._id,
          name: user.name,
          email: user.email,
          rollNo: rollNo.toUpperCase(),
          department: department || 'CSE',
          year: year || 3,
          semester: semester || 6,
          cgpa: 8.5,
          attendancePercentage: 88,
          skills: ['Data Structures', 'JavaScript', 'MERN Stack'],
          projectTitle: 'B.Tech Cloud Portal Capstone'
        });
      }
    }

    const token = generateToken(user._id, user.role);

    return res.status(201).json({
      success: true,
      message: `${user.role.toUpperCase()} account created successfully!`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        avatar: user.avatar
      },
      studentProfile
    });
  } catch (error) {
    console.error('Registration Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration.'
    });
  }
};

// @desc    Authenticate User & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.'
      });
    }

    // Explicitly query for password since it's select: false in schema
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Please verify your email and password.'
      });
    }

    const token = generateToken(user._id, user.role);

    // If student, fetch their linked profile ID
    let studentId = null;
    if (user.role === 'student') {
      const student = await Student.findOne({
        $or: [{ user: user._id }, { rollNo: user.rollNo }]
      });
      if (student) studentId = student._id;
    }

    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        avatar: user.avatar,
        studentId
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.'
    });
  }
};

// @desc    Get current logged in user details
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let studentProfile = null;
    if (user.role === 'student') {
      studentProfile = await Student.findOne({
        $or: [{ user: user._id }, { rollNo: user.rollNo }]
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        rollNo: user.rollNo,
        avatar: user.avatar
      },
      studentProfile
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user data.'
    });
  }
};
