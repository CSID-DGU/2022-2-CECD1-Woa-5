//import { Link } from 'expo-router';
import * as Linking from 'expo-linking';
import React, { useState, useEffect } from 'react';
import { Platform, FlatList } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';

const Call = () => {

    const phoneNumbers = [  // 전화번호 리스트 데이터
        { id: 1, name: '김김김', phone: '010-9342-1843' },
        { id: 2, name: '이이이', phone: '010-9572-1934' },
        { id: 3, name: '박박박', phone: '010-6139-5432' },
        { id: 4, name: '심심심', phone: '010-4282-1739' },
    ];


    const callNumber = (phoneNumber) => { // 전화 거는 함수
        let phoneNumberWithPrefix = '';
        if (Platform.OS === 'android') {
            phoneNumberWithPrefix = `tel:${phoneNumber}`;
        } else {
            phoneNumberWithPrefix = `telprompt:${phoneNumber}`;
        }
        Linking.openURL(phoneNumberWithPrefix);
    }

    const [content, setContent] = useState(''); //버튼 선택되었는지 여부

    const handleClickButton = (selectedphone) => { // 버튼 선택시 Content state값에 선택된 target phonenumber 저장
        setContent(selectedphone);
        console.log(content); //content 값 변경되었는지 알아보려고 임시로 찍게 함
    };

    const renderItem = ({ item }) => (  //  렌더링
        <View style={styles.listStyle}>
            <TouchableOpacity key={item.id}
                onPress={() => { handleClickButton(item.phone) }} keyExtractor={(item) => item.id.toString()}>
                <View>
                    <Text>ID : {item.id}</Text>
                    <Text>성명 : {item.name}</Text>
                    <Text>번호 : {item.phone}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => callNumber(content)}>
                <Image
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        overflow: 'hidden',
                    }}
                    source={require('../assets/phone_icon.png')}
                />
                <Text>전화 버튼</Text>
            </TouchableOpacity>

            <FlatList style={styles.flatlistStyle} data={phoneNumbers} renderItem={renderItem}>
            </FlatList>


        </View>
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 20,
        backgroundColor: 'white',
        marginTop: '0px',
    },
    bodyText: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20,
        fontSize: 10,
        color: 'black'
    },
    flatlistStyle: {
        paddingRight: 20,
        paddingVertical: 10,
    },
    listStyle: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray'
    }
})

export default Call