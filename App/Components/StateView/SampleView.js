import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function SampleView() {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
            JBNU 스마트팜 IoT 서비스</Text>
        </View>

        {/* <View style={styles.stateBox}> */}
            <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
                현재 온도</Text>
            <Text>예시 섭씨 20°C</Text>
            </View>
            <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
                현재 습도</Text>
            <Text>예시 습도 50%</Text>
            </View>

            <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
                현재 조도</Text>
            <Text>예시 80</Text>
            </View>
            <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
                현재 이산화탄소</Text>
            <Text>예시 200ppm</Text>
            </View>
        {/* </View> */}
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    header: {
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'baseline',
      paddingTop: 50,
    },
    square: {
      width: '45%',
      height: '30%',
      aspectRatio: 1,
      backgroundColor: 'lightgrey',
      margin: '2.5%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    stateBox: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    CelstateBox: {
      flex: 1,
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'gray',
      borderWidth: 1,
      height: '50%',
      width: '50%',
    },
    HumstateBox: {
      flex: 1,
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: 'gray',
      borderWidth: 1,
      height: '50%',
      width: '50%',
    },
  });