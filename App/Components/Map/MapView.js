import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import useLocation from './useLocation';


export default function MapVeiw() {

  //현재 사용자 위치 불러오는 코드
  const { city, region, district, mapRegion } = useLocation();

  return (
    <SafeAreaView>
      <MapView // 셀프클로징해도 되지만 후의 마커를 위해서
        style={{width: '100%', height: '100%'}}
        initialRegion={{
                latitude: 35.84570,
                longitude: 127.12965,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={mapRegion}/>
    </SafeAreaView>
  )
}

// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';

// export default function App() {
//   const [data, setData] = useState({});

//   useEffect(() => {
//     fetch('http://127.20.10.8:5000/sensors')
//       .then(response => response.json())
//       .then(json => setData(json));
//   }, []);

//   return (
//     <View>
//       <Text>Temperature: {data.temperature}</Text>
//       <Text>Humidity: {data.humidity}</Text>
//     </View>
//   );
// }
