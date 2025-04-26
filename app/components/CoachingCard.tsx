import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface CoachingCardProps {
  id?: string;
  title: string;
  coach: string;
  duration: string;
  imageUrl: string;
  category: string;
  onPress: () => void;
}

export default function CoachingCard({
  title,
  coach,
  duration,
  imageUrl,
  category,
  onPress,
}: CoachingCardProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-xl bg-white"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
      }}
    >
      <View className="relative">
        <Image
          source={{ uri: imageUrl }}
          className="h-48 w-full"
          resizeMode="cover"
        />
        <View className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md">
          <Text className="text-xs font-medium text-white">{category}</Text>
        </View>
      </View>
      
      <View className="p-4">
        <Text className="text-lg font-bold text-gray-800 mb-1">{title}</Text>
        <Text className="text-sm text-gray-600 mb-3">with {coach}</Text>
        
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <View className="h-5 w-5 items-center justify-center rounded-full bg-blue-100 mr-2">
              <Text className="text-xs text-blue-600">⏱️</Text>
            </View>
            <Text className="text-xs text-gray-500">{duration}</Text>
          </View>
          
          <TouchableOpacity className="px-3 py-1 rounded-full bg-blue-500">
            <Text className="text-xs font-medium text-white">Book</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
} 