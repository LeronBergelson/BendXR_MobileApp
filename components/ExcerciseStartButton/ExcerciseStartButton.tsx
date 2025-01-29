import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ipAddress = process.env.REACT_APP_IP_ADDRESS;
const port = process.env.REACT_APP_PORT;

interface ExcerciseStartButtonProps {
  onToggle: () => void; // Callback to toggle exercise state in the parent component
  isActive: boolean; // Current state of the exercise
  workoutName: string;
  exerciseType: 'workout' | 'stretch'; // Distinguish exercise types
}

interface WorkoutData {
  time: number;
  date: string;
}

const ExcerciseStartButton: React.FC<ExcerciseStartButtonProps> = ({
  onToggle,
  isActive,
  workoutName,
  exerciseType,
}) => {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      const id = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setIntervalId(id);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      if (timer > 0) {
        saveWorkoutTime(timer, exerciseType);
        setTimer(0); // Reset timer when exercise stops
      }
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive]);

  const handlePress = async () => {
    if (isActive) {
      // Stop the exercise
      const elapsedTime = timer; // Use the current timer value directly
      console.log(
        `Exercise ended. Type: ${exerciseType}, Time: ${elapsedTime} seconds`,
      );

      await saveWorkoutTime(elapsedTime, exerciseType);
      setTimer(0); // Reset timer when exercise stops
    } else {
      // Start the exercise
      console.log(`Exercise starting for type: ${exerciseType}`);
    }

    onToggle(); // Toggle the exercise state
  };

  const saveWorkoutTime = async (time: number, type: 'workout' | 'stretch') => {
    const key = type === 'workout' ? 'totalWorkoutTime' : 'totalStretchTime';
    const storedData = await AsyncStorage.getItem(key);
    const currentTime = new Date().toISOString(); // Save ISO date format
    const newData: WorkoutData = { time, date: currentTime };

    let updatedData: WorkoutData[] = storedData ? JSON.parse(storedData) : [];
    updatedData.push(newData);

    await AsyncStorage.setItem(key, JSON.stringify(updatedData));
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.button,
        isActive ? styles.activeButton : styles.inactiveButton,
      ]}
    >
      <Icon name={isActive ? 'pause' : 'play'} size={24} color="#FFF" />
      <Text style={styles.buttonText}>
        {isActive ? 'Pause Exercise' : 'Start Exercise'}
      </Text>
      {isActive && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{timer} sec</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: 'darkred',
  },
  inactiveButton: {
    backgroundColor: 'darkgreen',
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 12.6,
    paddingBottom: 12.6,
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16,
  },
  timerContainer: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  timerText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ExcerciseStartButton;
