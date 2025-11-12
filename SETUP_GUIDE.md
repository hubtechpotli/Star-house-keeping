# Star_Housekeeping  - Complete Setup Guide

This guide will help you set up and run both the frontend and backend of the Star_Housekeeping  website.

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local or cloud) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

### 1. Clone and Setup
```bash
# Clone the repository
git clone <your-repo-url>
cd Template_1

# Install frontend dependencies
cd Frontend
npm install

# Install backend dependencies
cd ../Backend
npm install
```

### 2. Environment Configuration

#### Backend (.env)
```bash
cd Backend
cp env.example .env
```

Edit `.env` with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/Star_Housekeeping

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Stripe Configuration (Optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)
```bash
cd Frontend
```

Create `.env.local`:
```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Stripe Configuration (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key

# App Configuration
NEXT_PUBLIC_APP_NAME=Star_Housekeeping 
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start the Services

#### Start Backend (Terminal 1)
```bash
cd Backend

# Windows
start.bat

# Linux/Mac
chmod +x start.sh
./start.sh

# Or manually
npm run dev
```

#### Start Frontend (Terminal 2)
```bash
cd Frontend
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 📁 Project Structure

```
Template_1/
├── Frontend/                 # Next.js Frontend
│   ├── app/                 # Next.js 14 app directory
│   ├── components/          # React components
│   ├── lib/                 # API services & utilities
│   ├── public/              # Static assets
│   └── package.json         # Frontend dependencies
├── Backend/                  # Node.js Backend
│   ├── config/              # Database & configuration
│   ├── middleware/          # Express middleware
│   ├── models/              # MongoDB models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── server.js            # Main server file
│   └── package.json         # Backend dependencies
└── SETUP_GUIDE.md           # This file
```

## 🔧 Backend Features

### API Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get user profile
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

#### Plans
- `GET /api/plans` - Get all plans
- `GET /api/plans/:id` - Get plan by ID
- `GET /api/plans/popular/featured` - Get featured plans
- `POST /api/plans` - Create plan (Admin)
- `PUT /api/plans/:id` - Update plan (Admin)
- `DELETE /api/plans/:id` - Delete plan (Admin)

#### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Payment history
- `POST /api/payments/cancel-subscription` - Cancel subscription

#### Support
- `POST /api/support/ticket` - Create support ticket
- `GET /api/support/tickets` - Get user tickets
- `POST /api/support/tickets/:id/message` - Add message to ticket

#### Contact
- `POST /api/contact/inquiry` - Submit inquiry
- `POST /api/contact/feedback` - Submit feedback
- `POST /api/contact/availability-check` - Check service availability

### Database Models

#### User
- Personal information (name, email, phone, address)
- Authentication (password, JWT tokens)
- Subscription status and current plan
- Role-based permissions (customer, support, admin)

#### Plan
- Service details (name, description, speeds)
- Pricing (monthly/yearly)
- Features and availability
- Categorization and popularity flags

#### Payment
- Payment details and status
- Stripe integration data
- Billing cycle information
- Receipt and metadata

## 🎨 Frontend Features

### Pages
- **Home** - Landing page with service overview
- **About** - Company information
- **Plans** - Service plans and pricing
- **Contact** - Contact forms
- **Support** - Customer support
- **Profile** - User account management

### Components
- Responsive navigation
- Hero sections
- Plan showcase cards
- Feature highlights
- Testimonials
- Contact forms
- Payment interface

### API Integration
- Complete API service layer
- Authentication management
- Form handling
- Error handling
- Loading states

## 🗄️ Database Setup

### Local MongoDB
```bash
# Install MongoDB Community Edition
# Start MongoDB service
mongod

# Or use MongoDB Compass (GUI)
```

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create new cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### Sample Data
The backend will create the database automatically. You can add sample data:

```javascript
// Example plan data
{
  "name": "Basic Plan",
  "description": "Perfect for light internet users",
  "speed": {
    "download": 50,
    "upload": 25,
    "unit": "Mbps"
  },
  "price": {
    "monthly": 29.99,
    "yearly": 299.99
  },
  "features": ["Unlimited data", "Free installation", "24/7 support"],
  "category": "basic",
  "opular": false
}
```

## 💳 Payment Setup (Optional)

### Stripe Configuration
1. Create account at [Stripe](https://stripe.com/)
2. Get API keys from dashboard
3. Update `.env` with your keys
4. Test with Stripe test cards

### Test Cards
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## 📧 Email Setup (Optional)

### Gmail Configuration
1. Enable 2-factor authentication
2. Generate app password
3. Update `.env` with credentials

### Other Providers
- SendGrid
- Mailgun
- AWS SES

## 🚀 Deployment

### Backend Deployment

#### Heroku
```bash
# Install Heroku CLI
heroku create Star_Housekeeping-backend
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

#### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

#### DigitalOcean App Platform
1. Connect repository
2. Configure environment
3. Deploy with one click

### Frontend Deployment

#### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

#### Netlify
1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `out`

## 🧪 Testing

### API Testing
```bash
# Health check
curl http://localhost:5000/api/health

# Get plans
curl http://localhost:5000/api/plans

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "CA",
      "zipCode": "12345"
    }
  }'
```

### Frontend Testing
- Open browser developer tools
- Check console for errors
- Test responsive design
- Verify API calls

## 🔍 Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check Node.js version
node --version

# Check if port is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Linux/Mac

# Check MongoDB connection
mongosh mongodb://localhost:27017
```

#### Frontend Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run dev

# Check Node.js version
node --version

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Database Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check connection string
echo $MONGODB_URI

# Test connection
mongosh "your_connection_string"
```

#### CORS Issues
- Verify `FRONTEND_URL` in backend `.env`
- Check CORS configuration in `server.js`
- Ensure frontend is running on correct port

### Performance Issues
- Check MongoDB indexes
- Monitor API response times
- Use browser dev tools for frontend
- Check server logs

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Stripe Documentation](https://stripe.com/docs)

### Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [Stripe Dashboard](https://dashboard.stripe.com/) - Payment management

### Community
- [Next.js Discord](https://discord.gg/nextjs)
- [Express.js GitHub](https://github.com/expressjs/express)
- [MongoDB Community](https://community.mongodb.com/)

## 🤝 Support

### Getting Help
1. Check this setup guide
2. Review error logs
3. Check documentation links
4. Create GitHub issue
5. Contact development team

### Contributing
1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

---

**Star_Housekeeping ** - Powering the future of internet services.

For additional support, please refer to the project documentation or create an issue in the repository.
