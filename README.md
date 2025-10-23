# Desafio FULLSTACK - CDA

A full-stack application built with NestJS (backend) and React (frontend) featuring user authentication and an achievements system.

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Features](#features)
- [Environment Variables](#environment-variables)

## 🎯 Overview

This project is a full-stack application that implements a user management system with an achievements/gamification feature. Users can register, login, and claim achievements.

## 🛠 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Docker** - Containerization
- **TypeScript** - Type-safe JavaScript

### Frontend
- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **CSS** - Styling

## 📁 Project Structure

```
.
├── backend/              # NestJS backend application
│   ├── src/
│   │   ├── auth/        # Authentication module
│   │   ├── User/        # User management module
│   │   ├── achievement/ # Achievement module
│   │   ├── prisma/      # Prisma service and seeds
│   │   └── common/      # Common utilities and filters
│   ├── prisma/          # Database schema and migrations
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── frontend/            # React frontend application
    ├── src/
    │   ├── components/  # Reusable components
    │   ├── pages/       # Page components
    │   ├── services/    # API services
    │   └── utils/       # Utility functions
    └── vite.config.ts
```

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Yarn** (v1.22 or higher)
- **Docker** and **Docker Compose** (for running PostgreSQL)
- **Git**

## 📦 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd -Desafio-FULLSTACK-cda
```

### 2. Install Backend Dependencies

```bash
cd backend
yarn install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
yarn install
```

## 🚀 Running the Application

### Backend

#### 1. Start the Database

```bash
cd backend
docker-compose up -d
```

This will start a PostgreSQL database container.

#### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory based on `env.example`:

```bash
cp env.example .env
```

Edit the `.env` file with your configuration.

#### 3. Run Database Migrations

```bash
npx prisma migrate dev
```

#### 4. Seed the Database (Optional)

```bash
npx prisma db seed
```

#### 5. Start the Backend Server

```bash
yarn start:dev
```

The backend will be running at `http://localhost:3000`

### Frontend

#### 1. Start the Development Server

```bash
cd frontend
yarn dev
```

The frontend will be running at `http://localhost:5173`

## 📚 API Documentation

Once the backend is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api
```

### Main Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

#### Users
- `GET /user` - Get all users
- `GET /user/:id` - Get user by ID
- `PATCH /user/:id` - Update user
- `DELETE /user/:id` - Delete user

#### Achievements
- `GET /achievement` - Get all achievements
- `GET /achievement/:id` - Get achievement by ID
- `POST /achievement` - Create achievement
- `POST /achievement/:id/claim` - Claim an achievement
- `PATCH /achievement/:id` - Update achievement
- `DELETE /achievement/:id` - Delete achievement

## ✨ Features

### Authentication System
- User registration with email validation
- Secure login with JWT tokens
- Password hashing with bcrypt
- Protected routes

### User Management
- Create, read, update, and delete users
- User profile management
- Role-based access control

### Achievement System
- Create and manage achievements
- Users can claim achievements
- Track user progress
- Achievement categories and rewards

## 🔧 Environment Variables

### Backend (.env)

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="1d"

# Server
PORT=3000
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
yarn test
```

### Frontend Tests

```bash
cd frontend
yarn test
```

## 🐳 Docker

To run the entire application with Docker:

```bash
cd backend
docker-compose up
```

## 📝 Database Schema

The application uses Prisma with the following main models:

- **User** - User accounts and profiles
- **Achievement** - Available achievements
- **UserAchievement** - Claimed achievements by users

For detailed schema, see `backend/prisma/schema.prisma`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Gabriel - [GitHub Profile]

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- React team for the powerful UI library
- Prisma team for the excellent ORM

