import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './components/navigations/AuthStack';
import MainStack from './components/navigations/Mainstack';


export default function App() {
  // console.log("Woa React Native"); //개발 중 로그 확인용
  const [ isLoggedIn, setIsLoggedIn ] = useState(false); //true면 메인 기능 다 사용, false면 로그인창 

  return (
    <NavigationContainer style={styles.container}>
      <StatusBar style="auto" />
      {isLoggedIn ? <MainStack/> : <AuthStack setIsLoggedIn={setIsLoggedIn}/>} 
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TotalContainer: {
    flex: 1,
    backgroundColor: 'white',
  }
  ,
  menuContainer: {
    marginTop: 100,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',

  },
  bodyScreenContainer: {
    flex: 6,
    backgroundColor: 'white',
  }

});
