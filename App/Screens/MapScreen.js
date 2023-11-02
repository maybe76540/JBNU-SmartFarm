import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import Map from '../Components/Map/Map'

export default function MapScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <Map navigation={navigation}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});