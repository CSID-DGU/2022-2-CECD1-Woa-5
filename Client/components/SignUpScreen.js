import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Header from './Header';

function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [pw, setPassword] = useState('');
  const [pwCheck, setConfirmPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [phone_numberCheck, setConfirmPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const SERVER_URL = 'http://ec2-43-200-5-132.ap-northeast-2.compute.amazonaws.com:3000';

  //전화번호 유효성 검사
  const validatePhoneNumber = (phone_number) =>{
    //01012345678과 같이 11자리의 전화번호만 인정
    const phoneNumberFormat = /^0\d{10}$/;
    return phoneNumberFormat.test(phone_number);
  }

  // 회원가입 로직을 처리하는 함수
  const handleSignUp = async() => {
    if (!email || !pw || !pwCheck || !phone_number || !phone_numberCheck || !name) {
        alert('모든 필드를 입력해주세요.');
        return;
    }
    if (pw !== pwCheck) {
        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        return;
    }
    if(!(validatePhoneNumber(phone_number))){
      alert('전화번호 형식이 일치하지 않습니다.');
      return;
    }
    try {//POST방식
        const response = await fetch(`${SERVER_URL}/API/Sign_up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email,
            pw,
            pwCheck,
            phone_number,
            phone_numberCheck,
            name,
        }),
        });

        const data = await response.json();
        if(data.check === true){
          Alert.alert('성공', '회원가입이 완료되었습니다');
        }else{
          Alert.alert('실패', '회원가입에 실패했습니다. 입력한 정보를 다시 확인하세요.');
        }
    }catch(error){
      Alert.alert('에러', '회원가입 과정에서 문제가 발생했습니다.');
    }
  };

  const handleSendAuthCode = () =>{
    Alert.alert('인증번호를 보냅니다.');
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
        value={pwCheck}
        secureTextEntry
      />
      <Text>전화번호</Text>
      <Input
        placeholder="ex)01012341234"
        leftIcon={{ type: 'material', name: 'phone' }}
        onChangeText={setPhoneNumber}
        value={phone_number}
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
        value={phone_numberCheck}
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
