import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import Module1 from '../Components/StateView/Module1'
import Module2 from '../Components/StateView/Module2'
import TestView from '../Components/StateView/TestView'
// import Farm1 from '../Components/StateView/Farm1'
// import Farm2 from '../Components/StateView/Farm2'

const Stack = createStackNavigator();

export default function FarmNavigations({navigation}) {
    const [visible, setVisible] = useState(false);
    const [value, setValue] = useState('');
  
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
  
    const navigateToFarm = (moduleName) => {
      setValue(moduleName);
      closeMenu();
      navigation.navigate(moduleName);
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
                  style={{ backgroundColor: '#A4A4A4' }}>{value || 'Select a Module'}</Button>}
        >
          <Menu.Item onPress={() => navigateToFarm('Module1')} title="Module1" />
          <Divider />
          <Menu.Item onPress={() => navigateToFarm('Module2')} title="Module2" />
          <Divider />
          {/* <Menu.Item onPress={() => navigateToFarm('Farm3')} title="Farm3" />
          <Divider /> */}
          <Menu.Item onPress={() => navigateToFarm('TestView')} title="Test" />
        </Menu>
      </View>

      <Stack.Navigator initialRouteName="Module1">
        <Stack.Screen name="Module1" component={Module1} options={{headerShown: false}} />
        <Stack.Screen name="Module2" component={Module2} options={{headerShown: false}} />
        <Stack.Screen name="TestView" component={TestView} options={{headerShown: false}} />
      </Stack.Navigator>
    </Provider>
  )
}
