import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Carousel from '@/components/Carousel/CustomCarousel';
import carouselData from '@/data/carouselItems.json';
import exerciseImage from '@/assets/images/workout.jpg';
import stretchImage from '@/assets/images/stretching.jpg';

const imageMap = {
  exercise: exerciseImage,
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
      <ThemedText type="title" style={styles.title}>
        Welcome!
      </ThemedText>
      <View style={styles.carousel}>
        <Carousel data={carouselItems} />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  carousel: {
    flex: 1,
  },
});
