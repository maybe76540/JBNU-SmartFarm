import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Farm1() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          Farm1 현재 상태</Text>
      </View>
      <ScrollView style={{height: "100%"}}>
        <View style={styles.stateBox}>
          <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'600'}}>
                현재 온도</Text>
            <Text style={{fontSize:35, fontWeight:'bold'}}>
              10°C</Text>
          </View>
          
          <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'600'}}>
                현재 습도</Text>
            <Text style={{fontSize:35, fontWeight:'bold'}}>
              10%</Text>
          </View>

          <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
                현제 조도</Text>
            <Text style={{fontSize:35, fontWeight:'bold'}}>
              10</Text>
          </View>

          <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
                현재 이산화탄소</Text>
            <Text style={{fontSize:35, fontWeight:'bold'}}>
              100ppm</Text>
          </View>
        </View>
      </ScrollView>
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
  // CelstateBox: {
  //   flex: 1,
  //   margin: 20,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   height: '50%',
  //   width: '50%',
  // },
  // HumstateBox: {
  //   flex: 1,
  //   margin: 20,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   height: '50%',
  //   width: '50%',
  // },
});