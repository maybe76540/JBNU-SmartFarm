import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import useLocation from '../Map/useLocation';
//import * as Location from 'expo-location';  
//import { OPEN_WEATHER_MAP_API_KEY } from '@env';

async function fetchWeatherData(latitude, longitude) {
  const response = await fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=bccf19671760c394fba019cf60b80f52`
  );

  if (!response.ok) {
    throw new Error('날씨 정보를 가져오는데 실패했습니다.');
  }

  console.log(latitude, longitude);

  const data = await response.json();
  return data;
}

export default function Home() {
  const { city, region, district, mapRegion } = useLocation();
  const [weatherData, setWeatherData] = useState(null);

  

  useEffect(() => {
    if (!mapRegion) return; // 위치 정보가 아직 없으면 아무 것도 하지 않음

    fetchWeatherData(mapRegion.latitude, mapRegion.longitude)
      .then(data => setWeatherData(data))
      .catch(error => console.error(error));
  }, [mapRegion]);


  return (
    <View>
      <View>
        <View style={styles.container}>
          <View style={styles.weatherBox}>
            <Text>현재 날씨: {weatherData?.list[0]?.weather[0]?.main}</Text>
          </View>
          <View style={styles.weatherBox}>
            <Text>내일 날씨: {weatherData?.list[8]?.weather[0]?.main}</Text>
          </View>
          <View style={styles.weatherBox}>
            <Text>모레 날씨: {weatherData?.list[16]?.weather[0]?.main}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text>Home 화면</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  weatherBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
    marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD700',
  },
});

  //const [city, setCity] = useState("로딩 중...");
  //const [days, setDays] = useState([]);
  // const [weatherData, setWeatherData] = useState([]);
  // const [ok, setOk] = useState(true);

  // const ask = async() => {
  //   const ask = async() => {
  //     const {granted} = await Location.requestForegroundPermissionsAsync();
  //     if(!granted){
  //       setOk(false);
  //     }
      // const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
      // console.log(mapRegion.latitude, mapRegion.longitude);
      // const location = await Location.reverseGeocodeAsync(
      //   {latitude, longitude}, {useGoogleMaps: false});
    
      // setCity(location[0].city);
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=bccf19671760c394fba019cf60b80f52`)
      // const json = await response.json();
      // setDays(json.daily)
      //}
    //}
    
  // useEffect(() => {
  //   //getWeather();
  //   //ask();
  // }, [])
    //fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${mapRegion.latitude}&lon=${mapRegion.longitude}&appid=bccf19671760c394fba019cf60b80f52`)
    //fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=daily&appid=bccf19671760c394fba019cf60b80f52`)
  // .then(response => response.json())
  // .then(data => {
  //   if (data && data.list) {
  //     setWeatherData(data.list);
  //     console.log(mapRegion.latitude);
  //     console.log(mapRegion.longitude);
  //   } else {
  //     console.error("날씨 데이터를 찾을 수 없습니다");
  //   }
  // })
  // .catch(error => {
  //   console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
  // });

  // }

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       console.log('위치 정보에 대한 접근이 거부되었습니다.');
  //       return;
  //     }

  //     const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5});
  //     fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_MAP_API_KEY}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       setWeatherData(data.list);
  //     });
  //   })();
  // }, []);