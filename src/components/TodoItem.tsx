import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { Todo } from '../interfaces';
import { changeCompleted } from '../store/todolist';
import { removeTodo, updateTodo } from '../store/async';
import { deleteTodo } from '../store/todolist';

interface Props {
  todo: Todo;
  selectTodo: (id: string) => (void);
}

export const TodoItem: React.FC<Props>= ({ todo, selectTodo }) => {
  const dispatch = useDispatch();
  const date = [todo.deadline[2], todo.deadline[1] + 1, todo.deadline[0]];
  const endDate: number = new Date(todo.deadline[0], todo.deadline[1], todo.deadline[2]).getTime();
  const dateNow: number = Date.now();
  const handlePressCheckbox = () => {
    dispatch(updateTodo(todo.id, !todo.completed, 'completed'));
    dispatch(changeCompleted(todo.id));
  }

  const handleLongPressTodo = () => {
    dispatch(deleteTodo(todo.id))
    dispatch(removeTodo(todo.id));
  }

  return (
    <TouchableOpacity 
      activeOpacity={0.7}
      onPress={() => selectTodo(todo.id)}
      onLongPress={handleLongPressTodo}
    >
      <View style={styles.todo}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.checkbox} onPress={handlePressCheckbox}>
            {
              todo.completed
                ? <Image style={styles.complication} source={require('../../assets/images/done.png')} />
                : <Image style={styles.complication} source={require('../../assets/images/notDone.png')} />
            }
          
          </TouchableOpacity>
        <Text style={styles.title}>{todo.title}</Text>
        </View>
        <Text style={dateNow > endDate ? styles.overdue : styles.date}>{date.join(' / ')}</Text>
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  todo: {
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
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  checkbox: {
    marginRight: 15,
  }, 
  complication: {
    width: 20,
    height: 20,
  }, 
  title: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 14,
    fontStyle: 'italic',
  }, 
  overdue: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'red'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%'
  }
});