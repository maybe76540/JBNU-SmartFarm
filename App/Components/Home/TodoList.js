import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const TodoList = ({ entries, input, setInput, handleAdd, handleDelete }) => {
  return (
    <View style={styles.todoListView}>
      <Text style={{ fontSize: 30, fontWeight: '600', marginHorizontal: 10, marginTop: 10 }}>
        작업 스케줄 및 할 일 목록</Text>
      <View style={styles.inputView}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder='해야 할 일을 관리 할 수 있어요'
          style={styles.textInput}
        />
        <Button title="등록" onPress={handleAdd} />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        {entries.map((entry) => (
          <View style={styles.todoView} key={entry.text}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => handleDelete(entry.text)}>
                <MaterialIcons name="check-box-outline-blank" size={20} color="black" />
              </TouchableOpacity>
              <Text style={styles.text}>{entry.text}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    weather_container: {
      // flex: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
      //flexDirection: 'row',
      marginVertical: 5,
      borderRadius: 20,
      borderColor: "black",
      backgroundColor: "#fdd"
    },
    weatherBox: {
      width: 100,
      height: 100,
      borderRadius: 10,
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFD',
    },
    todoListView: {
      width: '100%',
      height: 250,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 5,
      borderRadius: 20,
      borderColor: "black",
      backgroundColor: '#FCC',
    },
    inputView: {
      flexDirection: 'row',
      // justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      width: "60%",
      marginTop: 10,
      marginBottom: 10,
      paddingHorizontal: 10,
      height: 35,
      borderRadius: 10,
      borderColor: 'gray',
      borderWidth: 2,
    },
    todoView: {
      //flexDirection: 'row',
      alignItems: 'center',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      marginVertical: 5,
    },
    // todoList에서 사용 중
    text: {
      width: '80%',
      fontSize: 18,
      fontWeight: '500',
      color: 'black',
      padding: 15,
    },
    // 아래는 광고 배너
    swiper: {
      width: "100%",
      height: 100,
      // margin: 5,
    },
    slide1: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DD6EB'
    },
    slide2: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#97CAE5'
    },
    slide3: {
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    swipertext: {
      width: '80%',
      fontSize: 18,
      fontWeight: '500',
      color: 'black',
      padding: 40,
    }
  });

export default TodoList;