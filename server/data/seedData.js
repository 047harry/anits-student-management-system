import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Student from '../models/Student.js';
import Quiz from '../models/Quiz.js';

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/btech_student_portal';

const seedDatabase = async () => {
  try {
    console.log('🔄 Connecting to MongoDB Atlas for ANITS seeding...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Connected to MongoDB Atlas.');

    // Clear old data
    await User.deleteMany();
    await Student.deleteMany();
    await Quiz.deleteMany();
    console.log('🧹 Purged existing collections.');

    // 1. Create ANITS Faculty Account
    const teacher = await User.create({
      name: 'Dr. K. S. Deepthi (HOD CSE, ANITS)',
      email: 'teacher@anits.edu.in',
      password: 'Password123!',
      role: 'teacher',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Marcus'
    });

    // 2. Create ANITS Student User
    const studentUser = await User.create({
      name: 'D. Hemanth Kumar',
      email: 'student@anits.edu.in',
      password: 'Password123!',
      role: 'student',
      rollNo: '322126510047',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Hemanth'
    });

    // 3. Create Sample ANITS B.Tech Students
    const sampleStudents = [
      {
        user: studentUser._id,
        rollNo: '322126510047',
        name: 'D. Hemanth Kumar',
        email: 'student@anits.edu.in',
        phone: '+91 98451 22340',
        department: 'CSE',
        year: 3,
        semester: 6,
        section: 'A',
        cgpa: 9.25,
        attendancePercentage: 92,
        skills: ['React', 'Node.js', 'MongoDB', 'Docker', 'Python', 'C++'],
        projectTitle: 'ANITS Autonomous Smart Campus Telemetry',
        projectAbstract: 'High-throughput stream processing engine using Kafka and React WebSockets for IoT energy telemetry.',
        mentorName: 'Dr. K. S. Deepthi',
        status: 'Active',
        quizResults: [
          {
            quizTitle: 'ANITS Core Web & Cloud Diagnostic Assessment',
            score: 5,
            totalQuestions: 5,
            percentage: 100,
            completedAt: new Date(Date.now() - 86400000 * 2)
          }
        ]
      },
      {
        rollNo: '322126510012',
        name: 'Kavya Sharma',
        email: 'kavya.s@anits.edu.in',
        phone: '+91 97123 44556',
        department: 'AI&DS',
        year: 3,
        semester: 6,
        section: 'B',
        cgpa: 9.42,
        attendancePercentage: 96,
        skills: ['Python', 'PyTorch', 'FastAPI', 'Pandas', 'Next.js'],
        projectTitle: 'Autonomous Aerial Drone Trajectory Predictor',
        projectAbstract: 'Real-time computer vision and reinforcement learning navigation system.',
        mentorName: 'Dr. M. Rama Krishna',
        status: 'Active'
      },
      {
        rollNo: '322126510088',
        name: 'Vikram Joshi',
        email: 'vikram.j@anits.edu.in',
        phone: '+91 98220 11984',
        department: 'IT',
        year: 3,
        semester: 5,
        section: 'A',
        cgpa: 8.34,
        attendancePercentage: 81,
        skills: ['Java', 'Spring Boot', 'PostgreSQL', 'Kubernetes'],
        projectTitle: 'Enterprise Microservices Observability Gateway',
        projectAbstract: 'Service mesh tracing and latency analytics with Prometheus and Grafana.',
        mentorName: 'Dr. K. S. Deepthi',
        status: 'Active'
      },
      {
        rollNo: '323126512015',
        name: 'Priya Nambiar',
        email: 'priya.n@anits.edu.in',
        phone: '+91 94451 90812',
        department: 'ECE',
        year: 2,
        semester: 4,
        section: 'C',
        cgpa: 8.85,
        attendancePercentage: 88,
        skills: ['Embedded C', 'Verilog', 'ARM Cortex', 'Rust'],
        projectTitle: 'Low-Power Biomedical Sensor Node on RISC-V',
        projectAbstract: 'Ultra-low energy consumption edge telemetry for ECG pulse monitoring.',
        mentorName: 'Prof. V. Rajya Lakshmi',
        status: 'Active'
      },
      {
        rollNo: '321126520051',
        name: 'Rohan Mehta',
        email: 'rohan.m@anits.edu.in',
        phone: '+91 99120 77610',
        department: 'MECH',
        year: 4,
        semester: 8,
        section: 'A',
        cgpa: 7.35,
        attendancePercentage: 68, // Low attendance warning (<75%)
        skills: ['SolidWorks', 'ANSYS', 'MATLAB', 'Python'],
        projectTitle: 'Aerodynamic Drag Optimization in Formula Hybrid Chassis',
        projectAbstract: 'Computational fluid dynamics analysis for high-downforce racing diffusers.',
        mentorName: 'Dr. B. Naga Raju',
        status: 'Active'
      },
      {
        rollNo: '322126510119',
        name: 'Sneha Patel',
        email: 'sneha.p@anits.edu.in',
        phone: '+91 93100 88219',
        department: 'CSE',
        year: 3,
        semester: 6,
        section: 'A',
        cgpa: 8.78,
        attendancePercentage: 86,
        skills: ['Go', 'gRPC', 'GraphQL', 'AWS', 'Redis'],
        projectTitle: 'Distributed Cache Invalidation Protocol for Campus Intranet',
        projectAbstract: 'Consistent hashing with quorum replication for campus-wide proxy caching.',
        mentorName: 'Dr. K. S. Deepthi',
        status: 'Active'
      }
    ];

    await Student.insertMany(sampleStudents);
    console.log(`✅ Seeded ${sampleStudents.length} ANITS B.Tech student profiles.`);

    // 4. Create ANITS Technical Quiz (Point 7)
    await Quiz.create({
      title: 'ANITS B.Tech Core Web & Cloud Diagnostic',
      description: 'Timed assessment testing your understanding of REST APIs, JavaScript Asynchrony, React Lifecycle, and Database architecture.',
      topic: 'Full Stack MERN & Web Architecture (ANITS Regulation)',
      timeLimitSeconds: 120, // 2-minute timer
      totalMarks: 50,
      createdBy: teacher._id,
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
          explanation: 'The microtask queue and process.nextTick queue are drained after every operation and before moving between event loop phases.'
        },
        {
          questionText: 'What HTTP status code is most appropriate when a client request lacks valid authentication credentials (e.g. missing JWT)?',
          options: ['400 Bad Request', '401 Unauthorized', '403 Forbidden', '404 Not Found'],
          correctOptionIndex: 1,
          explanation: '401 Unauthorized indicates the request requires user authentication. 403 Forbidden is used when the server understands who the user is but refuses access.'
        },
        {
          questionText: 'Which React lifecycle method is used in Class Components to handle subscriptions, network requests, and timers immediately after mounting?',
          options: ['componentWillMount()', 'componentDidMount()', 'shouldComponentUpdate()', 'getDerivedStateFromProps()'],
          correctOptionIndex: 1,
          explanation: '`componentDidMount()` is invoked immediately after a component is mounted into the DOM, making it ideal for starting timers and fetching data.'
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
          explanation: 'Mongoose indexes create efficient B-Trees that allow the database engine to locate records in O(log N) time rather than scanning every document.'
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
          explanation: 'bcrypt uses a cryptographic salt and configurable work factor to protect passwords against dictionary and GPU cracking attacks.'
        }
      ]
    });

    console.log('✅ Seeded ANITS Quiz assessment with 120-second timer.');

    console.log('\n==========================================');
    console.log('🎉 ANITS SEEDING COMPLETE! Credentials:');
    console.log('👨‍🏫 ANITS Faculty: teacher@anits.edu.in / Password123!');
    console.log('👨‍🎓 ANITS Student: student@anits.edu.in / Password123! (Roll: 322126510047)');
    console.log('==========================================\n');

    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Seeding failed: ${err.message}`);
    process.exit(1);
  }
};

seedDatabase();
