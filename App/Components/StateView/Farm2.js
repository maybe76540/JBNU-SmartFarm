import React from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function Farm2() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          Farm2 현재 상태</Text>
      </View>

      <View style={styles.stateBox}>
        <View style={styles.square}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>
              현재 온도</Text>
          <Text>예시 섭씨 20°C</Text>
        </View>
        
        <View style={styles.square}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>
              현재 습도</Text>
          <Text>예시 습도 20%</Text>
        </View>

        <View style={styles.square}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>
              현재 조도</Text>
          <Text>예시 20</Text>
        </View>

        <View style={styles.square}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>
              현재 이산화탄소</Text>
          <Text>예시 200ppm</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fdf',
    },
    header: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    stateBox: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      backgroundColor: '#ffa'
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
  });