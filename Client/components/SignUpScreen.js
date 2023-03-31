import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Header from './Header';

function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [pw, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState('');
  const [name, setName] = useState('');

  // 회원가입 로직을 처리하는 함수
  const handleSignUp = async() => {
    if (!email || !pw || !confirmPassword || !phoneNumber || !confirmPhoneNumber || !name) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    if (pw !== confirmPassword) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
    }
    try {//POST방식
        const response = await fetch('/API/Sign_up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            emailCheck,
            pw,
            confirmPassword,
            phoneNumber,
            confirmPhoneNumber,
            name,
        }),
    });
    const data = await response.json();

    // 서버 응답에 따른 처리
    if (response.ok) {
      alert('회원가입이 완료되었습니다.');
    } else {
      alert(`회원가입 실패: ${data.message}`);
    }
    } catch (error) {
        console.error(error);
        alert('회원가입 중 에러가 발생했습니다.');
    }
  };

  const handleSendAuthCode = () =>{
    alert('인증번호를 보냅니다.');
  }

  return (
    <View style={styles.container}>
      {/* <Header></Header> */}
      <View style={styles.formContainer}>
      {/* <Text style={styles.title}>회원가입</Text> */}
      <Text>이메일</Text>
      <View style={styles.emailContainer}>
        <Input
            placeholder="이메일"
            leftIcon={{ type: 'material', name: 'email' }}
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
            keyboardType="email-address"
        />
      </View>
      
      <Text>비밀번호</Text>
      <Input
        placeholder="비밀번호 입력"
        leftIcon={{ type: 'material', name: 'lock' }}
        onChangeText={setPassword}
        value={pw}
        secureTextEntry
      />
      <Text>비밀번호 확인</Text>
      <Input
        placeholder="비밀번호 재입력"
        leftIcon={{ type: 'material', name: 'lock' }}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
        secureTextEntry
      />
      <Text>전화번호</Text>
      <Input
        placeholder="010-xxxx-xxxx"
        leftIcon={{ type: 'material', name: 'phone' }}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        keyboardType="phone-pad"
      />
      <TouchableOpacity onPress={handleSendAuthCode} style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>인증</Text>
      </TouchableOpacity>

      <Text>인증번호</Text>
      <Input
        placeholder="인증번호 입력"
        leftIcon={{type: 'material', name: 'phone'}}
        onChangeText={setConfirmPhoneNumber}
        value={confirmPhoneNumber}
      />
      <Text>이름</Text>
      <Input
        placeholder="이름"
        leftIcon={{ type: 'material', name: 'person' }}
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// SignUpScreen.navigationOptions={
//     title: '회원가입',
// };

const styles = StyleSheet.create({
    container:{
      flex: 1,
      alignItems: 'center',
      backgroundColor:'white',
      paddingTop: 40,
    },
    formContainer:{
      padding:15,
      maxWidth: 450,
      width: '100%',
    },
    title: {
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 25,
        padding: 20,
    },
    emailContainer:{
      flexDirection: 'column',
    },
    verifyButton: {
      backgroundColor: '#cecece',
      padding: 8,
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    verifyButtonText:{
      fontWeight: 'bold',
      fontSize:15,
    },
    signupButton: {
      backgroundColor: '#1e88e5',
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    signupButtonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
});

export default SignUpScreen;
