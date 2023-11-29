import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button } from 'react-native';
import useLocation from '../Map/useLocation';
import { Fontisto } from '@expo/vector-icons';

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

const date = new Date();
const firstday = `${date.getMonth() + 1}월 ${date.getDate()}일`;
date.setDate(date.getDate() + 1);
const secondday = `${date.getMonth() + 1}월 ${date.getDate()}일`;
date.setDate(date.getDate() + 1);
const thirdday = `${date.getMonth() + 1}월 ${date.getDate()}일`;
date.setDate(date.getDate() + 1);
const fourthday = `${date.getMonth() + 1}월 ${date.getDate()}일`;
date.setDate(date.getDate() + 1);
const fifthday = `${date.getMonth() + 1}월 ${date.getDate()}일`;

async function fetchWeatherData(latitude, longitude) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=bccf19671760c394fba019cf60b80f52`
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

  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!mapRegion) return; // 위치 정보가 아직 없으면 아무 것도 하지 않음

    fetchWeatherData(mapRegion.latitude, mapRegion.longitude)
      .then(data => setWeatherData(data))
      .catch(error => console.error(error));
  }, [mapRegion]);

  const handleAdd = () => {
    // const date = new Date();
    // const date_form = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 
    //   ${date.getHours()}시 ${date.getMinutes()}분`;
    //const newEntry = { text: input, date: date_form, id: date.getTime() };
    const newEntry = { text: input };
    setEntries([newEntry, ...entries]);
    setInput('');
  };


  return (
    <View>
      {/* 광고 배너 추가 예정 */}

      {/* 아래 View는 일기예보 View */}
      <View style={styles.weather_container}>
        <View>
          <Text style={{fontSize: 30, fontWeight: 'bold', marginHorizontal: 10, marginTop: 10}}>
            일기예보</Text>
        </View>
        <ScrollView horizontal = {true} showsHorizontalScrollIndicator = {false}>
          <View style={styles.weatherBox}>
            {/* <Text>오늘 날씨</Text> */}
            <Text>{firstday} 날씨</Text>
            <Text>{weather_kor[weatherData?.list[0]?.weather[0]?.main]}</Text>
            <Text>{weatherData && parseFloat(weatherData.list[0].main.temp - 273.15).toFixed(1)} °C</Text>
            <Fontisto name={icons[weatherData?.list[0]?.weather[0]?.main]} size={20} color="black" />
          </View>
          <View style={styles.weatherBox}>
            <Text>{secondday} 날씨</Text>
            <Text>{weather_kor[weatherData?.list[8]?.weather[0]?.main]}</Text>
            <Text>{weatherData && parseFloat(weatherData.list[8].main.temp - 273.15).toFixed(1)} °C</Text>
            <Fontisto name={icons[weatherData?.list[8]?.weather[0]?.main]} size={20} color="black" />
          </View>
          <View style={styles.weatherBox}>
            <Text>{thirdday} 날씨</Text>
            <Text>{weather_kor[weatherData?.list[16]?.weather[0]?.main]}</Text>
            <Text>{weatherData && parseFloat(weatherData.list[16].main.temp - 273.15).toFixed(1)} °C</Text>
            <Fontisto name={icons[weatherData?.list[16]?.weather[0]?.main]} size={20} color="black" />    
          </View>
          <View style={styles.weatherBox}>
            <Text>{fourthday} 날씨</Text>
            <Text>{weather_kor[weatherData?.list[24]?.weather[0]?.main]}</Text>
            <Text>{weatherData && parseFloat(weatherData.list[24].main.temp - 273.15).toFixed(1)} °C</Text>
            <Fontisto name={icons[weatherData?.list[24]?.weather[0]?.main]} size={20} color="black" />    
          </View>
          <View style={styles.weatherBox}>
            <Text>{fifthday} 날씨</Text>
            <Text>{weather_kor[weatherData?.list[32]?.weather[0]?.main]}</Text>
            <Text>{weatherData && parseFloat(weatherData.list[32].main.temp - 273.15).toFixed(1)} °C</Text>
            <Fontisto name={icons[weatherData?.list[32]?.weather[0]?.main]} size={20} color="black" />    
          </View>
        </ScrollView>
      </View>

      {/* todo list 추가 예정 */}
      <View style={styles.todoListView}>
        <Text style={{fontSize: 30, fontWeight: 'bold', marginHorizontal: 10, marginTop: 10}}>
          작업 스케줄 및 할 일 목록</Text>
        <View style={styles.inputView}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder='해야 할 일을 관리 할 수 있어요'
            style={styles.textInput}
          />
          <Button title="등록" onPress={handleAdd} />
        </View>
        <ScrollView>
          {entries.map((entry) => (
            <View style={styles.todoView} key={entry.id}>
              <Text style={styles.text}>{entry.text}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  weather_container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    //flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 20,
    borderColor: "black",
    backgroundColor: "#fdd"
  },
  weatherBox: {
    width: 100,
    height: 100,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD',
  },
  todoListView: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 20,
    borderColor: "black",
    backgroundColor: '#FCC',
  },
  inputView: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: "60%",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 35,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 2,
  },
  todoView: {
    //flexDirection: 'column',
    //justifyContent: 'space-between',
    //alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 10,
    // margin: 5,
  },
  text: {
    width: '100%',
    fontSize: 15,
    fontWeight: 'normal',
    color: 'black',
    padding: 20,
  },
});