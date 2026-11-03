import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Quiz from '../models/Quiz.js';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/btech_student_portal';

const clearDemoData = async () => {
  try {
    console.log('🔄 Connecting to MongoDB Atlas to purge demo records...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connected to MongoDB Atlas.');

    const userCount = await User.countDocuments();
    const studentCount = await Student.countDocuments();

    await User.deleteMany({});
    await Student.deleteMany({});

    console.log(`🧹 Successfully purged ${userCount} demo user(s) and ${studentCount} demo student record(s).`);

    // Ensure institutional assessment exists for new students to take (Point 7)
    const quizExists = await Quiz.countDocuments();
    if (quizExists === 0) {
      await Quiz.create({
        title: 'ANITS B.Tech Core Web & Cloud Diagnostic',
        description: 'Timed assessment testing your understanding of REST APIs, JavaScript Asynchrony, React Lifecycle, and Database architecture.',
        topic: 'Full Stack MERN & Web Architecture (ANITS Regulation)',
        timeLimitSeconds: 120,
        totalMarks: 50,
        questions: [
          {
            questionText: 'In the Node.js event loop, which phase executes callbacks scheduled by `process.nextTick()` and microtasks?',
            options: [
              'Immediately after each phase finishes, before continuing to the next macrotask',
              'Only at the Close Callbacks phase',
              'During the Poll phase only',
              'Inside the Check (setImmediate) phase'
            ],
            correctOptionIndex: 0,
            explanation: 'Microtasks and process.nextTick callbacks are drained immediately after each operation finishes before continuing to the next phase.'
          },
          {
            questionText: 'What HTTP status code is most appropriate when a client request lacks valid authentication credentials (e.g. missing JWT)?',
            options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found'],
            correctOptionIndex: 1,
            explanation: '401 Unauthorized indicates the request requires user authentication credentials.'
          },
          {
            questionText: 'Which React lifecycle method is used in Class Components to handle subscriptions, network requests, and timers immediately after mounting?',
            options: ['componentWillMount()', 'componentDidMount()', 'shouldComponentUpdate()', 'getDerivedStateFromProps()'],
            correctOptionIndex: 1,
            explanation: '`componentDidMount()` is invoked immediately after a component is mounted into the DOM, making it ideal for starting timers.'
          },
          {
            questionText: 'In MongoDB with Mongoose, what is the primary benefit of creating an index on the `rollNo` field?',
            options: [
              'It encrypts the roll number on disk automatically',
              'It reduces query execution time from an O(N) collection scan to O(log N) B-Tree lookup',
              'It converts the string roll number into an integer',
              'It allows duplicate roll numbers to be stored'
            ],
            correctOptionIndex: 1,
            explanation: 'Mongoose indexes create efficient B-Trees that allow the database engine to locate records in O(log N) time.'
          },
          {
            questionText: 'When securing JWT tokens in a MERN stack application, why is `bcrypt` used for passwords instead of standard SHA-256?',
            options: [
              'bcrypt is reversible so teachers can recover student passwords',
              'bcrypt incorporates salting and is deliberately CPU-intensive (key stretching) to resist brute-force/rainbow table attacks',
              'bcrypt reduces database storage space to 8 bytes',
              'bcrypt runs synchronously in the browser without Node.js'
            ],
            correctOptionIndex: 1,
            explanation: 'bcrypt uses cryptographic salting and key stretching to prevent rainbow table and brute-force attacks.'
          }
        ]
      });
      console.log('✅ Institutional Quiz preserved for Point 7 assessment.');
    }

    console.log('\n==========================================');
    console.log('✨ DATABASE IS NOW FRESH & READY FOR YOUR USERS!');
    console.log('==========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to clear demo data:', error.message);
    process.exit(1);
  }
};

clearDemoData();
