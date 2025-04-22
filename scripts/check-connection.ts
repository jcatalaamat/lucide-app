import { supabase } from '../lib/supabase.js';
import { sql } from 'drizzle-orm';
import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../lib/schema/index.js';

async function checkConnection() {
  try {
    // Original DATABASE_URL from environment
    console.log('Original DATABASE_URL:', (process.env.DATABASE_URL || '').replace(/:([^:@]+)@/, ':****@'));
    
    // Create a direct connection to the pooler
    const poolerUrl = 'postgresql://postgres.mlmoazsiwfswonkzbgie:zvf4rqc%40dxq%2AQMF%2Aedv@aws-0-eu-west-3.pooler.supabase.com:6543/postgres';
    console.log('Trying pooler URL:', poolerUrl.replace(/:([^:@]+)@/, ':****@'));
    
    // Check Supabase connection
    console.log('\n--- Supabase Client ---');
    console.log('Fetching posts...');
    const { data: posts, error: postsError } = await supabase.from('posts').select('*');
    
    if (postsError) {
      console.error('Supabase posts error:', postsError.message);
    } else {
      console.log(`Found ${posts.length} posts with Supabase client`);
      console.log(posts);
    }
    
    // Check for users table
    console.log('\nFetching users...');
    const { data: users, error: usersError } = await supabase.from('users').select('*');
    
    if (usersError) {
      console.error('Supabase users error:', usersError.message);
    } else {
      console.log(`Found ${users.length} users with Supabase client`);
      console.log(users);
    }

    // Try a direct connection with postgres-js
    console.log('\n--- Drizzle ORM ---');
    const queryClient = postgres(poolerUrl);
    const testDb = drizzle(queryClient, { schema });
    
    // Check Drizzle connection for posts
    console.log('Fetching posts...');
    const drizzlePosts = await testDb.select().from(schema.posts);
    console.log(`Found ${drizzlePosts.length} posts with Drizzle ORM`);
    console.log(drizzlePosts);
    
    // Check Drizzle connection for users
    console.log('\nFetching users...');
    const drizzleUsers = await testDb.select().from(schema.users);
    console.log(`Found ${drizzleUsers.length} users with Drizzle ORM`);
    console.log(drizzleUsers);

    // Get database version
    const versionResult = await testDb.execute(sql`SELECT version()`);
    console.log('\nDatabase version:', versionResult[0].version);

  } catch (error) {
    console.error('Connection check failed:', error);
  }
}

checkConnection(); 