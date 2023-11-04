import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Farm1 from '../Components/StateView/Farm1'
import Farm2 from '../Components/StateView/Farm2'
import Farm3 from '../Components/StateView/Farm3'

const Stack = createStackNavigator();

export default function FarmNavigations({navigation}) {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
  
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
  
    const navigateToFarm = (farmName) => {
      setValue(farmName);
      closeMenu();
      navigation.navigate(farmName);
    }
  return (
    <Provider>
      <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center' }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{ width: 200 }}
          anchor={<Button onPress={openMenu}
                  mode="contained"
                  style={{ backgroundColor: '#82FA58' }}>{value || 'Select a Farm'}</Button>}
        >
          <Menu.Item onPress={() => navigateToFarm('Farm1')} title="Farm1" />
          <Divider />
          <Menu.Item onPress={() => navigateToFarm('Farm2')} title="Farm2" />
          <Divider />
          <Menu.Item onPress={() => navigateToFarm('Farm3')} title="Farm3" />
        </Menu>
      </View>

      <Stack.Navigator initialRouteName="Farm1">
        <Stack.Screen name="Farm1" component={Farm1} options={{headerShown: false}} />
        <Stack.Screen name="Farm2" component={Farm2} options={{headerShown: false}} />
        <Stack.Screen name="Farm3" component={Farm3} options={{headerShown: false}} />
      </Stack.Navigator>
    </Provider>
  )
}
