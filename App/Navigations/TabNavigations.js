import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import FarmStateScreen from '../Screens/FarmStateScreen';
import DiaryScreen from '../Screens/DiaryScreen';
import MapScreen from '../Screens/MapScreen';
import { FontAwesome } from '@expo/vector-icons';

export default function TabNavigations() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen name="JBNU 스마트팜 IoT 서비스" component={HomeScreen} 
      options={{
        tabBarLabel: '메인화면', 
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="home" size={24} color="black" />
        ),
      }} />

      <Tab.Screen name="농장상태관리" component={FarmStateScreen} 
      options={{
        tabBarLabel: '내 농장', 
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="leaf" size={24} color="black" />
        ),
      }} />

      <Tab.Screen name="영농일지" component={DiaryScreen} 
      options={{
        tabBarLabel: '영농일지', 
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="book" size={24} color="black" />
        ),
      }} />

      <Tab.Screen name="지도" component={MapScreen} 
      options={{
        tabBarLabel: '지도', 
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="map" size={24} color="black" />
        ),
      }} />
    </Tab.Navigator>
  )
}