import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have this library installed

interface ExcerciseStartButtonProps {
  onToggle: () => void; // Callback to toggle exercise state in the parent component
  isActive: boolean; // Current state of the exercise
  secondsLeft: number; // New prop for countdown timer
}

const ExcerciseStartButton: React.FC<ExcerciseStartButtonProps> = ({
  onToggle,
  isActive,
  secondsLeft,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
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
          <Text style={styles.timerText}>{secondsLeft}</Text>
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
