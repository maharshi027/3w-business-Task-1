# Social Media Application

A full-stack social media platform featuring secure authentication, image uploads via Cloudinary, and real-time social interactions.

## 📁 Project Structure

### Backend
- **config/**: Database connection setup
- **controllers/**: Business logic for posts and users
- **middleware/**: JWT authentication and Multer/Cloudinary storage logic
- **models/**: Mongoose schemas for MongoDB
- **routes/**: Express route definitions
- **utils/**: Cloudinary configuration utilities
- **index.js**: Entry point for the server

### Frontend
- **api/**: Axios instance configuration
- **components/**: Reusable UI components (PostCard, CreatePost, etc.)
- **context/**: Global state for user authentication
- **App.jsx**: Main application routing and layout

## 🚀 Features

- **User Authentication**: Signup and Login with JWT and password encryption.
- **Post Creation**: Support for captions and multiple image uploads.
- **Cloud Storage**: Automatic image optimization and hosting on Cloudinary.
- **Interactions**: Like/Unlike posts and a threaded comment system.
- **Security**: Protected frontend routes and backend middleware.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Axios, React-Bootstrap
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Image Handling**: Multer, Multer-Storage-Cloudinary, Cloudinary API
- **Auth**: JSON Web Tokens (JWT), Bcrypt.js

## ⚙️ Installation & Setup

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