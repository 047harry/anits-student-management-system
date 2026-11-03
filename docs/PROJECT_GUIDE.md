# 🏛️ ANITS // B.Tech Student Management System
### Anil Neerukonda Institute of Technology & Sciences (Autonomous)
#### Full Stack MERN Architecture & Comprehensive Technical Guide

---

## 1. Executive Summary

**ANITS B.Tech SMS** is an institutional **Student Management System** developed specifically for **Anil Neerukonda Institute of Technology & Sciences (ANITS)** engineering departments (CSE, AI&DS, IT, ECE, EEE, MECH). Built on the **MERN stack** (MongoDB Atlas Cloud, Express.js, React, Node.js), it strictly enforces Role-Based Access Control (RBAC):

* **👨‍🏫 ANITS Faculty Role**:
  * Complete visibility over all currently enrolled B.Tech students across ANITS branches.
  * Full **CRUD** management (Create new student records, View profiles, Edit academic metrics, Delete records).
  * Real-time aggregate telemetry: Class Average CGPA, Cohort Average Attendance, and Low Attendance (<75%) Warning Alerts.
  * Direct access to completed student assessment scores.
* **👨‍🎓 ANITS Student Role**:
  * Strict private access: authenticated students can **only view their own record and metrics**.
  * Displays personal digital ANITS B.Tech ID card, registered Roll Number/USN (e.g. `322126510047`), semester standings, tech competencies, and capstone project details.
  * Dedicated assessment chamber with an embedded JavaScript timer to take institutional exams.

---

## 2. Core System Features & Architecture

| Feature / Capability | Technical Implementation | Architectural Reference |
|---|---|---|
| **Interactive Timed Assessment Chamber** | Interactive assessment room featuring a 120-second countdown timer. Auto-submits on time expiration, grades responses against answer keys, calculates percentages, and saves scores directly to the student's profile in MongoDB Atlas. | [`QuizPage.jsx`](file:///h:/WEB/FSWD/project/client/src/pages/QuizPage.jsx)<br>[`QuizTimerComponent.jsx`](file:///h:/WEB/FSWD/project/client/src/components/class/QuizTimerComponent.jsx)<br>[`quizController.js`](file:///h:/WEB/FSWD/project/server/controllers/quizController.js) |
| **Modular Enterprise Node.js Backend** | Backend uses ES Modules (`"type": "module"`) with `import`/`export` across modular controllers, routes, models, middleware, and config modules. | [`server.js`](file:///h:/WEB/FSWD/project/server/server.js)<br>[`package.json`](file:///h:/WEB/FSWD/project/server/package.json) |
| **RESTful API Engine & Postman Testing** | Production-ready REST API endpoints with status codes, error handling, input validation, and an exportable Postman collection. | [`server.js`](file:///h:/WEB/FSWD/project/server/server.js)<br>[`BTech_SMS_Postman_Collection.json`](file:///h:/WEB/FSWD/project/docs/BTech_SMS_Postman_Collection.json) |
| **Dual React Architecture (Class & Functional)** | Combines modern React Functional Components with Hooks (`useState`, `useEffect`, `useContext`) alongside dedicated **Class Components** (`QuizTimerComponent`, `LiveClockWidget`) utilizing `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`. | [`QuizTimerComponent.jsx`](file:///h:/WEB/FSWD/project/client/src/components/class/QuizTimerComponent.jsx)<br>[`LiveClockWidget.jsx`](file:///h:/WEB/FSWD/project/client/src/components/class/LiveClockWidget.jsx)<br>[`TeacherDashboard.jsx`](file:///h:/WEB/FSWD/project/client/src/pages/TeacherDashboard.jsx) |
| **Full HTTP Method Suite** | Full implementation of standard HTTP verbs: `GET` (fetch students/profile), `POST` (register, login, create student, submit quiz), `PUT` (update student details), and `DELETE` (remove student record). | [`studentRoutes.js`](file:///h:/WEB/FSWD/project/server/routes/studentRoutes.js)<br>[`studentController.js`](file:///h:/WEB/FSWD/project/server/controllers/studentController.js) |
| **MongoDB Atlas Cloud & Mongoose Data Layer** | Schemas with validation, indexes on `rollNo`, and relational references linking `User` accounts to `Student` and `Quiz` records. | [`Student.js`](file:///h:/WEB/FSWD/project/server/models/Student.js)<br>[`User.js`](file:///h:/WEB/FSWD/project/server/models/User.js)<br>[`Quiz.js`](file:///h:/WEB/FSWD/project/server/models/Quiz.js) |
| **JWT & Cryptographic Bcrypt Security** | Salted password hashing (10 rounds) via `bcryptjs`. Protected routes authenticate incoming requests via `Bearer <JWT>` tokens and role authorization middleware (`isTeacher`, `isStudent`). | [`authMiddleware.js`](file:///h:/WEB/FSWD/project/server/middleware/authMiddleware.js)<br>[`authController.js`](file:///h:/WEB/FSWD/project/server/controllers/authController.js) |
| **Cloud Deployment & Environment Management** | Decoupled client/server configuration with `.env` files for production credentials (`MONGO_URI`, `JWT_SECRET`, `PORT`). Ready for Vercel/Netlify (frontend) and Render/Railway (backend). | [`.env.example`](file:///h:/WEB/FSWD/project/server/.env.example)<br>[`vite.config.js`](file:///h:/WEB/FSWD/project/client/vite.config.js) |
| **Full Stack MERN Project Integration** | End-to-end integration: React client sends proxied API requests to Express, Express coordinates with MongoDB Atlas, responses render dynamically across client views. | Entire Repository |

---

## 3. Visual & Aesthetic Architecture

* **Design Concept**: **Retro-Futuristic Cyber Neo-Brutalism**.
* **Dark & Light Mode**:
  * **Cyber Dark Mode (Default)**: Deep carbon slate (`#0A0E17`) background, cyber-cyan (`#00F0FF`) borders, neon yellow accents, and tactile offset drop shadows.
  * **Retro Light Mode**: Warm vintage canvas (`#F5F2EB`), crisp 2px–4px black borders, and high-contrast retro sticker badges.
* **Tactile Interactions**: Buttons that physically displace down by 2px on click (`active:translate-y-0.5 active:shadow-none`).
* **Live System Heartbeat**: Real-time institutional terminal clock and network latency widget embedded in the navigation bar using a React Class component.

---

## 4. Testing with Postman

An exportable Postman collection is included in [`docs/BTech_SMS_Postman_Collection.json`](file:///h:/WEB/FSWD/project/docs/BTech_SMS_Postman_Collection.json).

### Steps to Test:
1. Open **Postman** and click **Import**.
2. Select `docs/BTech_SMS_Postman_Collection.json`.
3. Test authentication endpoints (`/api/auth/register` and `/api/auth/login`).
4. Execute student management operations (`GET`, `POST`, `PUT`, `DELETE` on `/api/students`).
5. Run assessment operations (`/api/quizzes` and `/api/quizzes/:id/submit`).
