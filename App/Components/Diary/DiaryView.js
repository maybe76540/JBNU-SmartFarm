import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, Alert } from 'react-native';

export default function DiaryView() {
  const [entries, setEntries] = useState([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    const date = new Date();
    const date_form = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 
      ${date.getHours()}시 ${date.getMinutes()}분`;
    const newEntry = { text: input, date: date_form, id: date.getTime() };
    setEntries([newEntry, ...entries]);
    setInput('');
  };

  const handleDelete = (id) => {
    Alert.alert(
      "일지 삭제",
      "정말로 이 일지를 삭제하시겠습니까?\n삭제한 뒤에는 되돌릴 수 없습니다.",
      [
        {
          text: "취소",
          style: "cancel"
        },
        { 
          text: "확인", 
          onPress: () => setEntries(entries.filter((entry) => entry.id !== id)) 
        }
      ]
    );
  };

  // 일지 수정 함수
  // const handleEdit = (id) => {
  //   const editEntry = entries.find((entry) => entry.id === id);
  //   setInput(editEntry.text);
  //   handleDelete(id);
  // };

  return (
    <View style={styles.mainView}>
      <View style={styles.inputView}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder='여기를 눌러 작성할 수 있어요'
          style={styles.textInput}
        />
        <Button title="등록" onPress={handleAdd} />
      </View>
      
      <ScrollView>
        {entries.map((entry) => (
          <View style={styles.diaryView} key={entry.id}>
            <Text style={styles.text}>{entry.text}</Text>
            {/* 오른쪽으로 정렬 해야함 */}
            <View style={styles.addiView}>
              <Text style={styles.dateText}>{entry.date.toLocaleString()}</Text>
              {/* <Button title="수정" onPress={() => handleEdit(entry.id)} /> */}
              <Button title="삭제" onPress={() => handleDelete(entry.id)} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'white',
    //alignItems: 'center',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: "70%",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 2,
  },
  diaryView: {
    flexDirection: 'column',
    //justifyContent: 'space-between',
    //alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    margin: 5,
  },
  addiView: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'normal',
    color: 'black',
    padding: 20,
  },
  dateText:{
    fontSize: 13,
    fontWeight: 'normal',
    color: 'black',
  }
  // container: {
  //     flex: 1,
  //     backgroundColor: '#fff',
  // },
  });