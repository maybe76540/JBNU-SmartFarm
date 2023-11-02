import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigations from './App/Navigations/TabNavigations';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}> 
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <NavigationContainer >
        <TabNavigations />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
  },
});

