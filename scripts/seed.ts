import { db } from '../lib/db/index.js';
import { posts, users } from '../lib/schema/index.js';
import { supabase } from '../lib/supabase.js';

async function seed() {
  try {
    console.log('Seeding database...');

    // Sample users data
    const sampleUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com'
      }
    ];

    // Insert users using Drizzle
    console.log('\nInserting sample users using Drizzle ORM...');
    const insertedUsers = await db.insert(users).values(sampleUsers).returning();
    console.log(`Inserted ${insertedUsers.length} users using Drizzle.`);
    
    if (insertedUsers.length === 0) {
      console.log('No users inserted, fetching existing users...');
      const existingUsers = await db.select().from(users);
      
      if (existingUsers.length > 0) {
        console.log(`Found ${existingUsers.length} existing users`);
        insertedUsers.push(...existingUsers);
      } else {
        throw new Error('No users available for posts');
      }
    }
    
    // Alternate user IDs for the posts
    const userIds = insertedUsers.map(user => user.id);
    
    // Sample posts data with user IDs
    const samplePosts = [
      {
        title: 'Getting Started with Supabase and Drizzle',
        content: 'This is a guide to setting up Supabase with Drizzle ORM.',
        userId: userIds[0]
      },
      {
        title: 'Why Type-safe Database Access Matters',
        content: 'Using Drizzle with Supabase provides strong typing and code-first schema management.',
        userId: userIds[1] || userIds[0]
      },
      {
        title: 'Building a React Native App with Supabase',
        content: 'Learn how to integrate Supabase into your React Native application.',
        userId: userIds[0]
      }
    ];

    // Insert using Supabase client (with RLS policies, this might fail)
    console.log('\nInserting sample posts using Supabase client...');
    try {
      const { data: supabaseData, error } = await supabase
        .from('posts')
        .insert(samplePosts.map(post => ({
          title: post.title,
          content: post.content,
          user_id: post.userId // Need to use snake_case for Supabase
        })))
        .select();
      
      if (error) {
        console.error('Error inserting with Supabase:', error.message);
      } else {
        console.log(`Inserted ${supabaseData.length} posts using Supabase client.`);
      }
    } catch (err) {
      console.error('Supabase insertion error:', err);
    }

    // Insert posts using Drizzle
    console.log('\nInserting sample posts using Drizzle ORM...');
    const insertedPosts = await db.insert(posts).values(samplePosts).returning();
    console.log(`Inserted ${insertedPosts.length} posts using Drizzle.`);

    console.log('\nSeeding complete!');
  } catch (error) {
    console.error('Seeding failed:', error);
  }
}

seed(); 