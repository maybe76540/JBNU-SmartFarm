  import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
  import React from 'react'
  import Home from '../Components/Home/Home'
  import FarmNavigations from '../Navigations/FarmNavigations'
  
  import Home_Test from '../Components/Home/Home_Test'


  export default function HomeScreen({navigation}) {

    return (
      <SafeAreaView style={styles.container}>
        <Home_Test navigation={navigation}/>
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
  });