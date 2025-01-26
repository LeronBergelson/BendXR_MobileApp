import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Ensure you have this library installed

interface ExcerciseStartButtonProps {
  onToggle: () => void; // Callback to toggle exercise state in the parent component
  isActive: boolean; // Current state of the exercise
}

const ExcerciseStartButton: React.FC<ExcerciseStartButtonProps> = ({
  onToggle,
  isActive,
}) => {
  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.button, isActive ? styles.activeButton : styles.inactiveButton]}
    >
      <Icon
        name={isActive ? 'pause' : 'play'}
        size={24}
        color="#FFF"
      />
      <Text style={styles.buttonText}>{isActive ? 'Pause Exercise' : 'Start Exercise'}</Text>
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
    justifyContent: 'center'
  },
  activeButton: {
    backgroundColor: 'darkred',
  },
  inactiveButton: {
    backgroundColor: 'darkgreen',
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 16
  }
});

export default ExcerciseStartButton;
