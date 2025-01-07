import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface CarouselItemProps {
  item: {
    image: ImageSourcePropType;
    title: string;
    description: string;
  };
  onPress: () => void;
}

const CustomCarouselItem: React.FC<CarouselItemProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardView}>
      <Image style={styles.image} source={item.image} />
      <View style={styles.textView}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardView: {
    flex: 1,
    width: width - 20,
    height: height / 4.5,
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
  },
});

export default CustomCarouselItem;
