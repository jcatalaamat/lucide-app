import { createClient } from '@supabase/supabase-js';

// Use the simplest possible client setup
const supabaseUrl = 'https://mlmoazsiwfswonkzbgie.supabase.co';

// Replace with your actual key - make sure there are no extra spaces or characters
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbW9henNpd2Zzd29ua3piZ2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTgzNzUsImV4cCI6MjA2MDg5NDM3NX0.5k57Gybv4GgKTBc1x4ZFBSBJ1PEy264LTcafBCSrkdQ';

// Create and export the Supabase client 
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 