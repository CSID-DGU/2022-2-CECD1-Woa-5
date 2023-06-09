import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';

function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [pw, setPassword] = useState('');
  const [pwCheck, setConfirmPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [Verify_number, setVerifyNumber] = useState('');
  const [emailCheck, setConfirmEmailCheck] = useState('');
  const [name, setName] = useState('');
  const [opponent_number, setOpponentNumber] = useState('');
  const SERVER_URL = 'http://ec2-43-200-5-132.ap-northeast-2.compute.amazonaws.com:3000';

  //전화번호 유효성 검사
  const validatePhoneNumber = (phone_number) =>{
    //01012345678과 같이 11자리의 전화번호만 인정
    const phoneNumberFormat = /^0\d{10}$/;
    return phoneNumberFormat.test(phone_number);
  }

  // 회원가입 로직을 처리하는 함수
  const handleSignUp = async() => {
    if (!email || !pw || !pwCheck || !phone_number || !Verify_number || !emailCheck || !name || !opponent_number) {
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
            emailCheck,
            pw,
            pwCheck,
            phone_number,
            Verify_number,
            name,
            opponent_number,
        }),
        });
        const data = await response.json();
        console.log(data);

        if(data.check === true){
          console.log('회원가입 성공');
          alert('성공', '회원가입이 완료되었습니다');
        }else if(data.check === 1){
          alert('확인용 이메일이 동일하지 않습니다.');
        }else if(data.check === 2){
          alert('이메일 형식에 맞지 않습니다.');
        }else if(data.check === 3){
          alert('확인용 비밀번호와 다릅니다.');
        }else if(data.check === 4){
          alert('8자리 ~ 20자리 이내로 입력해주세요.');
        }else if(data.check === 5){
          alert('비밀번호는 공백 없이 입력해주세요.');
        }else if(data.check === 6){
          alert('영문,숫자, 특수문자를 혼합하여 입력해주세요.');
        }else if(data.check === 7){
          alert('사용자 전화번호 다시 입력하세요.');
        }else if(data.check === 8){
          alert('관리자 전화번호 다시 입력하세요.');
        }else{
          console.log(data);
          alert('회원가입에 실패하였습니다.');
        }
    }catch(error){
      Alert.alert('에러', '회원가입 과정에서 문제가 발생했습니다.');
    }
  };

  const handleSendAuthCode = async() =>{
    alert('인증번호를 보냅니다.');
    try{
      const response = await fetch(`${SERVER_URL}/API/Verify_number`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number,
        })
      });
      const authCodeData = await response.json();
      console.log(authCodeData);
      if(authCodeData.number === true){
        alert('인증번호를 확인해주세요.');
      }else{
        alert('인증번호 발송에 실패했습니다. 전화번호를 다시 확인해주세요.');
      }
    }catch(error){
      alert('인증번호 전송 과정에서 문제가 발생했습니다.');
    }
  };

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
      
      <Text>이메일 확인</Text>
      <Input
        placeholder="이메일 재입력"
        leftIcon={{type: 'material', name: 'mark-email-read'}}
        onChangeText={setConfirmEmailCheck}
        value={emailCheck}
      />
      
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
        leftIcon={{ type: 'material-community', name: 'lock-check' }}
        onChangeText={setConfirmPassword}
        value={pwCheck}
        secureTextEntry
      />
      <Text>전화번호</Text>
      <Input
        placeholder="ex)01027642764"
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
        placeholder="인증번호를 입력해주세요."
        leftIcon={{type: 'material', name: 'check-circle-outline'}}
        onChangeText={setVerifyNumber}
        value={Verify_number}
      />

      <Text>이름</Text>
      <Input
        placeholder="이름"
        leftIcon={{ type: 'material', name: 'person' }}
        onChangeText={setName}
        value={name}
        autoCapitalize="words"
      />

      <Text>관리자 전화번호</Text>
      <Input
        placeholder="ex)01027642764"
        leftIcon={{ type: 'material', name: 'contact-phone' }}
        onChangeText={setOpponentNumber}
        value={opponent_number}
        autoCapitalize="phone-pad"
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
