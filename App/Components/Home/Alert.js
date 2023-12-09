// Alert.js
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const AlertComponent = ({ data, showAlert }) => {
  return (
    <View>
      <Text>온도 온도 온도 온도</Text>
      {data && data.temperature ? (
        <>
          {showAlert && (
            <View style={styles.alertBox}>
              <Text style={styles.alertText}>주의! 현재 Farm1 온도가 너무 높습니다.</Text>
            </View>
          )}
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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

export default AlertComponent;