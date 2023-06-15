import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarPage from '../CalendarPage';
import Call from '../Call';
import Menu from '../Menu';
import Heading from '../Heading';
import HorizonLine from '../HorizonLine';
import LoginButton from '../LoginButton';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator();

const MainStack = (props) => {
    return (
        <Stack.Navigator style={styles.stackContainer}>
            {/* <Stack.Screen name='heading' component={Heading} options={{ title: 'wow' }} /> */}
            <Stack.Screen name='menuScreen' component={Menu} options={{ title: '메인' }} />
            <Stack.Screen name='lineScreen' component={HorizonLine}/>
            <Stack.Screen name='callScreen' component={Call} />
            <Stack.Screen name='loginbutton' component={LoginButton} />
            <Stack.Screen name='calendarScreen' component={CalendarPage} />
            
        </Stack.Navigator>

    );

};

const styles = StyleSheet.create({
    stackContainer : {
        color: 'white',
    },
});


export default MainStack;