import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from '../SignUpScreen';
import LoginScreen from '../LoginScreen';
import UserProfile from '../UserProfile';
import FindPWScreen from '../FindPWScreen';
import LoginButton from '../LoginButton';
import React, { useState } from 'react';

const Stack = createNativeStackNavigator();

const AuthStack = ({ setIsLoggedIn }) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                options={{ title: '로그인' }}
                children={(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            />
            <Stack.Screen name="UserProfile" component={UserProfile} options={{ title: '회원정보 수정' }} />
            <Stack.Screen name="Signup" component={SignUpScreen} options={{ title: '회원가입' }} />
            <Stack.Screen name="FindPW" component={FindPWScreen} options={{ title: '비밀번호 찾기' }} />
        </Stack.Navigator>

    );

};

export default AuthStack;