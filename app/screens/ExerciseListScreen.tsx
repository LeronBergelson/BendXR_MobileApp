import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RootStackParamList } from '@/app/navigation/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import exerciseData from '@/data/exercise_data.json';
import ExerciseListItem from '@/components/ExerciseListItem/ExerciseListItem';

type ExerciseListScreenRouteProp = RouteProp<
  RootStackParamList,
  'ExerciseListScreen'
>;

interface ExerciseListScreenProps {
  route: ExerciseListScreenRouteProp;
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
  image: string;
  description: string;
}

const ExerciseListScreen: React.FC<ExerciseListScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const category = route.params.category; // Access category from route params

  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    // Filter exercises based on the category passed from the route params
    const filteredExercises = exerciseData.activities.filter(
      (activity) => activity.type.toLowerCase() === category,
    );
    // Update the state with the filtered exercises
    setExercises(filteredExercises);
  }, [category]); // Dependency array ensures this runs when 'category' changes

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <View style={styles.container}>
      {/* Back button to navigate back */}
      <HeaderBackButton
        onPress={() => navigation.goBack()}
        tintColor="#FFF"
        style={styles.backButton}
      />
      <Text style={styles.headerText}>
        {/* Display the category name with the first letter capitalized */}
        {category.charAt(0).toUpperCase() + category.slice(1)} Exercises
      </Text>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExerciseListItem
            item={item}
            expandedId={expandedId}
            toggleExpand={toggleExpand}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
  },
  backButton: {
    marginTop: 60,
  },
});

export default ExerciseListScreen;
