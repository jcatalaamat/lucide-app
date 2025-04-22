import { sql } from 'drizzle-orm';
import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '../lib/schema/index.js';

async function checkDirectConnection() {
  try {
    // Try direct connection with properly encoded password
    const password = encodeURIComponent('zvf4rqc@dxq*QMF*edv').replace(/\*/g, '%2A');
    const directUrl = `postgresql://postgres:${password}@db.mlmoazsiwfswonkzbgie.supabase.co:5432/postgres`;
    
    console.log('Trying direct URL with encoded password:', directUrl.replace(/:([^:@]+)@/, ':****@'));
    
    // Try a direct connection with postgres-js
    console.log('\nTrying direct Postgres connection...');
    const queryClient = postgres(directUrl);
    const testDb = drizzle(queryClient, { schema });
    
    // Check Drizzle connection
    console.log('Checking Drizzle connection...');
    const result = await testDb.select().from(schema.posts).limit(1);
    console.log('Drizzle connection successful!');
    console.log(`Found ${result.length} posts with Drizzle`);

    // Get database version
    const versionResult = await testDb.execute(sql`SELECT version()`);
    console.log('\nDatabase version:', versionResult[0].version);

  } catch (error) {
    console.error('Connection check failed:', error);
  }
}

checkDirectConnection(); 