import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export default function MapVeiw() {
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
        provider={PROVIDER_GOOGLE}/>
    </SafeAreaView>
  )
}
