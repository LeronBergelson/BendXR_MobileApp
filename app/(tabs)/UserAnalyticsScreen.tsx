import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this package is installed
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused

const UserAnalyticsScreen: React.FC = () => {
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [totalStretchTime, setTotalStretchTime] = useState(0);
  const isFocused = useIsFocused(); // Hook to determine if the screen is focused

  useEffect(() => {
    if (isFocused) {
      const fetchStats = async () => {
        const workoutTime = await AsyncStorage.getItem('totalWorkoutTime');
        const stretchTime = await AsyncStorage.getItem('totalStretchTime');
        console.log(
          `Fetched workout time: ${workoutTime}, stretch time: ${stretchTime}`,
        );
        if (workoutTime) setTotalWorkoutTime(parseInt(workoutTime, 10));
        if (stretchTime) setTotalStretchTime(parseInt(stretchTime, 10));
      };

      fetchStats();
    }
  }, [isFocused]); // Depend on isFocused to re-run the effect

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Analytics Screen</Text>
      <Text>Total Workout Time: {totalWorkoutTime} seconds</Text>
      <Text>Total Stretch Time: {totalStretchTime} seconds</Text>
    </View>
  );
};

export default UserAnalyticsScreen;
