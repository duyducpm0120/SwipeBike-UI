import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home} from '../screens';
import {
  FONTS,
  SIZES,
  COLORS,
  RESPONSIVE,
  ICONS,
  IMAGES,
  STYLES,
} from '../constants';

import {TabIcon} from '../components';
import {View} from 'react-native';
import {TripsScreen} from '../screens';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        elevation: 0,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          borderTopColor: 'transparent',
          backgroundColor: 'transparent',
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              normalIcon={ICONS.home}
              focusedIcon={ICONS.homeBold}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TripsScreen"
        component={TripsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              normalIcon={ICONS.send}
              focusedIcon={ICONS.sendBold}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              normalIcon={ICONS.profile}
              focusedIcon={ICONS.profileBold}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              normalIcon={ICONS.chat}
              focusedIcon={ICONS.chatBold}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
