import { Platform } from 'react-native'; //추후 플랫폼 통일시 필요
import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar, CalendarList } from "react-native-calendars";
//import 'react-calendar/dist/Calendar.css'; 현재 오류떠서 삭제함.

import plant from '../assets/plant.PNG';
import watering from '../assets/watering.PNG';

const CalendarPage = () => {
  const [selected, setSelected] = useState('');

 

  function extractDatesFromData(data) {
    const dates = data.map(item => item.date);
    return dates;
  }





  useEffect(() => {
    console.log('when it start first');
  }) // 없어도 됨
  /////////////////////////////////////////////////////////////
  const markedDates = {
    '2023-05-15': { selected: true, color: 'skyblue' },
    '2023-05-22': { selected: true, color: 'skyblue' },
    '2023-05-27': { selected: true, color: 'skyblue' },
    '2023-06-01': { selected: true, color: 'skyblue' },
    '2023-06-05': { selected: true, color: 'skyblue' },
    '2023-06-09': { selected: true, color: 'skyblue' },
    '2023-06-13': { selected: true, color: 'skyblue' },
    //'2023-03-10': { marked: true, color : 'skyblue' },
    //'2023-03-26': { selected: true , selectedColor: 'red'},
  }
  //markedDates={markedDates}
  /*
   onDayPress={day => {
            console.log('selected day', day);
          }}
            markedDates={markedDates}
  */
  /*
  markedDates={{
   [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'blue' }
 }}
 theme = {styles.bodyStyle}
  */
  return (
    <View style={styles.calendarContainer}>
      <div sylte={styles.titleContainer}>
        <img src={plant} style={styles.image} alt="plant" />
        <Text style={styles.headerText}>식물에 물은 잘 주고 계신가요?</Text>
        <img src={watering} style={styles.image} alt="watering" />
      </div>
      
      <Calendar style={styles.calendar}
        onDayPress={day => {
          setSelected(day.dateString);
        }}
        markedDates={markedDates}
        markingType={'period'}
        theme={{
          'stylesheet.calendar.main': {
            dayContainer: {
              borderColor: '#D1D3D4',
              borderWidth: 1,
              flex: 1,
              padding: 10,
            },
            emptyDayContainer: {
              borderColor: '#D1D3D4',
              borderWidth: 1,
              flex: 1,
              padding: 10
            },
            week: {
              marginTop: 0,
              marginBottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-around'
            },
          },
          textMonthFontSize: 30,
          todayTextColor: 'orange',
          selectedDayBackgroundColor: 'skyblue',
          arrowColor: 'yellowgreen',
        }}

      />
    </View>
  );
}


const styles = StyleSheet.create({
  calendarContainer:{
    backgroundColor: 'white',
    height: '100%',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image:{
    width: '30px',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
  },

  bodyStyle: {
    selectedDayBackgroundColor: 'red',
    arrowColor: 'blue',
    dotColor: 'green',
    todayTextColor: 'orange',
    textMonthFontSize: 30,

  },
  calendar: {
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: 450,
  },
  headerText: {
    textAlign: 'left',
    fontWeight: 'bold',
    padding: 15,
    fontSize: 20,
    color: 'black',
    marginHorizontal: 'auto',
    borderBottomWidth: '2px',
    borderBottomColor: 'yellowgreen',
  },
})

export default CalendarPage
