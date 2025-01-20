import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { RootStackParamList } from '@/app/navigation/types'; // Adjust the import path as necessary
import { RouteProp } from '@react-navigation/native';
import exerciseData from '@/data/exercise_data.json'; // Ensure the path is correct

// Define the type for route parameters
type ExerciseListScreenRouteProp = RouteProp<
  RootStackParamList,
  'ExerciseListScreen'
>;

interface ExerciseListScreenProps {
  route: ExerciseListScreenRouteProp; // Add route to the props
}

interface ExerciseItem {
  id: number;
  type: string;
  name: string;
  variations?: {
    left?: {
      id: number;
      name: string;
    };
    right?: {
      id: number;
      name: string;
    };
  } | null;
}

const ExerciseListScreen: React.FC<ExerciseListScreenProps> = ({ route }) => {
  const category = route.params.category; // Access category from route params

  const [exercises, setExercises] = useState<ExerciseItem[]>([]);

  useEffect(() => {
    const filteredExercises = exerciseData.activities.filter(
      (activity) => activity.type.toLowerCase() === category,
    );
    setExercises(filteredExercises);
  }, [category]);

  return (
    <View>
      <Text>
        {category.charAt(0).toUpperCase() + category.slice(1)} Exercises
      </Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            {item.variations && (
              <View>
                {item.variations.left && (
                  <Text>Left: {item.variations.left.name}</Text>
                )}
                {item.variations.right && (
                  <Text>Right: {item.variations.right.name}</Text>
                )}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default ExerciseListScreen;
