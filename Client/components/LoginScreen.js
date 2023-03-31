// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Header from './Header';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [pw, setPassword] = useState('');
  const SERVER_URL = 'http://ec2-43-200-5-132.ap-northeast-2.compute.amazonaws.com:3000';

  const handleLogin = async() => {
    // 로그인 로직을 여기에 구현하십시오.
    try{
      const response = await fetch(`${SERVER_URL}/API/Sign_in`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email:email,
          pw:pw,
        }),
      });
      const data = await response.json();

      if(data.check){
        //로그인 성공
        console.log('로그인 성공');
        //로그인 후 이동할 페이지로 이동하기
      }else{
        //로그인 실패
        console.log('로그인 실패');
        alert('로그인 실패');
      }
    }catch(error){
      console.error('로그인 도중 오류 발생:',error);
      alert('로그인 도중 오류 발생');
    }
};

  return (
    <View style={styles.container}>
      {/* <Header title="와" /> */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="이메일"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          value={pw}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('FindPW')} style={styles.FindPWButton}>
          <Text style={styles.FindPWButtonText}>비밀번호 찾기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.SignUpButton}>
          <Text style={styles.SignUpButtonText}>회원가입</Text>
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
    maxWidth: 450,
    width:'100%',
    padding: 16,
  },
  input: {
    height: 20,
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 20,
    paddingLeft: 8,
    paddingRight: 8,
  },
  loginButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical:10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  FindPWButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical:10,
  },
  FindPWButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },   
  SignUpButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginVertical:10,
  },
  SignUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },   
});

export default LoginScreen;
