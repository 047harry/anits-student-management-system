import Quiz from '../models/Quiz.js';
import Student from '../models/Student.js';

// @desc    Get all available quizzes
// @route   GET /api/quizzes
// @access  Private
export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select('-questions.correctOptionIndex -questions.explanation');
    return res.status(200).json({
      success: true,
      data: quizzes
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve assessments.'
    });
  }
};

// @desc    Get single quiz with questions for taking the test
// @route   GET /api/quizzes/:id
// @access  Private
export const getQuizById = async (req, res) => {
  try {
    // If student, do not leak correctOptionIndex or explanation ahead of time
    const isTeacher = req.user && req.user.role === 'teacher';
    let query = Quiz.findById(req.params.id);

    if (!isTeacher) {
      query = query.select('-questions.correctOptionIndex -questions.explanation');
    }

    const quiz = await query;
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Assessment not found.'
      });
    }

    return res.status(200).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching assessment details.'
    });
  }
};

// @desc    Submit quiz answers and evaluate score with timer verification
// @route   POST /api/quizzes/:id/submit
// @access  Private (Student)
export const submitQuiz = async (req, res) => {
  try {
    const { answers, timeTakenSeconds } = req.body;
    // answers format: { "0": selectedOptionIndex, "1": selectedOptionIndex, ... }

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found.'
      });
    }

    let correctCount = 0;
    const feedback = [];

    quiz.questions.forEach((q, index) => {
      const selected = answers ? answers[index] : undefined;
      const isCorrect = selected !== undefined && Number(selected) === q.correctOptionIndex;

      if (isCorrect) correctCount++;

      feedback.push({
        questionIndex: index,
        questionText: q.questionText,
        selectedOption: selected !== undefined ? q.options[selected] : 'Not Answered',
        correctOption: q.options[q.correctOptionIndex],
        isCorrect,
        explanation: q.explanation
      });
    });

    const totalQuestions = quiz.questions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Record submission into Student profile
    const student = await Student.findOne({
      $or: [{ user: req.user._id }, { rollNo: req.user.rollNo }]
    });

    if (student) {
      student.quizResults.push({
        quizId: quiz._id,
        quizTitle: quiz.title,
        score: correctCount,
        totalQuestions,
        percentage,
        completedAt: new Date()
      });
      await student.save();
    }

    return res.status(200).json({
      success: true,
      message: 'Assessment completed and verified!',
      result: {
        score: correctCount,
        totalQuestions,
        percentage,
        timeTakenSeconds: timeTakenSeconds || 0,
        timeLimitSeconds: quiz.timeLimitSeconds,
        feedback
      }
    });
  } catch (error) {
    console.error('Quiz submission error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error evaluating quiz submission.'
    });
  }
};

// @desc    Create new quiz (Teacher only)
// @route   POST /api/quizzes
// @access  Private (Teacher)
export const createQuiz = async (req, res) => {
  try {
    const { title, description, timeLimitSeconds, questions, topic } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Quiz title and at least one question are required.'
      });
    }

    const quiz = await Quiz.create({
      title,
      description,
      timeLimitSeconds: Number(timeLimitSeconds) || 120,
      topic: topic || 'Core Engineering',
      questions,
      createdBy: req.user._id
    });

    return res.status(201).json({
      success: true,
      message: 'Assessment created successfully!',
      data: quiz
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error creating assessment.'
    });
  }
};
