import React, {useState} from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Colors} from '../../constants/colors';
import HeartIcon from '../svgIcons/HeartIcon';
import SearchIcon from '../svgIcons/SearchIcon';

const BottomNav = () => {
  const [tab, setActiveTab] = useState(0);

  return (
    <View style={styles.BottomNavContainer}>
      <View style={styles.BottomNavContainerInner}>
        <TouchableNativeFeedback onPress={() => setActiveTab(0)}>
          <View style={styles.bottomTabItem}>
            <SearchIcon
              width={24}
              height={24}
              fill={tab === 0 ? Colors.primary : Colors.black}
            />
            <Text
              style={[
                styles.tabTitleText,
                {color: tab === 0 ? Colors.primary : Colors.black},
              ]}>
              Discover
            </Text>
          </View>
        </TouchableNativeFeedback>

        <TouchableNativeFeedback onPress={() => setActiveTab(1)}>
          <View style={styles.bottomTabItem}>
            <HeartIcon
              width={24}
              height={24}
              fill={tab === 1 ? Colors.primary : Colors.black}
            />
            <Text
              style={[
                styles.tabTitleText,
                {color: tab === 1 ? Colors.primary : Colors.black},
              ]}>
              MyRecipe
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

export default BottomNav;

const styles = StyleSheet.create({
  BottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    backgroundColor: Colors.white
  },
  BottomNavContainerInner: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  bottomTabItem: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  tabTitleText: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    marginTop: 5,
  },
});
