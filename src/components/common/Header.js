import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Colors} from '../../constants/colors';
import {animationHeaderHeight, foodData} from '../../constants/config';
import BackIcon from '../svgIcons/BackIcon';
import HeartIcon from '../svgIcons/HeartIcon';
import ShareIcon from '../svgIcons/ShareIcon';

const Header = ({scrollY}) => {
  const headerTitleStyle = useAnimatedStyle(() => {
    return {
      zIndex: -1,
      opacity: interpolate(scrollY.value, [0, animationHeaderHeight], [0, 1]),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, animationHeaderHeight],
            [30, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContainerInner}>
        <View>
          <BackIcon width={22} height={22} fill={Colors.primary} />
        </View>
        <Animated.View style={headerTitleStyle}>
          <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 16}}>
            {/* responsiveness matters, not in this tutorial */}
            {foodData.title.length > 20
              ? foodData.title.slice(0, 20) + '...'
              : foodData.title}
          </Text>
        </Animated.View>
        <View style={{flexDirection: 'row'}}>
          <ShareIcon width={22} height={22} fill={Colors.primary} />
          <View style={{marginLeft: 25}}>
            <HeartIcon width={22} height={22} fill={Colors.primary} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10
  },
  headerContainerInner: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
