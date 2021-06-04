import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import BottomNav from './src/components/common/BottomNav';
import Header from './src/components/common/Header';
import FoodUpperCard from './src/components/Food/FoodUpperCard';
import PreprationPart from './src/components/Food/PreprationPart';
import {Colors} from './src/constants/colors';

const App = () => {
  const scrollY = useSharedValue(0);
  const expandVal = useSharedValue(0);
  const scaleVal = useSharedValue(0);
  const activeVal = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const {height} = useWindowDimensions();

  useAnimatedReaction(
    () => expandVal.value,
    (newVal, prev) => {
      if (newVal !== 0 && prev !== null) {
        scaleVal.value = newVal;
        activeVal.value = withDelay(300, withTiming(1));
      } else {
        expandVal.value = 0;
        activeVal.value = withTiming(0, {duration: 200});
      }
    },
  );

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      height: '90%',
      backgroundColor: Colors.white,
      transform: [
        {
          translateY: interpolate(
            activeVal.value,
            [0, 1],
            [(height * 90) / 100, 0],
          ),
        },
      ],
    };
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: scaleVal.value,
      backgroundColor: Colors.primary,
      left: 10,
      right: 10,
      zIndex: expandVal.value === 0 ? -10 : 1,
      height: withTiming(
        interpolate(expandVal.value, [0, 60], [10, 60], Extrapolate.CLAMP),
        {duration: 600},
      ),
      transform: [
        {
          scaleY: withTiming(
            interpolate(expandVal.value, [0, 60], [0, 40], Extrapolate.CLAMP),
            {duration: 600},
          ),
        },
        {
          scaleX: withTiming(
            interpolate(
              expandVal.value,
              [0, 60],
              [0.95, 1.2],
              Extrapolate.CLAMP,
            ),
            {duration: 600},
          ),
        },
      ],
    };
  });

  return (
    <View style={{flex: 1}}>
      <Header scrollY={scrollY} />
      <Animated.ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}>
        <FoodUpperCard scrollY={scrollY} />
        <PreprationPart expandVal={expandVal} />
        <PreprationPart expandVal={expandVal} />
        <View style={{height: 70}} />
      </Animated.ScrollView>
      <BottomNav />
      <Animated.View style={animatedStyle} />
      <TouchableNativeFeedback
        onPress={() => {
          expandVal.value = 0;
        }}>
        <Animated.View style={animatedStyle2} />
      </TouchableNativeFeedback>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
