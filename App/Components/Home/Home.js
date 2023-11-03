import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
//import { Picker } from '@react-native-picker/picker'
//import { Picker } from 'react-native'

export default function Home() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View style={{ paddingTop: 50, flexDirection: 'row', justifyContent: 'center' }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>{value || 'Select a Farm'}</Button>}
        >
          <Menu.Item onPress={() => { setValue('Farm1'); closeMenu(); }} title="Farm1" />
          <Divider />
          <Menu.Item onPress={() => { setValue('Farm2'); closeMenu(); }} title="Farm2" />
          <Divider />
          <Menu.Item onPress={() => { setValue('Farm3'); closeMenu(); }} title="Farm3" />
        </Menu>
      </View>
    </Provider>
  )
};

