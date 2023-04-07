import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Heading = () => (
    <View style={styles.container}>
        <Text style={styles.headerText}>
            와
        </Text>
    </View>
)
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection :'row'
      },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop:20,
        fontSize: 30,
        color: 'black'
    },
    headerContainer:{
        flex :1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
     
    },
})

export default Heading


