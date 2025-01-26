import React, { useRef } from 'react';
import { View, FlatList, Animated, ImageSourcePropType } from 'react-native';
import CustomCarouselItem from './CustomCarouselItem';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/app/navigation/types';

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
      </View>
    );
  }
  console.log('Please provide Images');
  return null;
};

export default CustomCarousel;
