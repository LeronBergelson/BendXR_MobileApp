import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabNavigator from '@/app/_layout';
import ExerciseListScreen from '../screens/ExerciseListScreen';
import { RootStackParamList } from '@/app/navigation/types';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={MainTabNavigator} />
      <Stack.Screen name="ExerciseListScreen" component={ExerciseListScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
