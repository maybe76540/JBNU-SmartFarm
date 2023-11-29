import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

export default function Farm2() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>
          Farm2 현재 상태</Text>
      </View>
      <ScrollView style={{height: "100%"}}>
        <View style={styles.stateBox}>
          <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'600'}}>
                현재 온도</Text>
            <Text style={{fontSize:35, fontWeight:'bold'}}>
              20°C</Text>
          </View>
          
          <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'600'}}>
                현재 습도</Text>
            <Text style={{fontSize:35, fontWeight:'bold'}}>
              20%</Text>
          </View>

          <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
                현제 조도</Text>
            <Text style={{fontSize:35, fontWeight:'bold'}}>
              20</Text>
          </View>

          <View style={styles.square}>
            <Text style={{fontSize:20, fontWeight:'bold'}}>
                현재 이산화탄소</Text>
            <Text style={{fontSize:35, fontWeight:'bold'}}>
              200ppm</Text>
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
});