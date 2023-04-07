import { Platform } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Heading from './Heading';
import Menu from './Menu';

//실제 작동하는 것
const Top = () => {
    console.log("This is Top");
    <View style={styles.container}>
        <View style={styles.menuContainer}>
            <Heading></Heading>
            <Menu></Menu>
        </View>

        <View style={styles.bodyScreenContainer} >
            <Text>under construction</Text>
        </View>
    </View>
}


export default Top;

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



