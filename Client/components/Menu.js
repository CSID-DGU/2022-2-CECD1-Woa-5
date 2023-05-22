//import { Link } from 'expo-router';
//import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Call from './Call';

const Menu = ({navigation}) => (
    <View style={styles.headerContainer}>
        <Button title = "전화" onPress={()=> navigation.push('callScreen')}
            color = 'gray'>
            <Text style={styles.CallText}>
                전화
            </Text>
        </Button>
        <Text>    |   </Text>
        <Button  title = "캘린더" onPress={()=> navigation.push('calendarScreen')}
            color = 'gray'>
            <Text style={styles.CallText}>
                캘린더
            </Text>
        </Button>
   
    </View>
)


const styles = StyleSheet.create({
    headerContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',

    },
    CallText: {
        backgroundColor : 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
        margin:30,
        fontSize: 20,
        color: 'gray'
    },
})

export default Menu



// const Menu = ({navigation}) => (
//     <View style={styles.headerContainer}>
//         <Button title = "전화" onPress={()=> navigation.push('callScreen')}
//             color = 'gray'>
//             <Text style={styles.CallText}>
//                 전화
//             </Text>
//         </Button>
//         <Text>    |   </Text>
//         <Button  title = "캘린더" onPress={()=> console.log('calendar!')}
//             color = 'gray'>
//             <Text style={styles.CallText}>
//                 캘린더
//             </Text>
//         </Button>
//         <View //This is horizontal line between Menu and bodyScreen
//           style={{
//             width: '100%',
//             borderBottomColor: 'black',
//             borderBottomWidth: StyleSheet.hairlineWidth,
//           }}
//         />
//     </View>
// )