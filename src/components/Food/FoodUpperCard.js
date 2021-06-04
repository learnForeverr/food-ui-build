import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {Colors} from '../../constants/colors';
import {animationHeaderHeight, foodData} from '../../constants/config';
import LikeIcon from '../svgIcons/LikeIcon';
import MinusIcon from '../svgIcons/MinusIcon';
import PlayButton from '../svgIcons/PlayButton';
import PlusIcon from '../svgIcons/PlusIcon';

const FoodUpperCard = ({scrollY}) => {
  const cardTitleStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, animationHeaderHeight], [1, 0]),
    };
  });

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[styles.cardCommonContainer, cardTitleStyle]}>
        <Text style={styles.mainHeading}>{foodData.title}</Text>
        <Text style={{fontSize: 12, marginTop: 5}}>
          featured in{' '}
          <Text
            style={{color: Colors.primary, fontFamily: 'Montserrat-ExtraBold'}}>
            Indoor BBQ
          </Text>
        </Text>
        <View
          style={{flexDirection: 'row', marginTop: 10, alignItems: 'center'}}>
          <LikeIcon width={16} height={16} fill={Colors.black} />
          <Text style={{fontSize: 12, marginLeft: 8}}>
            <Text
              style={{
                color: Colors.black,
                fontFamily: 'Montserrat-ExtraBold',
              }}>
              {foodData.likedPercentage}{' '}
            </Text>
            would make this again
          </Text>
        </View>
      </Animated.View>

      {/* image */}
      <View style={{width: '100%', marginTop: 25, marginBottom: 10}}>
        <Image
          source={{uri: foodData.imageUrl}}
          style={{width: '100%', height: 300}}
          resizeMode="cover"
        />
        <View style={styles.PlayButtonContainer}>
          <PlayButton width={18} height={18} fill={Colors.white} />
        </View>
      </View>
      <View
        style={[
          styles.cardCommonContainer,
          {
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 10,
            alignItems: 'center',
          },
        ]}>
        <View>
          <Text style={{fontSize: 18, fontFamily: 'Montserrat-Bold'}}>
            Ingredients for
          </Text>
          <Text style={{fontSize: 16, marginTop: 5}}>8 servings</Text>
        </View>
        <View style={styles.servingNumberBox}>
          <MinusIcon width={12} height={12} fill={Colors.primary} />
          <Text style={{fontSize: 12, fontFamily: 'Montserrat-Bold'}}>8</Text>
          <PlusIcon width={12} height={12} fill={Colors.primary} />
        </View>
      </View>
    </View>
  );
};

export default FoodUpperCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  cardCommonContainer: {
    width: '90%',
  },
  mainHeading: {
    fontSize: 24,
    fontFamily: 'Montserrat-ExtraBold',
  },
  servingNumberBox: {
    flexDirection: 'row',
    width: 100,
    height: 35,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.2,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 3,
  },
  PlayButtonContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 15,
    left: 15,
  },
});
