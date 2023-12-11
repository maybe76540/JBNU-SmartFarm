import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import firebase from 'firebase/compat/app';  // modify this line
import '../../../firebaseConfig'; // import firebase configuration
import { LineChart } from 'react-native-chart-kit';

export default function Module1() {
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [temp_for_graph, setTemp_for_graph] = useState([]);
    const [humid_for_graph, setHumid_for_graph] = useState([]);

    useEffect(() => {
      const fetchData = () => {
        firebase.database().ref('/nongiot1_realtime').on('value', (snapshot) => {
          setData(snapshot.val());
          });
      };

      fetchData();

      // Clean-up function
      return () => {
      firebase.database().ref('/nongiot1_realtime').off('value');
      };
    }, []);

    // 업데이트 된 이미지 자동으로 불러오는 함수
    useEffect(() => {
      const loadImage = async () => {
        try {
          const url = await firebase.storage().ref('nongiot1_pic.jpg').getDownloadURL();
          setImageUrl(url);
        } catch (error) {
          console.error('이미지 불러오기 오류:', error);
        }
      };

      const onImageChange = () => {
        loadImage();
      };

      // nongiot1_pic/current_time 노드 변경 확인 리스너
      const currentTimeRef = firebase.database().ref('/nongiot1_pic/current_time');
      currentTimeRef.on('value', onImageChange);

      // 이미지 로드 후에 데이터를 가져오는 훅
      loadImage();

      return () => {
        currentTimeRef.off('value', onImageChange);
      };
    }, [imageUrl]); // imageUrl이 변경될 때만 실행

    // 그래프
    useEffect(() => {
      const fetchData = async () => {
        const snapshot = await firebase
          .database()
          .ref('/nongiot1_historical')
          .orderByChild('current_time')  // 'current_time'을 기준으로 정렬
          .limitToLast(360)              // 한시간 동안의 데이터 가져와 그래프로 그림
          .once('value');

        const tempDataArr = [];
        const humidDataArr = [];

        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const values = childSnapshot.val();

          tempDataArr.push({ key, temperature: values.temperature });
          humidDataArr.push({ key, humidity: values.humidity });
        });

        setTemp_for_graph(tempDataArr);
        setHumid_for_graph(humidDataArr);
      };

      fetchData();
    }, [imageUrl]); // imageUrl이 변경될 때만 실행
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
          <Text style={{fontSize:30, fontWeight:'bold'}}>
              Farm1 현재 상태
          </Text>
      </View>
      <View style={styles.stateBox}>
        {data.temperature !== undefined ? (
          <View style={styles.square}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
              현재 온도
            </Text>
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
              {data.temperature}°C
            </Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

        {data.humidity !== undefined ? (
          <View style={styles.square}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
              현재 습도
            </Text>
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
              {data.humidity}%
            </Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

        {data.ldr_value !== undefined ? (
          <View style={styles.square}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
              현재 조도
            </Text>
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
              {data.ldr_value}
            </Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

        {data.co2_ppm !== undefined ? (
          <View style={styles.square}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
              현재 이산화탄소
            </Text>
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
              {data.co2_ppm}ppm
            </Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}

        {data.mq_value !== undefined ? (
          <View style={styles.square}>
            <Text style={{ fontSize: 20, fontWeight: '600' }}>
              종합 공기 질
            </Text>
            <Text style={{ fontSize: 35, fontWeight: 'bold' }}>
              {data.mq_value}
            </Text>
          </View>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      <View style={styles.imageView}>
        <Text style={{ fontSize: 25, fontWeight: 500 }}>Module1 실시간 카메라 화면</Text>
        <View>
          <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
        </View>
      </View>
      

      {/* 온도 그래프 */}
      <View style={{marginTop: 20}}>
        <Text style={{ fontSize: 25, fontWeight: 500 }}>Module1 온도 데이터 그래프</Text>
        {temp_for_graph.length > 0 && (
          <LineChart
            data={{
              labels: temp_for_graph.map((entry) => entry.current_time),
              datasets: [
                {
                  data: temp_for_graph.map((entry) => entry.temperature),
                },
              ],
            }}
            width={400}
            height={300}
            yAxisLabel="°C"
            xAxisLabel='Time'
            chartConfig={{
              backgroundColor: '#000000',
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#000000',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '1',
                strokeWidth: '1',
                stroke: '#ffa726',
              },
            }}
          />
        )}
      </View>

      {/* 습도 그래프 */}
      <View style={{marginTop: 20}}>
        <Text style={{ fontSize: 25, fontWeight: 500 }}>Module1 습도 데이터 그래프</Text>
        {humid_for_graph.length > 0 && (
          <LineChart
            data={{
              labels: humid_for_graph.map((entry) => entry.current_time),
              datasets: [
                {
                  data: humid_for_graph.map((entry) => entry.humidity),
                },
              ],
            }}
            width={400}
            height={300}
            yAxisLabel="%"
            xAxisLabel='Time'
            chartConfig={{
              backgroundColor: '#000000',
              backgroundGradientFrom: '#000000',
              backgroundGradientTo: '#000000',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '1',
                strokeWidth: '1',
                stroke: '#ffa726',
              },
            }}
          />
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // borderBottomColor: 'black',
    // borderBottomWidth: 3,
  },
  stateBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  square: {
    width: '45%',
    height: '30%',
    aspectRatio: 1,
    backgroundColor: '#E6E6E6',
    margin: '2.5%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  imageView: {
    justifyContent: 'center',
    width: "100%",
    height: 250,
    marginTop: 20,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  }
});