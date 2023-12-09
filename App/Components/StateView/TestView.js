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

    // 이미지 한번만 불러오는 함수
    // useEffect(() => {
    //   const loadImage = async () => {
    //     const url = await firebase.storage().ref('test.jpg').getDownloadURL();
    //     setImageUrl(url);
    //   };
  
    //   loadImage();
    // }, []);
  
    // if (!imageUrl) {
    //   return null;
    // }

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
  
      // Listen for changes in nongiot1_pic/current_time node
      const currentTimeRef = firebase.database().ref('/nongiot1_pic/current_time');
      currentTimeRef.on('value', onImageChange);

      // Cleanup function to remove the listener
      return () => {
        currentTimeRef.off('value', onImageChange);
      };
    }, []); // 마운트 시에만 실행되도록 빈 의존성 배열
  
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
      {/* <ScrollView style={{height: "100%"}}> */}
        <View style={styles.stateBox}>
          {data.temperature ? (
            <>
              <View style={styles.square}>
                  <Text style={{fontSize:20, fontWeight:'600'}}>
                      현재 온도
                  </Text>
                  <Text style={{fontSize:35, fontWeight:'bold'}}>
                    {data.temperature}°C</Text>
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}

          {data.humidity ? (
            <>
              <View style={styles.square}>
                  <Text style={{fontSize:20, fontWeight:'600'}}>
                      현재 습도
                  </Text>
                  <Text style={{fontSize:35, fontWeight:'bold'}}>
                    {data.humidity}%</Text>
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
          
          {/* 조도 값 */}
          {data.ldr_value ? (
            <>
              <View style={styles.square}>
                  <Text style={{fontSize:20, fontWeight:'600'}}>
                      현재 조도
                  </Text>
                  <Text style={{fontSize:35, fontWeight:'bold'}}>
                    {data.ldr_value}</Text>
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}

          {data.co2_ppm ? (
            <>
              <View style={styles.square}>
                  <Text style={{fontSize:20, fontWeight:'600'}}>
                      현재 이산화탄소
                  </Text>
                  <Text style={{fontSize:35, fontWeight:'bold'}}>
                    {data.co2_ppm}ppm</Text>
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}

          {data.mq_value ? (
            <>
              <View style={styles.square}>
                  <Text style={{fontSize:20, fontWeight:'600'}}>
                      종합 공기 질
                  </Text>
                  <Text style={{fontSize:35, fontWeight:'bold'}}>
                    {data.mq_value}</Text>
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>

        <View style={styles.imageView}>
          <Image source={{ uri: imageUrl }} style={styles.imageStyle} />
        </View>  
      {/* </ScrollView> */}
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