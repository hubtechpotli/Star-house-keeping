# 🚀 Star_Housekeeping  - Supabase Integration Setup Guide

This guide will help you set up your Star_Housekeeping  project with Supabase for authentication and database management.

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)
- Git repository set up

## 🔧 Step 1: Supabase Project Setup

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `Star_Housekeeping-`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 1.2 Get Project Credentials
1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## 🔧 Step 2: Environment Configuration

### 2.1 Backend Environment
1. Copy `Backend/env.example` to `Backend/.env`
2. Update the values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@Star_Housekeeping.com

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,https://yourdomain.com
```

### 2.2 Frontend Environment
1. Copy `Frontend/env.local.example` to `Frontend/.env.local`
2. Update the values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Frontend Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=Star_Housekeeping 
```

## 🔧 Step 3: Install Dependencies

### 3.1 Backend Dependencies
```bash
cd Backend
npm install
```

### 3.2 Frontend Dependencies
```bash
cd Frontend
npm install
```

## 🔧 Step 4: Database Setup

### 4.1 Run Database Setup Script
```bash
cd Backend
npm run setup
```

This script will:
- Create all necessary tables
- Set up Row Level Security (RLS) policies
- Insert sample data
- Configure proper indexes

### 4.2 Manual Database Setup (Alternative)
If the script doesn't work, you can run the SQL manually in Supabase SQL Editor:

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the SQL from `Backend/scripts/setup-database.js`
3. Run the SQL commands

## 🔧 Step 5: Start the Services

### 5.1 Start Backend
```bash
cd Backend
npm run dev
```

The backend will start on `http://localhost:5000`

### 5.2 Start Frontend
```bash
cd Frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## 🔧 Step 6: Test the Integration

### 6.1 Test Backend Health
```bash
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Star_Housekeeping  Backend is running",
  "timestamp": "2024-01-XX..."
}
```

### 6.2 Test Frontend
1. Open `http://localhost:3000` in your browser
2. Navigate to different pages
3. Check browser console for any errors

## 🔧 Step 7: Authentication Testing

### 7.1 Test User Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "fullName": "Test User",
    "phone": "1234567890",
    "address": "123 Test St",
    "city": "Test City",
    "state": "Test State",
    "zipCode": "12345"
  }'
```

### 7.2 Test User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 🔧 Step 8: Supabase Dashboard Verification

### 8.1 Check Tables
1. Go to **Table Editor** in Supabase
2. Verify these tables exist:
   - `users`
   - `plans`
   - `payments`
   - `support_tickets`
   - `contact_inquiries`

### 8.2 Check Authentication
1. Go to **Authentication** → **Users**
2. Verify user accounts are being created
3. Check **Settings** → **Auth** for configuration

### 8.3 Check RLS Policies
1. Go to **Authentication** → **Policies**
2. Verify Row Level Security is enabled
3. Check that policies are properly configured

## 🔧 Step 9: Production Deployment

### 9.1 Environment Variables
- Update all environment variables for production
- Use production Supabase project
- Set proper CORS origins
- Configure production email settings

### 9.2 Vercel Deployment
1. Push your code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

## 🚨 Troubleshooting

### Common Issues

#### 1. Supabase Connection Error
```
Error: Missing Supabase environment variables
```
**Solution**: Check your `.env` file has all required Supabase variables

#### 2. RLS Policy Errors
```
Error: new row violates row-level security policy
```
**Solution**: Verify RLS policies are correctly set up in Supabase

#### 3. Authentication Errors
```
Error: Invalid JWT
```
**Solution**: Check JWT_SECRET is properly set and consistent

#### 4. CORS Errors
```
Error: CORS policy blocked request
```
**Solution**: Update CORS_ORIGIN in backend environment

### Debug Commands

#### Check Supabase Connection
```bash
cd Backend
node -e "
const supabase = require('./config/supabase');
supabase.from('users').select('count').then(console.log).catch(console.error);
"
```

#### Check Environment Variables
```bash
cd Backend
node -e "require('dotenv').config(); console.log('SUPABASE_URL:', process.env.SUPABASE_URL);"
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Documentation](https://nextjs.org/docs)

## 🎯 Next Steps

After successful setup:
1. Customize the database schema as needed
2. Add more API endpoints
3. Implement frontend components
4. Add Stripe payment integration
5. Set up email notifications
6. Add monitoring and logging

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Supabase logs in the dashboard
3. Check browser console for frontend errors
4. Verify all environment variables are set correctly

---

**Happy coding! 🚀**
