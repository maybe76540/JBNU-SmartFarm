import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const weather_kor = {
    Clouds: "흐림", 
    Clear: "맑음",
    Rain: "비",
    Snow: "눈",
    Drizzle: "이슬비",
    Thunderstorm: "천둥번개",
    Atmosphere: "안개",
  }
  const icons = {
    Clouds: "cloudy", 
    Clear: "day-sunny",
    Rain: "rains",
    Snow: "snow",
    Drizzle: "rain",
    Thunderstorm: "lightning",
    Atmosphere: "cloudy-gusts",
  }

const Weather = ({ weatherData }) => {
  // 날짜 계산
  // const date = new Date();
  // const firstday = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  // date.setDate(date.getDate() + 1);
  // const secondday = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  // date.setDate(date.getDate() + 1);
  // const thirdday = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  // date.setDate(date.getDate() + 1);
  // const fourthday = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  // date.setDate(date.getDate() + 1);
  // const fifthday = `${date.getMonth() + 1}월 ${date.getDate()}일`;
  const date = new Date();
  const days = Array.from({ length: 5 }, (_, i) => {
    date.setDate(date.getDate() + (i === 0 ? 0 : 1));
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  });

  return (
    <View style={styles.weather_container}>
      <View>
        <Text style={{ fontSize: 30, fontWeight: '600', marginHorizontal: 10, marginTop: 10 }}>
          일기예보</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {days.map((day, index) => (
          <WeatherBox key={index} day={day} weatherData={weatherData?.list[index * 8]} />
        ))}
      </ScrollView>
    </View>
  );
};

const WeatherBox = ({ day, weatherData }) => {
  return (
    <View style={styles.weatherBox}>
      <Text>{day} 날씨</Text>
      <Text>{weather_kor[weatherData?.weather[0]?.main]}</Text>
      <Text>{weatherData && parseFloat(weatherData.main.temp - 273.15).toFixed(1)} °C</Text>
      <Fontisto name={icons[weatherData?.weather[0]?.main]} size={20} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
    weather_container: {
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      //flexDirection: 'row',
      marginVertical: 10,
      borderRadius: 20,
      borderColor: "black",
      backgroundColor: "#E6E6E6"
    },
    weatherBox: {
      width: 100,
      height: 100,
      borderRadius: 10,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFD',
    }
  });

  export default Weather;