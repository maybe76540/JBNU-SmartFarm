import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import firebase from 'firebase/compat/app';  // modify this line
import '../../../firebaseConfig'; // import firebase configuration

export default function SampleView() {
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);

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
  
      loadImage();
  
      // nongiot1_pic/current_time 노드 변경 확인 리스너
      const currentTimeRef = firebase.database().ref('/nongiot1_pic/current_time');
      currentTimeRef.on('value', onImageChange);

      return () => {
        currentTimeRef.off('value', onImageChange);
      };
    }, []);
  
    if (!imageUrl) {
      return null;
    }
  
    

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
          <Text style={{fontSize:30, fontWeight:'bold'}}>
              Test Farm 현재 상태
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