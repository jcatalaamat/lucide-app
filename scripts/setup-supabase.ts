import { exec } from 'child_process';
import { promisify } from 'util';
import 'dotenv/config';

const execPromise = promisify(exec);

async function setupSupabase() {
  try {
    console.log('Generating Drizzle migrations...');
    await execPromise('yarn drizzle-kit generate:pg');
    
    console.log('Migrations generated. You can now apply these migrations to your Supabase database.');
    console.log('\nTo apply migrations to Supabase:');
    console.log('1. Go to your Supabase project dashboard');
    console.log('2. Navigate to the SQL Editor');
    console.log('3. Copy and paste the contents of the generated migration files from the ./drizzle folder');
    console.log('4. Run the SQL commands to create or update your schema');
  } catch (error) {
    console.error('Error setting up Supabase:', error);
    process.exit(1);
  }
}

setupSupabase(); 