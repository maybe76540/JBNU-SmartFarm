import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text } from 'react-native';
import Swiper from 'react-native-swiper'
import useLocation from '../Map/useLocation';
import firebase from 'firebase/compat/app';
import '../../../firebaseConfig'; // import firebase configuration
import Weather from './Weather';
import AlertComponent from './Alert';
import TodoList from './TodoList.js';

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

export default function Home_Test() {
  const { mapRegion } = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

//   const [warn_temp_low, set_warn_temp_low] = useState(15);
//   const [warn_temp_high, set_warn_temp_high] = useState(20);

  // 센서 데이터값 확인해 위험 판단   
  useEffect(() => {
    firebase.database().ref('/nongiot1').on('value', (snapshot) => {
      let value = snapshot.val();
      setData(value);

      // value 존재 확인, value.temperature 확인, value.temperature 임계값 검사
      if (value && value.temperature && value.temperature >= 20) {
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
    });

    // Clean-up function
    return () => {
      firebase.database().ref('/').off('value');
    };
  }, []);

  useEffect(() => {
    if (!mapRegion) return;

    fetchWeatherData(mapRegion.latitude, mapRegion.longitude)
      .then(data => setWeatherData(data))
      .catch(error => console.error(error));
  }, [mapRegion]);

  // TodoList 
  const handleAdd = () => {
    const newEntry = { text: input };
    setEntries([newEntry, ...entries]);
    setInput('');
  };

  const handleDelete = (text) => {
    Alert.alert(
      "작업을 완료하셨습니까?",
      "확인을 누르면 작업 목록의 작업이 삭제됩니다.\n삭제한 뒤에는 되돌릴 수 없습니다.",
      [
        {
          text: "취소",
          style: "cancel"
        },
        {
          text: "확인",
          onPress: () => setEntries(entries.filter((entry) => entry.text !== text))
        }
      ]
    );
  };

  return (
    <View>
      <ScrollView style={{ width: "100%", height: "100%" }}>

        {/* 광고 배너 View */}
        <View style={styles.swiper}>
          <Swiper showsButtons={false} autoplay showsPagination={false} autoplayTimeout={3}>
            <View style={styles.slide1}>
              <Text style={styles.swipertext}>광고 배너 1번, Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.swipertext}>광고 배너 2번, Hello ReactNative</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.swipertext}>광고 배너 3번, Hello JavaScript</Text>
            </View>
          </Swiper>
        </View>

        {/* 경고 알림 View */}
        <AlertComponent data={data} showAlert={showAlert} />

        {/* 아래 View는 일기예보 View */}
        <Weather weatherData={weatherData} />

        {/* todo list View */}
        <TodoList
          entries={entries}
          input={input}
          setInput={setInput}
          handleAdd={handleAdd}
          handleDelete={handleDelete}
        />

      </ScrollView>
    </View>
  );
};

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
      height: 250,
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
      //flexDirection: 'row',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      marginVertical: 5,
    },
    // todoList에서 사용 중
    text: {
      width: '80%',
      fontSize: 18,
      fontWeight: '500',
      color: 'black',
      padding: 15,
    },
    // 아래는 광고 배너
    swiper: {
      width: "100%",
      height: 100,
      // margin: 5,
    },
    slide1: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    swipertext: {
      width: '80%',
      fontSize: 18,
      fontWeight: '500',
      color: 'black',
      padding: 40,
    }
  });
