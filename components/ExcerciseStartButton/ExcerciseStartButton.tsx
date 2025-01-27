import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have this library installed
import config from '@/app/config/env'; // Import the configuration for IP and port
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this package is installed
import { debounce } from 'lodash';

interface ExcerciseStartButtonProps {
  onToggle: () => void; // Callback to toggle exercise state in the parent component
  isActive: boolean; // Current state of the exercise
  workoutName: string;
  exerciseType: 'workout' | 'stretch'; // New prop to distinguish exercise types
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

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      if (timer !== 0) {
        console.log(
          `Exercise ended. Type: ${exerciseType}, Time: ${timer} seconds`,
        );
        saveWorkoutTime(timer, exerciseType);
        setTimer(0);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timer, exerciseType]);

  const saveWorkoutTime = async (time: number, type: 'workout' | 'stretch') => {
    if (time > 0) {
      // Only save if the time is greater than 0
      const key = type === 'workout' ? 'totalWorkoutTime' : 'totalStretchTime';
      const storedData = await AsyncStorage.getItem(key);
      const currentTime = new Date().toISOString();
      const newData: WorkoutData = { time, date: currentTime };

      let updatedData: WorkoutData[] = [];
      if (storedData) {
        const parsedData: WorkoutData[] = JSON.parse(storedData);
        updatedData = [...parsedData, newData];
      } else {
        updatedData = [newData];
      }

      await AsyncStorage.setItem(key, JSON.stringify(updatedData));
      console.log(`Saved ${type} data: ${JSON.stringify(newData)}`);
    } else {
      console.log(`Skipped saving ${type} data due to zero duration.`);
    }
  };

  const handlePress = debounce(async () => {
    console.log(
      `Exercise ${isActive ? 'stopping' : 'starting'}. Current timer: ${timer}`,
    );
    onToggle(); // Toggle the exercise state immediately

    if (!isActive) {
      // Attempt to send the HTTP request when the workout is about to start
      const url = `http://${config.ipAddress}:${config.port}/remote/object/call`;
      const body = {
        objectPath:
          '/Game/VRTemplate/Maps/UEDPIE_0_VRTemplateMap.VRTemplateMap:PersistentLevel.BP_RemoteControl_MaleInstructor_C_4',
        functionName: 'Handle Animation Request',
        generateTransaction: true,
        parameters: {
          workout: workoutName,
        },
      };

      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
        console.log('Proceeding with the timer despite the request failure.');
      }

      // Start the timer regardless of the request outcome
      saveWorkoutTime(timer, exerciseType);
    } else {
      // This block runs when stopping the exercise
      if (timer === 0) {
        console.log('Exercise stopped with zero timer.');
      }
    }
  }, 300); // Adjust debounce time as needed

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
      {/* Timer display only when active */}
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
