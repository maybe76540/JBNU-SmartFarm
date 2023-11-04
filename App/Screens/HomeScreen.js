  import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
  import React from 'react'
  import Home from '../Components/Home/Home'
  import FarmNavigations from '../Navigations/FarmNavigations'


  export default function HomeScreen({navigation}) {

    return (
      <SafeAreaView style={styles.container}>
        <Home navigation={navigation}/>
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });