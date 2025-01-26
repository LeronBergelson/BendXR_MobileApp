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

const Activity_Vertical_CarouselItem: React.FC<CarouselItemProps> = ({
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardView}>
      <View>
        <Image style={styles.image} source={item.image} />
        <View style={styles.textView}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
        </View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  textView: {
    position: 'absolute',
    bottom: 10,
    margin: 10,
    left: 5,
  },
  image: {
    width: width - 20,
    height: height / 4.5,
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    marginBottom: 5,
    fontWeight: 'bold',
    elevation: 5,
  },
  itemDescription: {
    color: 'white',
    fontSize: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0.8, height: 0.8 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
    paddingLeft: 5,
  },
});

export default Activity_Vertical_CarouselItem;
