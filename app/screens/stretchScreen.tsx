import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>

      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.listItem}>
          <Image
            source={require('@/assets/images/stretching.jpg')}
            style={styles.listImage}
          />
          <ThemedText style={styles.imageText}>Stretching</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem}>
          <Image
            source={require('@/assets/images/workout.jpg')}
            style={styles.listImage}
          />
          <ThemedText style={styles.imageText}>Workout</ThemedText>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  button: {
    alignItems: 'center',
  },
  buttonImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  buttonText: {
    textAlign: 'center',
  },
  listContainer: {
    flexDirection: 'column',
    marginVertical: 16,
  },
  listItem: {
    marginBottom: 16,
    position: 'relative',
  },
  listImage: {
    width: '100%',
    height: 200,
  },
  imageText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
