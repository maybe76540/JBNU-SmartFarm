// useLocation.js
//현재 사용자 위치정보 접근과 handling 파일
import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function useLocation() {
  const [locationData, setLocationData] = useState({
    city: '',
    region: '',
    district: '',
    mapRegion: null,
  });

  useEffect(() => {
    let subscription = null;

    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('위치정보에 대한 접근이 거부되었습니다');
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.High,
        },
        async (location) => {
            const {coords} = location;
            const {latitude, longitude} = coords;

            const findCity = await Location.reverseGeocodeAsync(
              {latitude, longitude}, {useGoogleMaps: false});

            setLocationData({
              city: findCity[0].city,
              region: findCity[0].region,
              district: findCity[0].district,
              mapRegion: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
            });
        },
      );
    })();

    return () => {
        if(subscription) {
            subscription.remove();
        }
    };
  }, []);

  return locationData;
}
