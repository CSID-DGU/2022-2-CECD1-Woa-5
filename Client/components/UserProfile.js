// UserProfile.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
//import Header from './Header';

const UserProfile = () => {
  // 기본값을 현재 로그인된 사용자의 정보로 설정해야 합니다.
  const [email, setEmail] = useState('');
  const [old_pw, setOldPassword] = useState('');
  const [new_pw, setNewPassword] = useState('');
  const [new_pw_check, setConfirmPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const SERVER_URL = 'http://ec2-43-200-5-132.ap-northeast-2.compute.amazonaws.com:3000';

  const handleUpdateProfile = async() => {
    if (!email || !old_pw || !new_pw || !new_pw_check || !phone_number || !name) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    try{
      console.log('새 회원정보 전송');
      const response = await fetch(`${SERVER_URL}/API/Edit_member`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          old_pw: old_pw,
          new_pw: new_pw,
          new_pw_check: new_pw_check,
          phone_number: phone_number,
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
          value={old_pw}
          onChangeText={setOldPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="신규 비밀번호 입력"
          value={new_pw}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="신규 비밀번호 재입력"
          value={new_pw_check}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="전화번호"
          value={phone_number}
          onChangeText={setPhoneNumber}
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
