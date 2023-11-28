import React from 'react'
import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import DiaryView from '../Components/Diary/DiaryView';

export default function DiaryScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <DiaryView navigation={navigation}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
});