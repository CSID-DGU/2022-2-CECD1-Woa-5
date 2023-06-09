import React from "react-native";
import { Platform } from 'react-native';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const LoginButton = () => {
  return (
    <Button style={styles.buttonContainer}>
      <TouchableOpacity onPress={() => { navigation.navigate('LoginScreen', content) }}>
        <View style={styles.buttonText}>
          <Text >로그인</Text>
        </View>
      </TouchableOpacity>
    </Button>
  );
};


const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'lightgray',
    position: 'absolute', top: 20, right: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
    fontSize: 15,
    color: 'gray'
  },

})
export default LoginButton;