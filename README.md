# 🏛️ ANITS // B.Tech Student Management System
> Full Stack MERN Autonomous Engineering Platform for Anil Neerukonda Institute of Technology & Sciences

![ANITS B.Tech](https://img.shields.io/badge/College-ANITS%20Autonomous-FFE600?style=for-the-badge)
![Stack](https://img.shields.io/badge/Stack-MERN-00F0FF?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas%20Cloud-00FF66?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-JWT%20%2B%20Bcrypt-FF007F?style=for-the-badge)

---

## 🌐 Live System URLs

* **Frontend Client**: `http://localhost:5173/`
* **Backend REST API**: `http://localhost:5000/api/health`

---

## 🚀 Core System Features & Architecture

* **Interactive Timed Assessment Chamber**: Embedded JavaScript countdown timer with auto-submission, dynamic question grading, automated percentage scoring, and immediate persistence to student cloud profiles (`QuizTimerComponent.jsx` & `QuizPage.jsx`).
* **Modular Enterprise Node.js Architecture**: ES Modules (`import`/`export`) separating business logic, controllers, routing layers, custom middleware, and database connectivity.
* **RESTful API Engine with Postman Verification**: Standardized endpoints with comprehensive status codes, input validations, error formatting, and an exportable Postman collection (`docs/BTech_SMS_Postman_Collection.json`).
* **Dual-Component React Ecosystem**: Modern React Functional Components with Hooks (`useState`, `useEffect`, `useContext`) paired with specialized React **Class Components** using full lifecycle hooks (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`).
* **Full-Spectrum HTTP REST Methods**: Complete implementation and handling of `GET`, `POST`, `PUT`, and `DELETE` protocols.
* **High-Performance MongoDB Atlas & Mongoose Data Layer**: Scalable document schemas with index optimization on roll numbers, relational linkages, and deep validation for academic metrics.
* **Role-Gated JWT & Cryptographic Bcrypt Security**: 10-round salted password hashing with bcrypt, coupled with signed JSON Web Tokens for role-based authorization (Faculty vs. Student data isolation).
* **Production Cloud Deployment & Environment Management**: Isolated environment configurations (`.env`) built for deployment targets across Vercel/Netlify (client), Render (server), and MongoDB Atlas (cloud cluster).
* **End-to-End MERN Stack Integration**: Real-time communication between React, Express, Node.js, and MongoDB Atlas.

---

## 👨‍💼 Role-Based Access Model

| Role | Access Scope & Capabilities |
|---|---|
| **👨‍🏫 ANITS Faculty** | View full student roster across all engineering branches, execute complete CRUD operations (Add, Edit, Delete students), monitor cohort analytics (Class CGPA, Attendance warnings &lt;75%), and view student quiz results. |
| **👨‍🎓 ANITS Student** | Strict data isolation — students can **only view their own record**, view digital B.Tech ID badge with roll number, track personal attendance and CGPA standings, and complete timed technical assessments. |

---

## 📖 System Guides & Documentation
* [ANITS Comprehensive Project Guide & Architecture Documentation](docs/PROJECT_GUIDE.md)
* [Printable / PDF Documentation (Open in Browser & Ctrl+P)](docs/PROJECT_GUIDE.html)
* [Postman API Test Collection (Ready to Import)](docs/BTech_SMS_Postman_Collection.json)
