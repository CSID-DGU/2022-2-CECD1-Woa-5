// UserProfile.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
//import Header from './Header';

const UserProfile = () => {
  // 기본값을 현재 로그인된 사용자의 정보로 설정해야 합니다.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const SERVER_URL = 'http://ec2-43-200-5-132.ap-northeast-2.compute.amazonaws.com:3000';

  const handleUpdateProfile = async() => {
    try{
      console.log('새 회원정보 전송');
      const response = await fetch('${SERVER_URL}/API/Edit_member',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          old_pw: password,
          new_pw: newPassword,
          new_pw_check: confirmPassword,
          phone_number: phone,
          name: name,
        }),
      });

      const data = response.json();

      if(data.check){
        //회원정보 수정 성공
        console.log('회원정보 수정 성공');
        Alert.alert('성공', '회원정보가 수정되었습니다.');
      }else{
        //회원정보 수정 실패
        console.log('회원정보 수정 실패');
        Alert.alert('실패', '회원정보 수정에 실패했습니다. 입력 정보를 다시 확인해주세요.');
      }
    }catch(error){
      console.error('회원정보 수정 도중 오류 발생:', error);
      Alert.alert('오류', '회원정보 수정 도중 오류가 발생했습니다.');
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
          editable={false}
        />
        <TextInput
          style={styles.input}
          placeholder="기존 비밀번호 입력"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="신규 비밀번호 입력"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="신규 비밀번호 재입력"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="이름"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>정보 수정</Text>
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
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 20,
  },
  updateButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfile;
