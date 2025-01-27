import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure this package is installed
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused

interface WorkoutData {
  time: number;
  date: string;
}

const UserAnalyticsScreen: React.FC = () => {
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [totalStretchTime, setTotalStretchTime] = useState(0);
  const isFocused = useIsFocused(); // Hook to determine if the screen is focused

  useEffect(() => {
    if (isFocused) {
      fetchStats();
    }
  }, [isFocused]);

  const fetchStats = async () => {
    const workoutData = await AsyncStorage.getItem('totalWorkoutTime');
    const stretchData = await AsyncStorage.getItem('totalStretchTime');

    // Log the entire dataset
    console.log('Workout Data:', workoutData);
    console.log('Stretch Data:', stretchData);

    const processTimeData = (data: string | null): number => {
      if (!data) return 0;
      const parsedData: WorkoutData[] = JSON.parse(data);
      console.log('Detailed Entries:');
      parsedData.forEach((entry) => {
        console.log(`Date: ${entry.date}, Time: ${entry.time} seconds`);
      });
      return parsedData.reduce((acc, curr) => acc + curr.time, 0);
    };

    const totalWorkoutTime = processTimeData(workoutData);
    const totalStretchTime = processTimeData(stretchData);

    console.log(
      `Fetched workout time: ${totalWorkoutTime}, stretch time: ${totalStretchTime}`,
    );
    setTotalWorkoutTime(totalWorkoutTime);
    setTotalStretchTime(totalStretchTime);
  };

  const clearStorage = async () => {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data cleared!');
    setTotalWorkoutTime(0);
    setTotalStretchTime(0);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>User Analytics Screen</Text>
      <Text>Total Workout Time: {totalWorkoutTime} seconds</Text>
      <Text>Total Stretch Time: {totalStretchTime} seconds</Text>
      <Button title="Clear Data" onPress={clearStorage} />
    </View>
  );
};

export default UserAnalyticsScreen;
