import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import firebase from 'firebase/compat/app';  // modify this line
import '../../../firebaseConfig'; // import firebase configuration

export default function SampleView() {
    const [data, setData] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        firebase.database().ref('/').on('value', (snapshot) => {
        setData(snapshot.val());
        });

        // Clean-up function
        return () => {
        firebase.database().ref('/').off('value');
        };
    }, []);

    useEffect(() => {
      const loadImage = async () => {
        const url = await firebase.storage().ref('test.jpg').getDownloadURL();
        setImageUrl(url);
      };
  
      loadImage();
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