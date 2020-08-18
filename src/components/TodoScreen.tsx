import React, { useState } from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Todo } from '../interfaces';
import { getTodos } from '../store';
import { changeDeadline, changeTitle } from '../store/todolist';
import CalendarPicker from 'react-native-calendar-picker';
import { convertDataToString } from '../helpers';
import { updateTodo } from '../store/async';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

export const TodoScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { activeId } = navigation.state.params;
  const todos: Todo[] = useSelector(getTodos);
  const activeTodo: Todo = todos.find(todo => todo.id === activeId);
  const dispatch = useDispatch();
  const [isVisibleCalendar, setIsVisibleCalendar] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState<string>(activeTodo.title);
  
  const endDate: number = new Date(activeTodo.deadline[0], activeTodo.deadline[1], activeTodo.deadline[2]).getTime();
  const dateNow: number = Date.now();
  const daysLeft = Math.floor((endDate - dateNow) / 3600000 / 24);
  const hoursLeft = Math.round((endDate - dateNow) / 3600000 - daysLeft  * 24);
  const deadline = `${activeTodo.deadline[2]}.${activeTodo.deadline[1] + 1}.${activeTodo.deadline[0]} `;
  
  const onDateChange = async (date: moment.Moment) => {
    const dateArray = convertDataToString(date);
    setIsVisibleCalendar(false);
    dispatch(changeDeadline(activeTodo.id, dateArray));
    await dispatch(updateTodo(activeTodo.id, dateArray, 'deadline'));
  }

  const saveUpdate = async () => {
    setInputValue(inputValue);
    dispatch(changeTitle(activeTodo.id, inputValue))
    await dispatch(updateTodo(activeTodo.id, inputValue, 'title'));
    setIsInputVisible(false);
    navigation.navigate('TodoList', {category: activeTodo.category})
  }

  const saveEdit = () => {
    Alert.alert(
      'Confirmation',
      `Are you sure that you want to rename ${activeTodo.title} to ${inputValue}`,
      [
        {
          text: 'Rename',
          onPress: saveUpdate
        },
        {
          text: 'Cancel',
          style: 'cancel'
        },
      ],
      { cancelable: true }
    )
  }
  
  return (
    <ScrollView style={styles.container}>
      {
        isInputVisible
        ? (
          <View style={styles.inputWrapper}>
            <TextInput 
              style={styles.input}
              value={inputValue}
              placeholder='Enter new title'
              onChangeText={(text) => setInputValue(text)}
            />
          </View>
        )
        : (
          <View style={styles.todo}>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{activeTodo.title}</Text>
            </View>
            <TouchableOpacity onPress={() => setIsInputVisible(true)}>
              <Image style={styles.image} source={require('../../assets/images/edit.png')}/>
            </TouchableOpacity>
          </View>
        )
      }
      <TouchableOpacity>
        <View style={styles.field}>
            <Text style={styles.text}>Category</Text>
            <Text style={styles.text}>{activeTodo.category}</Text>
        </View>
      </TouchableOpacity>
      {
        !activeTodo.completed
        ? (
          <>
            <TouchableOpacity>
              <View style={styles.field}>
                  <Text style={styles.text}>Time to deadline</Text>
                  <Text style={styles.text}>{`${daysLeft} days ${hoursLeft} hours`}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsVisibleCalendar(true)}>
            <View style={styles.field}>
                <Text style={styles.text}>Date deadline</Text>
                <Text style={styles.text}>{deadline}</Text>
            </View>
            {
              isVisibleCalendar &&  (
                <CalendarPicker
                  minDate={new Date(Date.now())}
                  onDateChange={(date) => onDateChange(date)}
                />
              )  
            }
            <TouchableOpacity style={styles.add} onPress={saveEdit}>
              <Image style={styles.imageAdd}source={require('../../assets/images/addNew.png')}/>
            </TouchableOpacity>
            </TouchableOpacity> 
          </>
        )
        : (
          <View style={styles.completed}>
            <Text style={styles.completedText}>You have already finished this task</Text>
            <Image 
              source={require('../../assets/images/todoDone.png')}
            />
          </View>
        )
      }
    </ScrollView>
  )
};

TodoScreen.navigationOptions = {
  headerTitle: 'Todo'
}

const styles = StyleSheet.create({
  field: {
    fontFamily: 'source-code-bolder',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F2F2F2',
    marginBottom: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  title: {
    fontSize: 20,
    fontFamily: 'source-code-bolder',
  }, 
  text: {
    fontFamily: 'source-code-bolder',
  }, 
  completed: {
    alignItems: 'center'
  },
  completedText: {
    fontSize: 20,
    fontFamily: 'source-code-bolder',
    marginVertical: 10,
  }, 
  todo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20
  }, 
  image: {
    width: 20,
    height: 20,
  }, 
  titleWrapper: {
    width: '80%'
  }, 
  input: {
    backgroundColor: 'white',
    width: '80%', 
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  }, 
  inputWrapper: {
    width: '100%',
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center'
  },
  container: {
    paddingHorizontal: 30
  }, 
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  }, 
  imageAdd: {
    width: 50,
    height: 50,
  }
})
