import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String],
    required: true,
    validate: [val => val.length >= 2, 'At least 2 options are required']
  },
  correctOptionIndex: {
    type: Number,
    required: true
  },
  explanation: {
    type: String,
    default: ''
  }
});

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      default: 'B.Tech Core Technical Assessment with Timer'
    },
    topic: {
      type: String,
      default: 'Full Stack Web Development & Computer Science'
    },
    timeLimitSeconds: {
      type: Number,
      required: true,
      default: 120 // 2 minutes countdown timer
    },
    totalMarks: {
      type: Number,
      default: 100
    },
    questions: [questionSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Quiz', quizSchema);
