📌 Codeial – Social Media Web Application





📖 Overview
Codeial is a modern Node.js + MongoDB powered social media web application that enables users to connect, share posts, chat in real time, and receive notifications. It combines secure authentication, scalable backend architecture, and optimized asset handling to deliver a smooth user experience.

🚀 Features
✅ Secure Authentication – Local & Google OAuth login via Passport.js
✅ Real-Time Chat – Instant messaging with Socket.io
✅ Media Uploads – Profile pictures & post attachments with Multer
✅ Email Notifications – Automated alerts via Nodemailer
✅ Background Jobs – Asynchronous processing with Kue
✅ Dynamic Views – EJS templates with Express layouts
✅ Optimized Performance – Gulp-based CSS/JS minification & image compression
✅ Logging & Monitoring – Morgan with rotating-file-stream

🛠 Tech Stack
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: Passport.js (Local, Google OAuth), JWT
Real-Time: Socket.io
Uploads: Multer
Emails: Nodemailer
Task Queue: Kue
Templating: EJS, express-ejs-layouts
Styling: SASS, node-sass-middleware
Build Tools: Gulp, imagemin, gulp-rev, gulp-cssnano, gulp-uglify-es
Logging: Morgan, rotating-file-stream

📂 Project Structure
csharp
Copy
Edit
codeial/
│── config/          # Config files (passport, mongoose, etc.)
│── controllers/     # Route controllers
│── models/          # Mongoose models
│── routes/          # API & web routes
│── views/           # EJS templates
│── assets/          # SASS/CSS/JS files
│── public/          # Public static files
│── workers/         # Background job workers
│── index.js         # Entry point
│── package.json     # Dependencies
📡 API Endpoints
Auth

POST /users/sign-up – Register

POST /users/sign-in – Login

GET /users/sign-out – Logout

Posts

POST /posts/create – Create a post

GET /posts – Get posts

DELETE /posts/:id – Delete a post

⚙️ Environment Variables
env
Copy
Edit
PORT=8000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=your_google_callback_url
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
## 🖼 Screenshots  

| Home Page | Real-Time Chat | Profile Page |  
|-----------|---------------|--------------|  
| ![Home](https://i.postimg.cc/d0Npvq89/Screenshot-2025-07-31-at-11-57-53-AM.png) | ![Chat](https://via.placeholder.com/400x250?text=Chat+Page) | ![Profile](https://via.placeholder.com/400x250?text=Profile+Page) |


🔄 Quick Start Diagram
mermaid
Copy
Edit
flowchart TD
    A[User Registers / Logs In] --> B[Backend - Node.js + Express]
    B --> C[Auth: Passport.js + Sessions]
    B --> D[Database: MongoDB + Mongoose]
    B --> E[Real-Time Chat: Socket.io]
    B --> F[Media Uploads: Multer]
    B --> G[Background Jobs: Kue]
    B --> H[Email Alerts: Nodemailer]
    E --> I[Live Chat UI]
    F --> J[Stored in Server/Public]
🚀 Installation
bash
Copy
Edit
git clone https://github.com/your-username/codeial.git
cd codeial
npm install
npm start
🌐 Deployment
bash
Copy
Edit
npm run prod_start
Ensure all environment variables are set on your hosting service (Heroku, Render, etc.) and MongoDB is accessible.

📄 License
This project is licensed under the ISC License.