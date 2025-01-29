import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ExcerciseStartButton from '../ExcerciseStartButton/ExcerciseStartButton';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import imageMap from '@/data/imageMappings';

interface ExerciseListItemProps {
  item: {
    id: number;
    name: string;
    description: string;
    image: string;
    type: string;
  };
  expandedId: number | null;
  toggleExpand: (id: number) => void;
}

// Utility function to get image require path dynamically
function getImagePath(imageKey: string) {
  if (imageMap[imageKey]) {
    return imageMap[imageKey];
  } else {
    console.warn('Image not found in map:', imageKey);
    return require('../../assets/images/favicon.png'); // Fallback image if not found
  }
}

const ExerciseListItem: React.FC<ExerciseListItemProps> = ({
  item,
  expandedId,
  toggleExpand,
}) => {
  const [isExerciseActive, setIsExerciseActive] = useState(false);

  const handleExerciseToggle = () => {
    setIsExerciseActive(!isExerciseActive);
  };

  const handleHeaderClick = () => {
    toggleExpand(item.id);
  };

  // Define the gradientColors with a tuple type to ensure type safety
  const gradientColors: [string, string] =
    expandedId === item.id ? ['#383838', '#1a1a1a'] : ['#383838', '#383838'];

  return (
    <LinearGradient colors={gradientColors} style={styles.itemButton}>
      <View style={styles.touchableArea}>
        <TouchableOpacity
          onPress={handleHeaderClick}
          style={styles.headerContainer}
        >
          <Text style={styles.itemText}>{item.name}</Text>
          <Icon
            name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="#FFF"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        {expandedId === item.id && (
          <View style={styles.expandedSection}>
            <View style={styles.infoContainer}>
              <Text style={styles.description}>{item.description}</Text>
              <Image source={getImagePath(item.image)} style={styles.image} />
            </View>
            <View style={styles.buttonContainer}>
              <ExcerciseStartButton
                onToggle={handleExerciseToggle}
                isActive={isExerciseActive}
                workoutName={item.name}
                exerciseType={
                  item.type.toLowerCase() === 'workout' ? 'workout' : 'stretch'
                }
              />
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  itemButton: {
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  touchableArea: {
    flexDirection: 'column',
    padding: 10,
    alignItems: 'stretch',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  itemText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold', // Make text bold
  },
  iconStyle: {
    marginLeft: 10,
  },
  expandedSection: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    backgroundColor: 'lightblack', // Light grey background
    borderWidth: 1,
    borderColor: '#FFF', // White border
    padding: 0,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  description: {
    fontSize: 16,
    flex: 1,
    color: '#FFF',
    fontStyle: 'italic',
    paddingRight: 10, // Add padding to separate text from the image
    paddingLeft: 10,
  },
  buttonContainer: {
    marginTop: 20, // Space between the info container and the button
    marginBottom: 10,
    width: '100%', // Ensure the container takes full width
    alignItems: 'center', // Center the button horizontally
  },
});

export default ExerciseListItem;
