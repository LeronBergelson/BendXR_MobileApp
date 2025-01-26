import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  ImageSourcePropType,
} from 'react-native';
import Activity_Vertical_CarouselItem from './Activity_Vertical_CarouselItem';

const { width } = Dimensions.get('window');

interface CarouselItem {
  image: ImageSourcePropType;
  title: string;
  description: string;
  id: number;
}

interface CarouselProps {
  data: Array<CarouselItem>;
}

const Activity_Vertical_Carousel: React.FC<CarouselProps> = ({ data }) => {
  const mySlide = useRef<FlatList<CarouselItem>>(null);
  const scrollX = new Animated.Value(0);
  const position = Animated.divide(scrollX, width);

  const handleItemPress = (item: CarouselItem) => {
    console.log('Item pressed:', item);
    // Add any additional logic for handling the press event here
  };

  if (data && data.length) {
    return (
      <View>
        <FlatList
          data={data}
          ref={mySlide}
          keyExtractor={(item) => 'key' + item.id}
          horizontal
          pagingEnabled
          scrollEnabled
          snapToAlignment="center"
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Activity_Vertical_CarouselItem
              item={item}
              onPress={() => handleItemPress(item)}
            />
          )}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
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

export default Activity_Vertical_Carousel;
