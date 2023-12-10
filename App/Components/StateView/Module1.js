import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import firebase from 'firebase/compat/app';  // modify this line
import '../../../firebaseConfig'; // import firebase configuration
import { LineChart } from 'react-native-chart-kit';

export default function Module1() {
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);
    const [temp_for_graph, setTemp_for_graph] = useState([]);

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
          const url = await firebase.storage().ref('test.jpg').getDownloadURL();
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
          .once('value');

        const dataArr = [];
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const values = childSnapshot.val();
          dataArr.push({ key, ...values });
        });

        setTemp_for_graph(dataArr);
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
        <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
      </View>

      {/* 그래프 */}
      <View>
        <Text>Module1 온도 데이터 그래프:</Text>
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
            height={220}
            yAxisLabel="°C"
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
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
  imageView: {
    justifyContent: 'center',
    width: "100%",
    height: 250,
  },
  imageStyle: {
    width: "100%",
    height: "100%",
  }
});