import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CustomCarouselItem from '../CustomCarouselItem';

describe('CustomCarouselItem', () => {
  const mockItem = {
    image: require('@/assets/images/workout.jpg'),
    title: 'Exercise',
    description: 'A comprehensive workout routine.',
  };

  const mockOnPress = jest.fn();

  it('renders correctly', () => {
    const { getByText } = render(
      <CustomCarouselItem item={mockItem} onPress={mockOnPress} />,
    );

    expect(getByText('Exercise')).toBeTruthy();
    expect(getByText('A comprehensive workout routine.')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const { getByText } = render(
      <CustomCarouselItem item={mockItem} onPress={mockOnPress} />,
    );

    fireEvent.press(getByText('Exercise'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
