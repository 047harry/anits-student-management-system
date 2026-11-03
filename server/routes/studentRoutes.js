import express from 'express';
import {
  getAllStudents,
  getMyProfile,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getDashboardStats
} from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Stats overview for Teachers
router.get('/stats/overview', protect, authorize('teacher'), getDashboardStats);

// Student's own profile endpoint
router.get('/me', protect, getMyProfile);

// CRUD operations on /api/students
router
  .route('/')
  .get(protect, authorize('teacher'), getAllStudents)
  .post(protect, authorize('teacher'), createStudent);

router
  .route('/:id')
  .get(protect, getStudentById)
  .put(protect, updateStudent)
  .delete(protect, authorize('teacher'), deleteStudent);

export default router;
