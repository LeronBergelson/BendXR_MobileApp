import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Carousel from '@/components/Carousel/CustomCarousel';
import carouselData from '@/data/carouselItems.json';
import workoutImage from '@/assets/images/workout.jpg';
import stretchImage from '@/assets/images/stretching.jpg';

const imageMap = {
  Workout: workoutImage,
  stretch: stretchImage,
};

type ImageKey = keyof typeof imageMap;

const carouselItems = carouselData.map((item) => ({
  ...item,
  image: imageMap[item.image as ImageKey],
}));

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      ></ParallaxScrollView>
      <LinearGradient
        colors={['#383838', '#383838']}
        style={styles.carouselContainer}
      >
        <Carousel data={carouselItems} />
      </LinearGradient>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  carouselContainer: {
    flex: 1,
    marginTop: -380,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerImage: {
    color: '#808080',
    left: -35,
    position: 'absolute',
  },
});
