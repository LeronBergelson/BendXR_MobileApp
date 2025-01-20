import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  ImageSourcePropType,
} from 'react-native';
import CustomCarouselItem from './CustomCarouselItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/types';

const { height } = Dimensions.get('window');

interface CarouselItem {
  image: ImageSourcePropType;
  title: string;
  description: string;
  id: number;
}

interface CarouselProps {
  data: Array<CarouselItem>;
}

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExerciseListScreen'
>;

const CustomCarousel: React.FC<CarouselProps> = ({ data }) => {
  const navigation = useNavigation<NavigationProp>();
  const mySlide = useRef<FlatList<CarouselItem>>(null);
  const scrollY = new Animated.Value(0);
  const position = Animated.divide(scrollY, height);

  const handleItemPress = (item: CarouselItem) => {
    navigation.navigate('ExerciseListScreen', {
      category: item.title.toLowerCase(),
    });
  };

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          ref={mySlide}
          keyExtractor={(item) => 'key' + item.id}
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CustomCarouselItem
              item={item}
              onPress={() => handleItemPress(item)}
            />
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
        />
        <View style={styles.dotView}>
          {data.map((_, i) => {
            const opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={i}
                style={{
                  opacity,
                  height: 6,
                  width: 6,
                  backgroundColor: 'white',
                  margin: 5,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }
  console.log('Please provide Images');
  return null;
};

const styles = StyleSheet.create({
  dotView: { flexDirection: 'row', justifyContent: 'center' },
});

export default CustomCarousel;
