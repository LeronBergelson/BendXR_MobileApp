import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import LineChart from '../../components/LineChart/LineChart';

// Interface for workout data structure
interface WorkoutData {
  time: number; // Time in seconds
  date: string; // ISO date string
}

const UserAnalyticsScreen: React.FC = () => {
  // State hooks for storing workout and stretch times
  const [totalWorkoutTime, setTotalWorkoutTime] = useState<number>(0);
  const [totalStretchTime, setTotalStretchTime] = useState<number>(0);
  // State hooks for data points in the charts
  const [workoutDataPoints, setWorkoutDataPoints] = useState<number[]>(
    Array(7).fill(0),
  );
  const [stretchDataPoints, setStretchDataPoints] = useState<number[]>(
    Array(7).fill(0),
  );
  // Labels for the days of the week
  const [labels] = useState<string[]>([
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ]);
  const isFocused = useIsFocused();

  // Effect hook to fetch stats when screen is focused
  useEffect(() => {
    if (isFocused) {
      fetchStats();
    }
  }, [isFocused]);

  // Function to fetch stored data from AsyncStorage
  const fetchStats = async () => {
    const workoutData = await AsyncStorage.getItem('totalWorkoutTime');
    const stretchData = await AsyncStorage.getItem('totalStretchTime');

    processTimeData(workoutData, 'workout');
    processTimeData(stretchData, 'stretch');
  };

  // Function to process and set time data for workout and stretch
  const processTimeData = (
    data: string | null,
    type: 'workout' | 'stretch',
  ) => {
    if (!data) {
      const zeroData = Array(7).fill(0);
      if (type === 'workout') {
        setWorkoutDataPoints(zeroData);
        setTotalWorkoutTime(0);
      } else {
        setStretchDataPoints(zeroData);
        setTotalStretchTime(0);
      }
      return;
    }

    const parsedData: WorkoutData[] = JSON.parse(data);
    const dayTotals = Array(7).fill(0);

    parsedData.forEach((entry) => {
      const utcDate = new Date(entry.date);
      const localDate = new Date(
        utcDate.getTime() - utcDate.getTimezoneOffset() * 60000,
      );
      const dayIndex = localDate.getDay();
      dayTotals[dayIndex] += entry.time; // Keep time in seconds
    });

    if (type === 'workout') {
      setWorkoutDataPoints(dayTotals);
      setTotalWorkoutTime(dayTotals.reduce((acc, curr) => acc + curr, 0));
    } else {
      setStretchDataPoints(dayTotals);
      setTotalStretchTime(dayTotals.reduce((acc, curr) => acc + curr, 0));
    }
  };

  // Function to clear all stored data
  const clearStorage = async () => {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data cleared!');
    setTotalWorkoutTime(0);
    setTotalStretchTime(0);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>User Analytics</Text>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Workout Data Weekly</Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: workoutDataPoints.map((val) => val / 60) }],
          }}
          color="rgba(255, 99, 132, 1)"
          bezier
          formatYLabel={(value) => {
            const totalSeconds = parseFloat(value) * 60;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.round(totalSeconds % 60);
            return `${minutes}m ${seconds}s`;
          }}
        />
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Stretch Data Weekly</Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [{ data: stretchDataPoints.map((val) => val / 60) }],
          }}
          color="rgba(54, 162, 235, 1)"
          bezier
          formatYLabel={(value) => {
            const totalSeconds = parseFloat(value) * 60;
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = Math.round(totalSeconds % 60);
            return `${minutes}m ${seconds}s`;
          }}
        />
      </View>
      {/* <Button title="Clear Data" onPress={clearStorage} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 30,
    marginTop: 40,
    textAlign: 'center',
  },
  chartContainer: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    elevation: 5,
    backgroundColor: '#1E1E1E',
  },
  title: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default UserAnalyticsScreen;
