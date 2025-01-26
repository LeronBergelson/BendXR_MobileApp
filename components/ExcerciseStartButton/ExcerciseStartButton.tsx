import React, { useState } from 'react';
import { Button } from 'react-native';

interface ExcerciseStartButtonProps {
  onToggle: () => void; // Callback to toggle exercise state in the parent component
  isActive: boolean; // Current state of the exercise
}

const ExcerciseStartButton: React.FC<ExcerciseStartButtonProps> = ({
  onToggle,
  isActive,
}) => {
  return (
    <Button
      title={isActive ? 'Stop Exercise' : 'Start Exercise'}
      onPress={onToggle}
      color="#841584"
    />
  );
};

export default ExcerciseStartButton;
