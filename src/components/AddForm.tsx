import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { convertDataToString } from '../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from './Picker';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { addNewTodoToBase } from '../store/async';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}
export const AddForm: React.FC<Props> = ({ navigation }: Props) => {
  const [title, setTitle] = useState('');
  const currentDate = new Date(Date.now());
  const currentPreparedDate = [currentDate.getDate(), currentDate.getMonth(),  currentDate.getFullYear(), ];
  const [deadline, setDeadline] = useState(currentPreparedDate);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const defaultCategory: string = navigation.state.params.category;
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const dateToShow = [deadline[0], deadline[1] + 1, deadline[2]]
  const dispatch = useDispatch();

  const pressHandler = () => {
    setIsCalendarVisible(true);
    setDeadline(deadline);
  }

  const onDateChange = (date: moment.Moment) => {
    setIsCalendarVisible(false);
    const dateArray = convertDataToString(date);
    setDeadline(dateArray.reverse());
  }

  const addNewTodo = () => {
    dispatch(addNewTodoToBase(title, deadline, currentPreparedDate, selectedCategory));
    setTitle('');
    navigation.goBack()
  }

  const handleCategoryPress = (title: string) => {
    setSelectedCategory(title);
  }

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Picker selectedCategory={selectedCategory} handleCategoryPress={handleCategoryPress} />
      <View style={styles.form}>
        <View style={styles.top}>
          <TextInput 
            keyboardType='default'
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            placeholder='Title of todo'
          />
          <TouchableOpacity style={styles.input}onPress={pressHandler}>
            <Text>{dateToShow.join(' / ')}</Text>
            <Image 
              style={styles.image}
              source={require('../../assets/images/calendar.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.calendar}>
          {
            isCalendarVisible && (
              <CalendarPicker 
                minDate={new Date(Date.now())}
                onDateChange={(date) => onDateChange(date)}
              />
            )
          }
        </View>
      </View>
      <TouchableOpacity onPress={addNewTodo}>
        <Image 
          style={styles.add}
          source={require('../../assets/images/addNew.png')}
        />
      </TouchableOpacity>
    </ScrollView>
  )
};

AddForm.navigationOptions = {
  headerTitle: 'Add new Todo'
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    padding: 15,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 20,
    height: 20,
  },
  form: {
    width: '100%'
  },
  top: {

  }, 
  calendar: {

  }, 
  add: {
    width: 50, 
    height: 50
  },
  wrapper: {
    alignItems: 'center', 
    width: '100%',
    paddingHorizontal: 30
  },
  buttonWrapper: {
    width: '100%'
  }
})
