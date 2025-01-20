import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from '@/app/(tabs)/HomeStackNavigator';

const Tab = createBottomTabNavigator();

const MainLayout: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: 'transparent',
        },
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainLayout;


