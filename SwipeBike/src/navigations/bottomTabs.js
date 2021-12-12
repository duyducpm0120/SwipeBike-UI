import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Home} from '../screens';
import {
  ICONS,
} from '../constants';

import {TabIcon} from '../components';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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

      {/* <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused={focused}
              normalIcon={ICONS.profile}
              focusedIcon={ICONS.profileBold}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Message"
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
