import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';

const Menu = ({navigation}) => (
    <View style={styles.buttonsContainer}>
        <Button title = "전화걸기" onPress={()=> navigation.push('callScreen')}
            type='outline'
            titleStyle={{
                marginHorizontal: 5, 
                fontSize:30,
            }}
            containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
            }}>
        </Button>
        <Text>    ㅡ   </Text>
        <Button  title = "캘린더 확인" onPress={()=> navigation.push('calendarScreen')}
            type="outline"
            titleStyle={{
                marginHorizontal: 5, 
                fontSize:30,
            }}
            containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
            }}>
        </Button>
   
    </View>
)


const styles = StyleSheet.create({
    headerContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column',

    },
    buttonsContainer: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        width: '100%',
        marginVertical: 20,
        backgroundColor: 'white',
        marginTop: '0px',
        height: '100%',
        paddingTop: '30px',
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