import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../../components/SignUpScreen';
import LoginScreen from '../../components/LoginScreen';
import UserProfile from '../../components/UserProfile';
import FindPWScreen from '../../components/FindPWScreen';
import LoginButton from '../LoginButton';
import React, { useState } from 'react';

const Stack = createNativeStackNavigator();

const AuthStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: '로그인' }} />
            <Stack.Screen name="UserProfile" component={UserProfile} options={{ title: '회원정보 수정' }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{ title: '회원가입' }} />
            <Stack.Screen name="FindPW" component={FindPWScreen} options={{ title: '비밀번호 찾기' }} />
        </Stack.Navigator>

    );

};

export default AuthStack;