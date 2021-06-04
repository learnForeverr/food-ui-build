import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import Animated, {runOnJS, useAnimatedRef} from 'react-native-reanimated';
import {Colors} from '../../constants/colors';
import {foodData} from '../../constants/config';
import PlayButton from '../svgIcons/PlayButton';

const PreprationPart = ({expandVal}) => {
  const animatedRefButton = useAnimatedRef();

  const findLocation = () => {
    new Promise((resolve, reject) => {
      if (animatedRefButton && animatedRefButton.current) {
        animatedRefButton.current.measure(
          (x, y, width, height, pageX, pageY) => {
            resolve({pageY});
            expandVal.value = pageY;
          },
        );
      } else {
        reject(new Error('measure: animated ref not ready'));
      }
    });
  };

  return (
    <>
      <View style={styles.preprationContainer}>
        <View style={styles.preprationContainerInner}>
          <View style={{height: 60, justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 18}}>
              Prepration
            </Text>
          </View>
          <View style={styles.prepTimeContainer}>
            <View>
              <Text style={styles.commonTimeTextStyle}>Total Time</Text>
              <Text>1 hr 50 min</Text>
            </View>
            <View>
              <Text style={styles.commonTimeTextStyle}>Prep Time</Text>
              <Text>1 hr</Text>
            </View>
            <View>
              <Text style={styles.commonTimeTextStyle}>Cook Time</Text>
              <Text>50 min</Text>
            </View>
          </View>

          <TouchableNativeFeedback onPress={findLocation}>
            <Animated.View
              style={styles.animationButtom}
              ref={animatedRefButton}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Montserrat-Bold',
                  color: Colors.white,
                  marginRight: 5,
                }}>
                Step-by-step mode
              </Text>
              <PlayButton width={8} height={8} fill={Colors.white} />
            </Animated.View>
          </TouchableNativeFeedback>
          {foodData.stepByStep.map((item, i) => {
            return (
              <View key={item.id} style={styles.stepCardContainer}>
                <View style={{width: '5%', height: '100%'}}>
                  <Text>{i + 1}</Text>
                </View>
                <View style={{width: '95%', height: '100%'}}>
                  <Text>{item.step}</Text>
                </View>
              </View>
            );
          })}
          <View style={[styles.stepCardContainer, {marginBottom: 10}]}>
            <View style={{width: '5%', height: '100%'}}>
              <Text>{foodData.stepByStep.length + 1}</Text>
            </View>
            <View style={{width: '95%', height: '100%'}}>
              <Text>Enjoy</Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default PreprationPart;

const styles = StyleSheet.create({
  preprationContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(211,211,211, 0.4)',
    marginTop: 10,
  },
  preprationContainerInner: {
    width: '90%',
  },
  prepTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  commonTimeTextStyle: {
    marginBottom: 3,
    fontWeight: 'bold',
  },
  animationButtom: {
    width: '100%',
    height: 45,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  stepCardContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 20,
    marginTop: 10,
    borderRadius: 4,
  },
});
