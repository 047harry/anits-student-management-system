import express from 'express';
import {
  getQuizzes,
  getQuizById,
  submitQuiz,
  createQuiz
} from '../controllers/quizController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getQuizzes)
  .post(protect, authorize('teacher'), createQuiz);

router.route('/:id').get(protect, getQuizById);
router.route('/:id/submit').post(protect, submitQuiz);

export default router;
