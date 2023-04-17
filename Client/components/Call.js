//import { Link } from 'expo-router';
import * as Linking from 'expo-linking';
import React, { useState, useEffect } from 'react';
import { Platform, FlatList } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'react-native';
//전화 아이콘 파일 라이센스 : 사용시(예를 들어 웹문서 작성 등) 반드시 출처를 표시해야 한다.

//////////////////////////////////////////////////////////////////////////////////
const Call = () => {
    // const [contactData, setContactData] = useState([]); //서버에서 전화번호 가져올 부분

    // const getContactData = async () => {

    //     try {
    //         const response = await fetch('http://ec2-43-200-5-132.ap-northeast-2.compute.amazonaws.com:3000/', {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 id,
    //                 name,
    //                 phone,
    //             }),
    //         });
    //         setContactData(response);


    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     getContactData();
    // }, []);


    ///////////////////////////////

    const phoneNumbers = [  // 전화번호 리스트 데이터
        { id: 1, name: 'Kim', phone: '010-1234-1237' },
        { id: 2, name: 'Lee', phone: '010-9999-5432' },
        { id: 3, name: 'Park', phone: '010-6666-5432' },
        { id: 4, name: 'Jung', phone: '010-4444-5432' },
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
                    source={require('/Users/kimdanha/Documents/reactnative/WoaProject/woa/assets/phone_icon.png')}
                />
                <Text>전화 버튼</Text>
            </TouchableOpacity>


            {/* <View>
                {phoneNumbers.map((item) => (
                    <TouchableOpacity key={item.phone} onPress={() => callNumber(item.phone)}>
                    </TouchableOpacity>
                ))}
            </View> */}

            <FlatList style={styles.flatlistStyle} data={phoneNumbers} renderItem={renderItem}>
            </FlatList>


        </View>
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20
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
    },
    listStyle: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'gray'
    }
})

export default Call

//   <FlatList style={styles.flatlistStyle} data={phoneNumbers} renderItem={renderItem}></FlatList>


/*
const getContactData = async () => {
    //Fetch data: contact list generating. 서버로부터 데이터 받아오는
       try {
         const response = await fetch('서버 URL');
         const requestOptions = {
           method: 'GET',
           redirect: 'follow'
         };
   
         const data = await response.json();
         const ContactList = []; // ContactList 배열에 infoList객체들 넣기 (data의 정보값들 넣어진)
         for (const key in data) {
           ContactList.push(
             new infoList(
               data[key].id,
               data[key].name,
               data[key].phone
             )
           );
         }
       } 
       
    catch (error) {
         console.error(error);
       }
     }
     */


/*

<FlatList
           data={contactData}
           keyExtractor={({ id }) => id}
           renderItem={({ item }) => (
               <Text>
                   this is {item.name},
               </Text>
           )}
       />
*/



{/* <View style={styles.container}>
                {phoneNumbers.map((item) => (
                    <TouchableOpacity key={item.phone} onPress={() => callNumber(item.phone)}>
                        <View>
                            <Text>성명 : {item.name}</Text>
                            <Text>번호 : {item.phone}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View> */}