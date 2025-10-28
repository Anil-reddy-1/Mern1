# Notes App

A Full-Stack MERN Notes Application with authentication and real-time updates.

## Features
- 🔐 User authentication (login/signup)
- 📝 Create, read, update, and delete notes
- ⭐ Favorite notes functionality
- 🌗 Light/Dark theme support

## Tech Stack
- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Quick Start

### Backend
```bash
cd Backend
npm install
npm start
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

Make sure to create a `.env` file in the Backend directory with:
```
DATABASE_URL=your_mongodb_url
TOKEN_KEY=your_jwt_secret
PORT=5000
```

## API Routes
- `POST /user` - Login/Signup
- `GET /data` - Get notes
- `POST /data` - Create note
- `PUT /data` - Update note
- `DELETE /data` - Delete note