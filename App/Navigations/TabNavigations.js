import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import MapScreen from '../Screens/MapScreen';
import { FontAwesome } from '@expo/vector-icons';

export default function TabNavigations() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarLabel: '메인화면', 
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="home" size={24} color="black" />
        ),
      }} />

      <Tab.Screen name="Map" component={MapScreen} 
      options={{
        tabBarLabel: '지도', 
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="users" size={24} color="black" />
        ),
      }} />
    </Tab.Navigator>
  )
}