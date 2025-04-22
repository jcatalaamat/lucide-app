import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../schema/index.js';

// Use hardcoded connection URL for client-side rendering
// This avoids issues with dotenv in browser environments
const DATABASE_URL = 'postgresql://postgres.mlmoazsiwfswonkzbgie:zvf4rqc%40dxq%2AQMF%2Aedv@aws-0-eu-west-3.pooler.supabase.com:6543/postgres';

// Create a postgres connection
const queryClient = postgres(DATABASE_URL);

// Create a drizzle client
export const db = drizzle(queryClient, { schema });

// Export for use in the application
export { schema }; 