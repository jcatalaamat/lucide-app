import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Index() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fullError, setFullError] = useState(null);

  // Simple fetch function
  async function fetchPosts() {
    setLoading(true);
    setError(null);
    setFullError(null);
    
    try {
      console.log('Fetching posts...');
      
      const { data, error, status, statusText } = await supabase
        .from('posts')
        .select('*')
        .limit(10);
      
      if (error) {
        console.error('Supabase error:', error);
        setError(error.message);
        setFullError(JSON.stringify({
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          status,
          statusText
        }, null, 2));
      } else {
        console.log('Success! Data:', data);
        setPosts(data || []);
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError("Failed to load posts");
      setFullError(err.toString());
    } finally {
      setLoading(false);
    }
  }
  
  // Load posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Posts</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          
          {error.includes("API key") && (
            <View style={styles.errorHelp}>
              <Text style={styles.errorHelpTitle}>To fix this:</Text>
              <Text style={styles.errorHelpText}>1. Go to Supabase dashboard: app.supabase.com</Text>
              <Text style={styles.errorHelpText}>2. Select your project</Text>
              <Text style={styles.errorHelpText}>3. Go to Settings {'>'}  API</Text>
              <Text style={styles.errorHelpText}>4. Copy the "anon public" key (NOT the service_role key)</Text>
              <Text style={styles.errorHelpText}>5. Update the key in lib/supabase.ts</Text>
            </View>
          )}
          
          {fullError && (
            <View style={styles.errorDetails}>
              <Text style={styles.errorDetailsText}>Error details:</Text>
              <ScrollView style={styles.errorScroll}>
                <Text style={styles.errorDetailsContent}>{fullError}</Text>
              </ScrollView>
            </View>
          )}
        </View>
      ) : posts.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          {posts.map(post => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>{post.content}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts found. The database might be empty.</Text>
        </View>
      )}
      
      <TouchableOpacity 
        onPress={fetchPosts}
        style={styles.button}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Refreshing..." : "Refresh Posts"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ffcdd2',
    marginBottom: 16,
  },
  errorText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  errorHelp: {
    marginTop: 8,
  },
  errorHelpTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  errorHelpText: {
    marginBottom: 2,
  },
  errorDetails: {
    marginTop: 12,
    padding: 8,
  },
  errorDetailsText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  errorScroll: {
    maxHeight: 120,
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 4,
  },
  errorDetailsContent: {
    color: 'white',
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  postCard: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 8,
    borderRadius: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    marginTop: 8,
    color: '#555',
  },
  emptyContainer: {
    padding: 16,
    backgroundColor: '#fff9c4',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#fff59d',
  },
  emptyText: {
    color: '#616161',
  },
  button: {
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
