# E-Commerce Implementation Details

## Deployment Information

**Live Application**: https://agentic-838f50eb.vercel.app

**GitHub Repository**: https://github.com/Design-Arena-Gens/agentic-838f50eb

**Branch**: devin/ecommerce-implementation

## Architecture Overview

This is a full-stack MERN (MongoDB, Express, React, Node.js) e-commerce application with the following architecture:

### Backend (Express + MongoDB)
- **Location**: `/backend` directory
- **Server**: Express.js REST API
- **Database**: MongoDB Atlas (cloud-hosted)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Email**: Nodemailer for email verification
- **SMS**: Twilio for mobile OTP verification
- **Payments**: Stripe integration

### Frontend (React + Vite)
- **Location**: `/frontend` directory
- **Framework**: React 19 with Vite build tool
- **Routing**: React Router v7
- **State Management**: Context API (AuthContext, CartContext)
- **HTTP Client**: Axios
- **Styling**: Inline styles (CSS-in-JS approach)

## Key Features Implemented

### 1. User Authentication & Verification
- User registration with email and optional mobile number
- Login with JWT token authentication
- Email verification via Nodemailer (sends verification link)
- Mobile OTP verification via Twilio (6-digit code, 10-minute expiry)
- Password hashing with bcrypt (10 rounds)
- Protected routes requiring authentication

### 2. Product Management
- Product listing with search and category filtering
- Product detail pages with image display
- Stock management (automatic reduction on order)
- Admin-only product CRUD operations
- Categories: Electronics, Accessories, Home & Office, Stationery

### 3. Shopping Cart
- Add/remove products
- Update quantities
- Persistent cart using localStorage
- Real-time total calculation
- Stock validation before checkout

### 4. Order Processing
- Create orders with shipping address
- Order history for users
- Order status tracking (pending, paid, shipped, delivered, cancelled)
- Admin order management
- Email confirmation on order placement

### 5. Payment Integration
- Stripe payment intents
- Secure payment processing
- Webhook for payment confirmation
- Order status updates on successful payment

## Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  mobile: String,
  passwordHash: String,
  role: String (user|admin),
  emailVerified: Boolean,
  mobileVerified: Boolean,
  emailVerificationToken: String,
  emailVerificationExpires: Date,
  mobileOTP: String,
  mobileOTPExpires: Date,
  timestamps: true
}
```

### Products Collection
```javascript
{
  title: String,
  slug: String (unique),
  description: String,
  price: Number,
  images: [String],
  category: String,
  stock: Number,
  attributes: Map,
  timestamps: true
}
```

### Orders Collection
```javascript
{
  userId: ObjectId (ref: User),
  items: [{
    productId: ObjectId (ref: Product),
    title: String,
    qty: Number,
    priceAtPurchase: Number
  }],
  shippingAddress: {
    fullName, address, city, state, zipCode, country, phone
  },
  status: String (pending|paid|shipped|delivered|cancelled),
  total: Number,
  paymentIntentId: String,
  paymentStatus: String,
  timestamps: true
}
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user
- `GET /verify-email/:token` - Verify email address
- `POST /send-mobile-otp` - Send OTP to mobile
- `POST /verify-mobile-otp` - Verify mobile OTP

### Products (`/api/products`)
- `GET /` - Get all products (with search & category filters)
- `GET /:id` - Get product by ID
- `POST /` - Create product (admin only)
- `PUT /:id` - Update product (admin only)
- `DELETE /:id` - Delete product (admin only)
- `GET /categories/list` - Get all categories

### Orders (`/api/orders`)
- `POST /` - Create order
- `GET /` - Get user orders (or all orders for admin)
- `GET /:id` - Get order by ID
- `PUT /:id/status` - Update order status (admin only)

### Payments (`/api/payments`)
- `POST /create-payment-intent` - Create Stripe payment intent
- `POST /webhook` - Stripe webhook handler

## Frontend Pages

1. **Home** (`/`) - Landing page with features
2. **Products** (`/products`) - Product listing with search/filter
3. **Product Detail** (`/products/:id`) - Individual product page
4. **Cart** (`/cart`) - Shopping cart
5. **Checkout** (`/checkout`) - Checkout form
6. **Orders** (`/orders`) - Order history
7. **Login** (`/login`) - User login
8. **Register** (`/register`) - User registration

## Test Data

The application includes seed data with:
- 2 test users (admin and regular user)
- 12 sample products across 4 categories
- Products include electronics, accessories, and office supplies

**Test Accounts**:
- Admin: `admin@example.com` / `admin123`
- User: `user@example.com` / `user123`

## Environment Variables

### Backend (`backend/.env`)
```
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=your-twilio-phone
STRIPE_SECRET_KEY=your-stripe-secret-key
FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:4000
VITE_STRIPE_PUBLIC_KEY=your-stripe-public-key
```

## Security Features

1. **Password Security**: Bcrypt hashing with 10 rounds
2. **JWT Authentication**: Secure token-based auth
3. **Protected Routes**: Middleware for auth and admin checks
4. **Input Validation**: Express-validator for request validation
5. **CORS Configuration**: Restricted to frontend origin
6. **Environment Variables**: Sensitive data in .env files
7. **Token Expiry**: Email tokens (24h), OTP (10min), JWT (7d)

## Deployment Configuration

### Vercel (`vercel.json`)
```json
{
  "buildCommand": "cd frontend && npm install && npm run build",
  "outputDirectory": "frontend/dist",
  "installCommand": "cd frontend && npm install"
}
```

The frontend is deployed as a static site on Vercel. The backend needs to be deployed separately (e.g., Heroku, Render, Railway).

## Important Notes

### For Production Use:
1. **MongoDB Atlas**: Update connection string with production credentials
2. **Email Service**: Configure Gmail app password or use SendGrid/Mailgun
3. **Twilio**: Add production Twilio credentials
4. **Stripe**: Replace test keys with production keys
5. **CORS**: Update allowed origins for production frontend URL
6. **Environment Variables**: Set all env vars in deployment platform
7. **Backend Deployment**: Deploy backend to a hosting service
8. **Frontend API URL**: Update `VITE_API_URL` to production backend URL

### Current Limitations:
- Backend is not deployed (only frontend on Vercel)
- Email and SMS features require valid credentials to work
- Payment processing requires Stripe account setup
- MongoDB Atlas connection string needs to be configured

## File Structure

```
agentic-838f50eb/
├── backend/
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── payments.js
│   ├── utils/
│   │   ├── email.js
│   │   └── sms.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProductCard.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env
├── vercel.json
└── README.md
```

## Next Steps for Full Functionality

1. **Deploy Backend**: Deploy Express backend to Heroku, Render, or Railway
2. **Configure MongoDB**: Set up MongoDB Atlas cluster and update connection string
3. **Email Setup**: Configure email service (Gmail app password or SendGrid)
4. **SMS Setup**: Add Twilio credentials for OTP verification
5. **Stripe Setup**: Configure Stripe account and add API keys
6. **Update Frontend**: Change `VITE_API_URL` to production backend URL
7. **Test End-to-End**: Test all features with real services
8. **Add Admin Panel**: Create admin dashboard for product/order management

## Technologies Used

- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Frontend**: React 19, Vite, React Router
- **Authentication**: JWT, Bcrypt
- **Email**: Nodemailer
- **SMS**: Twilio
- **Payments**: Stripe
- **Deployment**: Vercel (frontend)
- **Version Control**: Git, GitHub

## License

MIT License
