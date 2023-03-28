import React from "react";
import { View, StyleSheet, Text } from 'react-native'

const Header = () => {
    return (
        <View style={styles.header}>
        <Text style={styles.headerText}>와</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        width:'100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 40,
        marginBottom: 40,
    },
    headerText: {
      fontWeight: 'bold',
      fontSize: 30,
      textAlign: 'center',
      
    },
});

export default Header;