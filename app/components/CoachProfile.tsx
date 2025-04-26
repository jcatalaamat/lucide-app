import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface CoachProfileProps {
  id?: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  onPress: () => void;
}

export default function CoachProfile({
  name,
  specialty,
  rating,
  reviewCount,
  imageUrl,
  onPress,
}: CoachProfileProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="mr-4 w-32 items-center"
    >
      <View className="relative mb-2">
        <Image
          source={{ uri: imageUrl }}
          className="h-16 w-16 rounded-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-white"></View>
      </View>
      
      <Text className="text-sm font-semibold text-center text-gray-800">{name}</Text>
      <Text className="text-xs text-center text-gray-500 mb-1">{specialty}</Text>
      
      <View className="flex-row items-center justify-center">
        <Text className="text-xs text-amber-500 mr-1">★</Text>
        <Text className="text-xs text-gray-700">{rating}</Text>
        <Text className="text-xs text-gray-400 ml-1">({reviewCount})</Text>
      </View>
    </TouchableOpacity>
  );
} 