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
              <Image source={getImagePath(item.image)} style={styles.image} />
              <Text style={styles.description}>{item.description}</Text>
            </View>
            <ExcerciseStartButton
              onToggle={handleExerciseToggle}
              isActive={isExerciseActive}
            />
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
  },
  iconStyle: {
    marginLeft: 10,
  },
  expandedSection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    flex: 1,
    color: '#FFF',
  },
});

export default ExerciseListItem;
