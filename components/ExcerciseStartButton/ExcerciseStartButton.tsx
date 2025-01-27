import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have this library installed
import config from '@/app/config/env'; // Import the configuration for IP and port

interface ExcerciseStartButtonProps {
  onToggle: () => void; // Callback to toggle exercise state in the parent component
  isActive: boolean; // Current state of the exercise
  workoutName: string; // Add workoutName prop
}

const ExcerciseStartButton: React.FC<ExcerciseStartButtonProps> = ({
  onToggle,
  isActive,
  workoutName,
}) => {
  const handlePress = async () => {
    if (!isActive) {
      // Only send the request when the workout is about to start
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
        console.log(workoutName);
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
      }
    }
    onToggle(); // Toggle the exercise state
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
