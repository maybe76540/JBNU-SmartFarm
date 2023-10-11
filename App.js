import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.header}>
        <Text style={{fontSize:20, fontWeight:'bold'}}>
          JBNU 스마트팜 IoT 서비스</Text>
      </View>

      <View style={styles.stateBox}>
        <View style={styles.CelstateBox}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>
            현재 온도</Text>
          <Text>예시 섭씨 20°C</Text>
        </View>
        <View style={styles.HumstateBox}>
          <Text style={{fontSize:20, fontWeight:'bold'}}>
            현재 습도</Text>
          <Text>예시 습도 50%</Text>
        </View>
      </View>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
    paddingTop: 50,
  },
  stateBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  CelstateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    /*backgroundColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,*/
  },
  HumstateBox: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
});
