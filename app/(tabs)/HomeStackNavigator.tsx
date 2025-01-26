import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '@/app/(tabs)/index';
import ExerciseListScreen from '@/app/screens/ExerciseListScreen';
import { RootStackParamList } from '@/app/navigation/types';

const HomeStack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen
        name="ExerciseListScreen"
        component={ExerciseListScreen}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
