const supabase = require('../config/supabase')

async function setupDatabase() {
  console.log('🚀 Setting up Star_Housekeeping  database in Supabase...')

  try {
    // Create plans table first (since users references it)
    console.log('📋 Creating plans table...')
    const { error: plansError } = await supabase
      .from('plans')
      .select('count')
      .limit(1)

    if (plansError && plansError.code === 'PGRST116') {
      // Table doesn't exist, create it manually in Supabase dashboard
      console.log('⚠️  Plans table does not exist. Please create it manually in Supabase dashboard:')
      console.log(`
        CREATE TABLE plans (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          speed VARCHAR(100) NOT NULL,
          price DECIMAL(10,2) NOT NULL,
          features TEXT[] NOT NULL,
          data_cap VARCHAR(100) NOT NULL,
          contract_length INTEGER NOT NULL,
          is_featured BOOLEAN DEFAULT false,
          is_available BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)
    } else {
      console.log('✅ Plans table exists')
    }

    // Create users table
    console.log('📋 Checking users table...')
    const { error: usersError } = await supabase
      .from('users')
      .select('count')
      .limit(1)

    if (usersError && usersError.code === 'PGRST116') {
      console.log('⚠️  Users table does not exist. Please create it manually in Supabase dashboard:')
      console.log(`
        CREATE TABLE users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          phone VARCHAR(20) NOT NULL,
          address TEXT NOT NULL,
          city VARCHAR(100) NOT NULL,
          state VARCHAR(100) NOT NULL,
          zip_code VARCHAR(20) NOT NULL,
          plan_id UUID REFERENCES plans(id),
          subscription_status VARCHAR(20) DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'suspended')),
          role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'support')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)
    } else {
      console.log('✅ Users table exists')
    }

    // Create payments table
    console.log('📋 Checking payments table...')
    const { error: paymentsError } = await supabase
      .from('payments')
      .select('count')
      .limit(1)

    if (paymentsError && paymentsError.code === 'PGRST116') {
      console.log('⚠️  Payments table does not exist. Please create it manually in Supabase dashboard:')
      console.log(`
        CREATE TABLE payments (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          plan_id UUID NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
          amount DECIMAL(10,2) NOT NULL,
          currency VARCHAR(3) DEFAULT 'USD',
          payment_method VARCHAR(50) NOT NULL,
          status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
          stripe_payment_intent_id VARCHAR(255),
          stripe_subscription_id VARCHAR(255),
          billing_cycle VARCHAR(20) DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
          next_billing_date TIMESTAMP WITH TIME ZONE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)
    } else {
      console.log('✅ Payments table exists')
    }

    // Create support_tickets table
    console.log('📋 Checking support_tickets table...')
    const { error: ticketsError } = await supabase
      .from('support_tickets')
      .select('count')
      .limit(1)

    if (ticketsError && ticketsError.code === 'PGRST116') {
      console.log('⚠️  Support tickets table does not exist. Please create it manually in Supabase dashboard:')
      console.log(`
        CREATE TABLE support_tickets (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          subject VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
          priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
          category VARCHAR(100) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)
    } else {
      console.log('✅ Support tickets table exists')
    }

    // Create contact_inquiries table
    console.log('📋 Checking contact_inquiries table...')
    const { error: contactError } = await supabase
      .from('contact_inquiries')
      .select('count')
      .limit(1)

    if (contactError && contactError.code === 'PGRST116') {
      console.log('⚠️  Contact inquiries table does not exist. Please create it manually in Supabase dashboard:')
      console.log(`
        CREATE TABLE contact_inquiries (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          subject VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          department VARCHAR(100) NOT NULL,
          status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `)
    } else {
      console.log('✅ Contact inquiries table exists')
    }

    // Insert sample data if plans table exists
    console.log('📝 Checking for sample data...')
    const { data: existingPlans, error: checkPlansError } = await supabase
      .from('plans')
      .select('*')
      .limit(1)

    if (!checkPlansError && existingPlans && existingPlans.length === 0) {
      console.log('📝 Inserting sample plans data...')
      const { error: samplePlansError } = await supabase
        .from('plans')
        .insert([
          {
            name: 'Basic Plan',
            description: 'Perfect for light internet usage',
            speed: '50 Mbps',
            price: 29.99,
            features: ['50 Mbps download', '10 Mbps upload', 'Unlimited data', 'Basic support'],
            data_cap: 'Unlimited',
            contract_length: 12,
            is_featured: false,
            is_available: true
          },
          {
            name: 'Standard Plan',
            description: 'Great for streaming and gaming',
            speed: '200 Mbps',
            price: 49.99,
            features: ['200 Mbps download', '50 Mbps upload', 'Unlimited data', 'Priority support', 'Free installation'],
            data_cap: 'Unlimited',
            contract_length: 12,
            is_featured: true,
            is_available: true
          },
          {
            name: 'Premium Plan',
            description: 'Ultra-fast internet for power users',
            speed: '1 Gbps',
            price: 79.99,
            features: ['1 Gbps download', '200 Mbps upload', 'Unlimited data', '24/7 priority support', 'Free installation', 'Free modem'],
            data_cap: 'Unlimited',
            contract_length: 12,
            is_featured: true,
            is_available: true
          }
        ])

      if (samplePlansError) {
        console.log('⚠️  Sample plans insertion error:', samplePlansError.message)
      } else {
        console.log('✅ Sample plans inserted successfully')
      }
    } else {
      console.log('✅ Sample data already exists or table not ready')
    }

    console.log('🎉 Database setup check completed!')
    console.log('📊 Please create any missing tables in your Supabase dashboard')
    console.log('🔗 Go to: https://huqmkwnpvztcsafkilvu.supabase.co')
    console.log('📝 Use the SQL Editor to run the CREATE TABLE commands shown above')

  } catch (error) {
    console.error('❌ Database setup failed:', error)
    console.log('📋 Please check your Supabase connection and create tables manually')
  }
}

// Run setup if called directly
if (require.main === module) {
  setupDatabase()
}

module.exports = setupDatabase
