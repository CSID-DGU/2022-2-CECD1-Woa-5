import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import Heading from '../../components/Heading';
import HorizonLine from '../../components/HorizontalLine';
import { ScrollView } from 'react-native-gesture-handler';
import LoginButton from '../../components/LoginButton';
import Menu from '../../components/Menu';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BodyScreen from '../../components/BodyScreen';
import CalendarPage from '../../components/CalendarPage';
import { useState } from 'react';

//<BodyScreen></BodyScreen>
//<CalendarPage></CalendarPage>
export default function TabMainScreen() {
  const [value, setValue] = useState(0);
  
  return ( //화면 분할 좀 할것. Horizontal line 기준으로 상하 분리
    <View style={styles.TotalContainer}>
      <View style={styles.menuContainer}>
        <LoginButton/>
        <Heading></Heading>
        <Menu></Menu>
        <HorizonLine></HorizonLine>
      </View>

      <View style={styles.bodyScreenContainer}>
        <BodyScreen></BodyScreen>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TotalContainer : {
    flex : 1,
    backgroundColor : 'white',
  }
  ,
  menuContainer: {
    flex : 1,
    backgroundColor: 'white',
    height : '100%',
    alignItems: 'center', 

  },

  bodyScreenContainer : {
    flex : 2,
    backgroundColor : 'white',
  }

});
