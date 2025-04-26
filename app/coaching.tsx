import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  StatusBar,
  Image 
} from 'react-native';
import { Link } from 'one';
import CoachingCard from './components/CoachingCard';
import CoachProfile from './components/CoachProfile';

// Mock data for coaching sessions
const COACHING_SESSIONS = [
  {
    id: '1',
    title: 'Mindfulness for Beginners',
    coach: 'Dr. Emma Wilson',
    duration: '45 mins',
    imageUrl: 'https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=500',
    category: 'Meditation'
  },
  {
    id: '2',
    title: 'Peak Performance Training',
    coach: 'James Roberts',
    duration: '60 mins',
    imageUrl: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=500',
    category: 'Fitness'
  },
  {
    id: '3',
    title: 'Emotional Intelligence Workshop',
    coach: 'Sarah Chen, PhD',
    duration: '90 mins',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=500',
    category: 'Personal Growth'
  }
];

// Mock data for featured coaches
const FEATURED_COACHES = [
  {
    id: '1',
    name: 'Dr. Emma Wilson',
    specialty: 'Meditation',
    rating: 4.9,
    reviewCount: 127,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200'
  },
  {
    id: '2',
    name: 'James Roberts',
    specialty: 'Fitness',
    rating: 4.8,
    reviewCount: 93,
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200'
  },
  {
    id: '3',
    name: 'Sarah Chen',
    specialty: 'Personal Growth',
    rating: 4.9,
    reviewCount: 105,
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200'
  },
  {
    id: '4',
    name: 'Michael Jordan',
    specialty: 'Career Coach',
    rating: 4.7,
    reviewCount: 82,
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200'
  },
];

// Categories for quick filtering
const CATEGORIES = [
  'All',
  'Meditation',
  'Fitness',
  'Career',
  'Relationships',
  'Mindfulness',
  'Personal Growth'
];

export default function CoachingPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      {/* Header and Navigation */}
      <View className="flex-row items-center justify-between pt-14 px-5 pb-3 bg-white">
        <Link href="/">
          <View className="w-8 h-8 items-center justify-center rounded-full bg-gray-100">
            <Text>←</Text>
          </View>
        </Link>
        <Text className="text-lg font-bold text-gray-800">Coaching</Text>
        <TouchableOpacity className="w-8 h-8 items-center justify-center">
          <Text>🔔</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Hero Section */}
        <View className="px-5 pt-5 pb-7 bg-white">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Find Your Perfect Coach
          </Text>
          <Text className="text-gray-500 mb-5">
            Connect with expert coaches to achieve your goals
          </Text>
          
          {/* Search Bar */}
          <View className="flex-row items-center bg-gray-100 px-4 py-3 rounded-xl">
            <Text className="mr-2">🔍</Text>
            <TextInput
              placeholder="Search coaches or topics"
              placeholderTextColor="#9CA3AF"
              className="flex-1 text-gray-700"
            />
          </View>
        </View>
        
        {/* Categories */}
        <View className="mt-4">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            className="py-2"
          >
            {CATEGORIES.map(category => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                className={`mr-2 px-4 py-2 rounded-full ${
                  activeCategory === category 
                    ? 'bg-blue-500' 
                    : 'bg-gray-100'
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    activeCategory === category 
                      ? 'text-white' 
                      : 'text-gray-700'
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Featured Coaches Section */}
        <View className="mt-6 pb-5">
          <View className="flex-row items-center justify-between px-5 mb-4">
            <Text className="text-lg font-bold text-gray-800">Featured Coaches</Text>
            <TouchableOpacity>
              <Text className="text-sm text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 10 }}
          >
            {FEATURED_COACHES.map(coach => (
              <CoachProfile
                key={coach.id}
                id={coach.id}
                name={coach.name}
                specialty={coach.specialty}
                rating={coach.rating}
                reviewCount={coach.reviewCount}
                imageUrl={coach.imageUrl}
                onPress={() => console.log(`Selected coach: ${coach.name}`)}
              />
            ))}
          </ScrollView>
        </View>
        
        {/* Session Types */}
        <View className="flex-row justify-between px-5 py-4">
          <TouchableOpacity className="px-3 py-3 bg-blue-50 rounded-xl items-center justify-center flex-1 mr-2">
            <View className="h-10 w-10 items-center justify-center mb-2 rounded-full bg-blue-100">
              <Text className="text-xl">1:1</Text>
            </View>
            <Text className="text-sm font-medium text-gray-800">Private</Text>
            <Text className="text-xs text-gray-500">Sessions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="px-3 py-3 bg-amber-50 rounded-xl items-center justify-center flex-1 mx-2">
            <View className="h-10 w-10 items-center justify-center mb-2 rounded-full bg-amber-100">
              <Text className="text-xl">👥</Text>
            </View>
            <Text className="text-sm font-medium text-gray-800">Group</Text>
            <Text className="text-xs text-gray-500">Sessions</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="px-3 py-3 bg-green-50 rounded-xl items-center justify-center flex-1 ml-2">
            <View className="h-10 w-10 items-center justify-center mb-2 rounded-full bg-green-100">
              <Text className="text-xl">🎓</Text>
            </View>
            <Text className="text-sm font-medium text-gray-800">Courses</Text>
            <Text className="text-xs text-gray-500">& Workshops</Text>
          </TouchableOpacity>
        </View>
        
        {/* Upcoming Sessions */}
        <View className="mt-3 px-5">
          <Text className="text-lg font-bold text-gray-800 mb-4">Recommended Sessions</Text>
          
          {COACHING_SESSIONS.map(session => (
            <CoachingCard
              key={session.id}
              id={session.id}
              title={session.title}
              coach={session.coach}
              duration={session.duration}
              imageUrl={session.imageUrl}
              category={session.category}
              onPress={() => console.log(`Selected session: ${session.title}`)}
            />
          ))}
        </View>
      </ScrollView>
      
      {/* Bottom CTA */}
      <View className="p-5 bg-white border-t border-gray-200">
        <TouchableOpacity className="py-3 rounded-xl bg-blue-500 items-center">
          <Text className="text-white font-semibold">Find Your Coach Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
} 