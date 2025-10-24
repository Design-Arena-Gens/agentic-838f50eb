# E-Commerce Full Stack Application

A complete e-commerce platform built with MongoDB Atlas, Express.js, React, and Node.js (MERN stack) featuring email verification, mobile OTP verification, and Stripe payment integration.

## Features

- **User Authentication**: Register, login with JWT tokens
- **Email Verification**: Automated email verification with Nodemailer
- **Mobile OTP Verification**: SMS-based OTP verification with Twilio
- **Product Management**: Browse, search, and filter products
- **Shopping Cart**: Add/remove items, update quantities
- **Order Management**: Place orders, view order history
- **Payment Integration**: Stripe payment processing
- **Admin Panel**: Product and order management for admins
- **Responsive Design**: Mobile-friendly interface

## Tech Stack

### Backend
- Node.js + Express
- MongoDB Atlas (Cloud Database)
- Mongoose ODM
- JWT Authentication
- Bcrypt for password hashing
- Nodemailer for email verification
- Twilio for SMS OTP
- Stripe for payments

### Frontend
- React 19
- React Router for navigation
- Axios for API calls
- Context API for state management
- Vite for build tooling

## Setup Instructions

### Backend Setup

1. Navigate to backend directory and install dependencies:
```bash
cd backend
npm install
```

2. Configure environment variables in `backend/.env`

3. Seed the database:
```bash
node seed.js
```

4. Start the backend:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend directory and install dependencies:
```bash
cd frontend
npm install
```

2. Configure environment variables in `frontend/.env`

3. Start the frontend:
```bash
npm run dev
```

## Test Accounts

- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## Deployment

Deploy to Vercel:
```bash
vercel deploy --prod --yes --token YOUR_VERCEL_TOKEN --name agentic-838f50eb
```

## License

MIT
