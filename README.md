# 🚀 Phase 1: Internship Technical Task - 3W Business Pvt Ltd.

**Organization:** 3W Business Pvt Ltd.  
**Task Status:** Post-Resume Shortlisting (Task #1)  
**Timeline:** 3 Days (72-Hour Challenge)  
**Constraints:** React + Bootstrap Only (No Custom CSS)

---

# Full-Stack Social Media Application

A robust social media platform featuring secure authentication, cloud-based image uploads, and real-time social interactions. This project was built to demonstrate rapid development capabilities and proficiency in the MERN stack under a professional deadline.

## 📋 Core Requirements Met
- [x] **Strict Styling:** 100% React-Bootstrap (No custom CSS files or inline styles).
- [x] **User Auth:** Complete Signup and Login flow.
- [x] **Interactions:** Like and Comment functionality on posts.
- [x] **Media:** Image hosting via Cloudinary.
- [x] **Timeline:** Developed and deployed within the 3-day window.

## 🛠 Tech Stack

- **Frontend:** React.js (Vite), React-Bootstrap, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **File Handling:** Multer, Cloudinary API
- **Security:** JSON Web Tokens (JWT), Bcrypt.js

---

## 📁 Project Structure

### Backend
- `config/`: Database connection (MongoDB)
- `controllers/`: Logic for user authentication and post management
- `middleware/`: JWT verification and Multer storage configuration
- `models/`: Mongoose schemas for Users and Posts
- `routes/`: Express API endpoints
- `utils/`: Cloudinary integration utilities

### Frontend
- `api/`: Centralized Axios configuration
- `components/`: Reusable Bootstrap-only UI components
- `context/`: Global Auth state management
- `App.jsx`: Main routing and layout structure

---

## ⚙️ Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone [your-repository-link]
1. **Clone the repository**
2. **Backend Setup**:
   - Navigate to the backend folder
   - Run `npm install`
   - Create a `.env` file with the following variables:
     - `PORT`
     - `MONGO_URI`
     - `JWT_SECRET`
     - `CLOUDINARY_CLOUD_NAME`
     - `CLOUDINARY_API_KEY`
     - `CLOUDINARY_API_SECRET`
   - Run `npm run dev`
3. **Frontend Setup**:
   - Navigate to the frontend folder
   - Run `npm install`
   - Run `npm run dev`

## 🌐 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | /api/user/signup | Register a new account |
| POST | /api/user/login | Authenticate user |
| GET | /api/posts | Fetch all posts |
| POST | /api/posts/create-post | Upload new post (Auth required) |
| POST | /api/posts/like/:id | Toggle like (Auth required) |
| POST | /api/posts/comment/:id | Add comment (Auth required) |
| DELETE | /api/posts/:id | Delete post (Owner only) |

## 🚀 Deployment
services:
  backend:
    build: ./backend
    ports:
      - "2500:2500"
    env_file:
      - ./backend/.env
    environment:
      - MONGO_URI=${MONGO_URI}
    restart: always

  frontend:
    build: ./frontend
    ports:
      - "5173:80"
    depends_on:
      - backend
    restart: always

### Backend
- Deploy to platforms like Render, Heroku, or Railway.
- Ensure all environment variables from your `.env` file are added to the platform's settings.
- Set the start command to `node index.js`.

### Frontend
- Deploy to Vercel or Netlify.
- Configure the build command as `npm run build` and the output directory as `dist`.
- Set the API base URL in your Axios configuration to point to your deployed backend.