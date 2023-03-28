// FindPWScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Header from './Header';
// import apiClient from './api';

const FindPWScreen = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    // try {
    //   // 이메일로 비밀번호 정보를 보내는 API 호출을 여기에 구현해야 함
    //   await apiClient.resetPassword(email);
    //   Alert.alert('비밀번호 찾기', '비밀번호 정보가 이메일로 전송되었습니다.');
    // } catch (error) {
    //   Alert.alert('에러', '비밀번호 찾기 과정에서 문제가 발생했습니다.');
    // }
  };

  return (
    <View style={styles.container}>
      {/* <Header title="와" /> */}
      <View style={styles.formContainer}>
        <TextInput
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleForgotPassword} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
  },
  formContainer: {
    padding: 16,
    backgroundColor: 'white',
    maxWidth: 450,
    width: '100%',
  },
  input: {
    height: 20,
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 8,
    paddingLeft: 8,
    paddingRight: 8,
  },
  resetButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:10,
    padding: 10,
  },
  resetButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,    
    fontWeight: 'bold',
  },
});

export default FindPWScreen;
