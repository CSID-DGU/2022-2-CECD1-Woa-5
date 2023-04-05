import 'react-native-get-random-values';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import MainPage from './MainPage';
// import PhonePage from './PhonePage';
// import CalendarPage from './CalendarPage';
import SignUpScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import UserProfile from './components/UserProfile';
import FindPWScreen from './components/FindPWScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        {/* <Stack.Screen name="Main" component={MainPage} options={{ headerShown: false }} /> */}
        <Stack.Screen name="Signup" component={SignUpScreen} options={{ title: '회원가입' }} />

        <Stack.Screen name="UserProfile" component={UserProfile} options={{ title: '회원정보 수정' }} />

        <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
        <Stack.Screen name="FindPW" component={FindPWScreen} options={{ title: '비밀번호 찾기' }} />
        {/* <Stack.Screen name="Phone" component={PhonePage} options={{ title: '전화' }} /> */}
        {/* <Stack.Screen name="Calendar" component={CalendarPage} options={{ title: '캘린더' }} /> */}
  </Stack.Navigator>
</NavigationContainer>
);
};

export default App;