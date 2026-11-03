import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  },
  quizTitle: {
    type: String,
    default: 'General Technical Assessment'
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  percentage: {
    type: Number,
    required: true
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    rollNo: {
      type: String,
      required: [true, 'Roll number / USN is required'],
      unique: true,
      trim: true,
      uppercase: true
    },
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      default: '+91 98765 43210'
    },
    department: {
      type: String,
      required: [true, 'B.Tech Department/Branch is required'],
      enum: ['CSE', 'IT', 'AI&DS', 'ECE', 'EEE', 'MECH', 'CIVIL'],
      default: 'CSE'
    },
    year: {
      type: Number,
      required: true,
      min: 1,
      max: 4,
      default: 3
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 8,
      default: 6
    },
    section: {
      type: String,
      default: 'A',
      uppercase: true
    },
    cgpa: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
      default: 8.5
    },
    attendancePercentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 85
    },
    skills: {
      type: [String],
      default: ['C++', 'Python', 'React', 'Node.js']
    },
    projectTitle: {
      type: String,
      default: 'Autonomous Robotics Telemetry'
    },
    projectAbstract: {
      type: String,
      default: 'IoT and AI-powered edge computing architecture for robotics telemetry.'
    },
    mentorName: {
      type: String,
      default: 'Dr. Aris Thorne'
    },
    status: {
      type: String,
      enum: ['Active', 'On Leave', 'Graduated', 'Suspended'],
      default: 'Active'
    },
    quizResults: [quizResultSchema]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Student', studentSchema);
