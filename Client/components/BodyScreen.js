import { Platform } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarPage from './CalendarPage';
/*
export default function BodyScreen() {
    const [value, setValue] = useState(1);

    const changeLink = (id) => {
        setValue(id);
      };

    if (th.State === true) {
        return (
            <View style={styles.container}>
                <Text style={styles.bodyText}>
                    프레임 구역 : 여기에 사용자 기능 화면 로딩
                    //리액트 랑은 달리 Link 태그 적용이 안된다. Navagation 더 공부할것.
                    <Link onPress={(props) => console.log(props)} href="/Calendar"></Link>
                    <View >
                // 만약 사용자가 전화 기능 누르면 전화창 표시,<br />


                // 메뉴 컴포넌트 UseState로 State 변경 시 BodyScreen으로 값 전달하여 조건부 렌더링
                    </View>
                </Text>
            </View>
        )
    }
    else {
        return (
            <View>
                // 캘린더 누르면 캘린더 기능 표시.<br />
            </View>
        )
    }
}
*/

//실제 작동하는 것
const BodyScreen = ({navigation}) => {
    console.log("This is BodyScreen");
    navigation.navigate('CalendarPage');
    <View style={styles.container}>
        <Text style={styles.bodyText}>
            프레임 구역 : 여기에 사용자 기능 화면 로딩
        // 만약 사용자가 전화 기능 누르면 전화창 표시,
        // 캘린더 누르면 캘린더 기능 표시.
        // main파일의 메뉴 컴포넌트 State 변경 시 BodyScreen으로 값 전달하여 조건부 렌더링
        </Text>
    </View>
}


export default BodyScreen;

/*
const BodyScreen= () => {
    return (
      <div>
        <Link path="/" exact={true} component={Home} />
        <Link path="/about" component={About} />
      </div>
    );
  };
export BodyScreen;

*/

const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bodyText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
        fontSize: 20,
        color: 'black'

    },
})



