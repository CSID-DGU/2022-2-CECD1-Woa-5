import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const FindPWScreen = () => {
  const [email, setEmail] = useState('');
  const SERVER_URL = 'http://ec2-43-200-5-132.ap-northeast-2.compute.amazonaws.com:3000';

  const handleForgotPassword = async () => {
    try{
      const response = await fetch(`${SERVER_URL}/API/Search_pw`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email,
        }),
      });

      const data = response.json();

      if(data.pw){
        //비밀번호 찾기 성공, 새 비밀번호 전송 완료
        console.log('새 비밀번호 전송');
        Alert.alert('성공', '이메일로 비밀번호 정보가 전송되었습니다. 확인해주세요.');
      }else{
        //비밀번호 찾기 실패, 이메일 찾지 못함
        console.log('비밀번호 찾기 실패');
        Alert.alert('실패', '입력하신 이메일이 존재하지 않습니다. 다시 확인해주세요.');
      }
    }catch(error){
      console.error('비밀번호 찾기 도중 오류 발생', error);
      Alert.alert('오류', '비밀번호 찾기 도중 오류가 발생했습니다. 다시 시도해주세요.');
    }
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
