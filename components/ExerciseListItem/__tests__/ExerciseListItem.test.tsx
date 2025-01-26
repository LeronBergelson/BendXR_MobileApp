import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ExerciseListItem from '../ExerciseListItem';

// Mock the image require to avoid issues during testing
jest.mock('react-native/Libraries/Image/Image', () => ({
  ...jest.requireActual('react-native/Libraries/Image/Image'),
  resolveAssetSource: jest.fn(() => ({ uri: 'path/to/image' })),
}));

describe('ExerciseListItem', () => {
  const itemMock = {
    id: 1,
    name: 'Test Exercise',
    description: 'Description of test exercise',
    image: 'workout',
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <ExerciseListItem
        item={itemMock}
        expandedId={null}
        toggleExpand={() => {}}
      />,
    );
    expect(getByText('Test Exercise')).toBeTruthy();
  });

  it('expands when pressed', () => {
    const toggleExpandMock = jest.fn();
    const { getByText } = render(
      <ExerciseListItem
        item={itemMock}
        expandedId={null}
        toggleExpand={toggleExpandMock}
      />,
    );

    fireEvent.press(getByText('Test Exercise'));
    expect(toggleExpandMock).toHaveBeenCalledWith(1);
  });

  it('shows expanded section when expandedId matches item id', () => {
    const { getByText } = render(
      <ExerciseListItem
        item={itemMock}
        expandedId={1}
        toggleExpand={() => {}}
      />,
    );

    expect(getByText('Description of test exercise')).toBeTruthy();
  });

  it('does not show expanded section when expandedId does not match item id', () => {
    const { queryByText } = render(
      <ExerciseListItem
        item={itemMock}
        expandedId={2}
        toggleExpand={() => {}}
      />,
    );

    expect(queryByText('Description of test exercise')).toBeNull();
  });
});
