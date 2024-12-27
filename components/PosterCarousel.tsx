import React from 'react';
import { Dimensions, View, ImageBackground, StyleSheet } from 'react-native';
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import moment from 'moment';
import { urlFor } from '@/utils/sanity/image';
import { ThemedText } from './ThemedText';
import { EventType } from '@/types';

const screenWidth = Dimensions.get('screen').width;

const MyCarousel = ({ data }) => {
  
  const groupByTwo = (arr) => {
    return arr.reduce((result, value, index) => {
      if (index % 2 === 0) {
        result.push([value, arr[index + 1]]);
      }
      return result;
    }, []).filter(group => group[1] !== undefined); // Filter out groups where the second element is undefined
  };

  const formatted = data ? groupByTwo(data) : [];

  const ref = React.useRef<ICarouselInstance>(null);
  
  return (
    <Carousel
      ref={ref}
      data={formatted}
      width={screenWidth} // Carousel width is the full screen width
      autoPlay
      loop
      autoPlayInterval={3000}
      height={340} // Adjusted height to fit both elements
      renderItem={({ item }) => 
        <View style={{display: 'flex', flexDirection: 'row'}}>
          {item.map((innerItem : EventType) => (
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <ImageBackground
                  style={styles.imageBackground}
                  imageStyle={styles.imageStyle}
                  source={{ uri: urlFor(innerItem.posterImage.asset).url() }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.textContainer}>
                <ThemedText style={styles.titleText}>{innerItem.title}</ThemedText>
                <ThemedText style={styles.dateText}>
                  {moment(new Date(innerItem.date).toUTCString()).format("dddd DD MMMM")}
                </ThemedText>
              </View>
            </View>
          ))}
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: screenWidth / 2, // Half the screen width for two items per page
    paddingHorizontal: 10, // Optional padding between items
    display: 'flex',
    flexDirection: 'column', // Stack image and text vertically
    gap: 5,
  },
  imageContainer: {
    width: '100%', // Ensure image takes full width of container
    height: 260, // Set image height
  },
  imageBackground: {
    height: '100%', // Fill the height of the container
    borderRadius: 10,
  },
  imageStyle: {
    borderRadius: 10,
  },
  textContainer: {
    display: 'flex',
    gap: 4,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
    opacity: 0.5,
  },
});

export default MyCarousel;
