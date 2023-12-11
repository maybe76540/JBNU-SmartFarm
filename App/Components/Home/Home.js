import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Alert, Text, Linking, Image, TouchableWithoutFeedback, 
  TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'
import useLocation from '../Map/useLocation';
import firebase from 'firebase/compat/app';
//import '../../../firebaseConfig'; // import firebase configuration
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

const Banner = ({ imagePath, link }) => {
  const handlePress = () => {
    Linking.openURL(link);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.slide}>
        <Image source={imagePath} style={{ width: '100%', resizeMode: 'cover' }} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function Home() {
  const { mapRegion } = useLocation();
  const [weatherData, setWeatherData] = useState(null);
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');
  // const [data, setData] = useState([]);
  // const [showAlert, setShowAlert] = useState(false);
  // const [low_thresholds, setLow_Thresholds] = useState({
  //   temperature: 20,
  //   humidity: 40,
  // });
  // const [high_thresholds, setHigh_Thresholds] = useState({
  //   temperature: 25,
  //   humidity: 80,
  // });
  // const [showLowTempAlert, setshowLowTempAlert] = useState(false);
  // const [showHighTempAlert, setshowHighTempAlert] = useState(false);
  // const [showLowHumidAlert, setShowLowHumidAlert] = useState(false);
  // const [showHighHumidAlert, setShowHighHumidAlert] = useState(false);
  // const [isModalVisible, setModalVisible] = useState(false);
  // const [selectedThreshold, setSelectedThreshold] = useState('');
  // const [newThresholdValue, setNewThresholdValue] = useState('');

  // 센서 데이터값 확인해 위험 판단   
  // useEffect(() => {
  //   firebase.database().ref('/nongiot1').on('value', (snapshot) => {
  //     let value = snapshot.val();
  //     setData(value);

  //     // value 존재 확인, value.temperature 확인, value.temperature 임계값 검사
  //     // 온도 임계값 확인
  //     if (value && value.temperature && value.temperature <= low_thresholds.temperature) {
  //       setshowLowTempAlert(true);
  //     } else {
  //       setshowLowTempAlert(false);
  //     }
  //     if (value && value.temperature && value.temperature >= high_thresholds.temperature) {
  //       setshowHighTempAlert(true);
  //     } else {
  //       setshowHighTempAlert(false);
  //     }

  //     // 습도 임계값 확인
  //     if (value && value.humidity && value.humidity <= low_thresholds.humidity) {
  //       setShowLowHumidAlert(true);
  //     } else {
  //       setShowLowHumidAlert(false);
  //     }
  //     if (value && value.humidity && value.humidity >= high_thresholds.humidity) {
  //       setShowHighHumidAlert(true);
  //     } else {
  //       setShowHighHumidAlert(false);
  //     }
  //   });

  //   // Clean-up function
  //   return () => {
  //     firebase.database().ref('/').off('value', onDataChange);
  //   };
  // }, [low_thresholds, high_thresholds]);

  // const handleLowThresholdChange = (sensor, newThreshold) => {
  //   // 낮은 임계값 업데이트
  //   setLow_Thresholds((prevThresholds) => ({
  //     ...prevThresholds,
  //     [sensor]: newThreshold,
  //   }));
  // };

  // const handleHighThresholdChange = (sensor, newThreshold) => {
  //   // 높은 임계값 업데이트
  //   setHigh_Thresholds((prevThresholds) => ({
  //     ...prevThresholds,
  //     [sensor]: newThreshold,
  //   }));
  // };

  // // 임계값 조절 모달 열기
  // const handleOpenModal = () => {
  //   setModalVisible(true);
  //   Alert.alert('Button Pressed', 'TouchableOpacity was pressed!');
  // };

  // const handleCloseModal = () => {
  //   setModalVisible(false);
  // };

  // const handleSaveThreshold = () => {
  //   const newThreshold = parseInt(newThresholdValue);
  //   if (!isNaN(newThreshold)) {
  //     if (selectedThreshold === 'lowTemperature') {
  //       handleLowThresholdChange('temperature', newThreshold);
  //     } else if (selectedThreshold === 'highTemperature') {
  //       handleHighThresholdChange('temperature', newThreshold);
  //     } else if (selectedThreshold === 'lowHumidity') {
  //       handleLowThresholdChange('humidity', newThreshold);
  //     } else if (selectedThreshold === 'highHumidity') {
  //       handleHighThresholdChange('humidity', newThreshold);
  //     }
  //     handleCloseModal();
  //   } else {
  //     Alert.alert('유효한 숫자를 입력하세요.');
  //   }
  // };

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
            <Banner imagePath={require('../../../assets/banner_kamis.png')} 
                    link="https://m.kamis.or.kr:4434/mobile/app/index.do"/>
            <Banner imagePath={require('../../../assets/banner_n-farm.png')} 
                    link="https://www.n-farm.kr/"/>
            <Banner imagePath={require('../../../assets/banner_subsidy.png')} 
                    link="https://farmmorning.com/government-subsidy"/>
          </Swiper>
        </View>

        {/* 경고 알림 View */}
        
        {/* <Animated.View style={{flexDirection: "row"}}>
          <Text>온도 온도 온도 온도</Text>
          {data && data.temperature ? (
            <>
              {showLowTempAlert && (
                <View style={styles.alertBox}>
                  <Text style={styles.alertText}>주의! 현재 온도가 너무 낮습니다.</Text>
                </View>
              )}
              {showHighTempAlert && (
                <View style={styles.alertBox}>
                  <Text style={styles.alertText}>주의! 현재 온도가 너무 높습니다.</Text>
                </View>
              )}
              {showLowHumidAlert && (
                <View style={styles.alertBox}>
                  <Text style={styles.alertText}>주의! 현재 습도가 너무 낮습니다.</Text>
                </View>
              )}
              {showHighHumidAlert && (
                <View style={styles.alertBox}>
                  <Text style={styles.alertText}>주의! 현재 습도가 너무 높습니다.</Text>
                </View>
              )}
            </>
          ) : (
            <Text>Loading...</Text>
          )}
          {/* 임계값 조절 버튼 */}
          {/* <TouchableOpacity style={styles.thresholdButton} onPress={handleOpenModal}>
            <Text>임계값 조절</Text>
          </TouchableOpacity>

          {/* 모달 */}
          {/* <MyModal isOpen={isModalVisible} onClose={handleCloseModal} /> */}

          
          {/* <View>
            <TouchableOpacity
              style={styles.thresholdButton}
              onPress={() => handleOpenModal('lowTemperature')}
            >
              <Text>낮은 온도 임계값: {low_thresholds.temperature}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.thresholdButton}
              onPress={() => handleOpenModal('highTemperature')}
            >
              <Text>높은 온도 임계값: {high_thresholds.temperature}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.thresholdButton}
              onPress={() => handleOpenModal('lowHumidity')}
            >
              <Text>낮은 습도 임계값: {low_thresholds.humidity}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.thresholdButton}
              onPress={() => handleOpenModal('highHumidity')}
            >
              <Text>높은 습도 임계값: {high_thresholds.humidity}</Text>
            </TouchableOpacity>

          </View> */}
          
        {/* </Animated.View> */}

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
      borderColor: 'black',
      borderWidth: 2,
      // margin: 5,
    },
    slide: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    swipertext: {
      width: '80%',
      fontSize: 18,
      fontWeight: '500',
      color: 'black',
      padding: 40,
    }
  });
