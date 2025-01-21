import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RootStackParamList } from '@/app/navigation/types';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import exerciseData from '@/data/exercise_data.json';

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
}

const ExerciseListScreen: React.FC<ExerciseListScreenProps> = ({ route }) => {
  const navigation = useNavigation();
  const category = route.params.category; // Access category from route params

  const [exercises, setExercises] = useState<ExerciseItem[]>([]);

  useEffect(() => {
    // Filter exercises based on the category passed from the route params
    const filteredExercises = exerciseData.activities.filter(
      (activity) => activity.type.toLowerCase() === category,
    );
    // Update the state with the filtered exercises
    setExercises(filteredExercises);
  }, [category]); // Dependency array ensures this runs when 'category' changes

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
        data={exercises} // Data source for the list
        keyExtractor={(item) => item.id.toString()} // Unique key for each item
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemButton}
            onPress={() => console.log(item.name)}
          >
            <Text style={styles.itemText}>{item.name}</Text>
            {/* Display variations if available */}
            {item.variations && (
              <View>
                {item.variations.left && (
                  <Text style={styles.variationText}>
                    Left: {item.variations.left.name}
                  </Text>
                )}
                {item.variations.right && (
                  <Text style={styles.variationText}>
                    Right: {item.variations.right.name}
                  </Text>
                )}
              </View>
            )}
          </TouchableOpacity>
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
  itemButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  itemText: {
    color: '#FFF',
    fontSize: 18,
  },
  variationText: {
    color: '#AAA',
    fontSize: 16,
  },
});

export default ExerciseListScreen;
