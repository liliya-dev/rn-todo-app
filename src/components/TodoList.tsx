import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image,ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Todo } from '../interfaces';
import { getIsError, getIsLoading, getTodos } from '../store';
import { TodoItem } from './TodoItem';
import Navigation from './Navigation';
import { calculateFilteredTodos } from '../helpers';
import { Sorter } from './Sorter';
import { Loader } from './Loader';
import { ErrorComponent } from './ErrorComponent';
import { setIsError } from '../store/isError';
import { loadTodosFromDataBase } from '../store/async';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState
} from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
}


export const TodoList: React.FC<Props> = ({ navigation }) => {
  const category = navigation.state.params.category;
  const todosFromServer: Todo[] = useSelector(getTodos);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todosFromServer)
  const [option, setOption] = useState('unfinished');
  const [sortBy, setSortBy] = useState('by date of create');
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const isError = useSelector(getIsError);

  useEffect(() => {
    const filteredTodos = calculateFilteredTodos(todosFromServer, category, option, sortBy);
    setVisibleTodos(filteredTodos);
  }, [todosFromServer, category, option, sortBy, isLoading, isError]);

  const changeVisible = (option: string) => {
    setOption(option);
  }

  const onSort = (sortOption: string) => {
    setSortBy(sortOption);
  }

  const selectTodo = (id: string) => {
    navigation.navigate('Todo', {activeId: id })
  }

  const defineComponent = (isErr: boolean, isLoading: boolean) => {
    if (isErr) {
      return (
        <ErrorComponent 
          tryToReload={() => {
            dispatch(setIsError(false)); 
            dispatch(loadTodosFromDataBase());
          }}
        />
      )
    }
    return (
      isLoading && !isErr
        ? <Loader />
        : (
          visibleTodos && visibleTodos.length
          ? visibleTodos.map((todo) => <TodoItem key={todo.id} todo={todo} selectTodo={selectTodo}/>)
          : <Text style={styles.generalText}>You don't have todos in this category</Text>
        )
    )
  }

  const component = defineComponent(isError, isLoading);

  const addNewTodo = () => {
    navigation.navigate('AddForm', {category})
  }

  return (
    <ScrollView style={styles.container}> 
      <View style={styles.header}>
        <Text style={{...styles.generalText,...styles.text}}>{category}</Text>
        <TouchableOpacity onPress={addNewTodo}>
          <Image 
            style={styles.image}
            source={require('../../assets/images/addTodo.png')}
          />
        </TouchableOpacity>
      </View>
      <Sorter onSort={onSort} sortBy={sortBy} />
      <Navigation changeVisible={changeVisible} />
      {component}
    </ScrollView>
  )
}


TodoList.navigationOptions = {
  headerTitle: 'Your List of Todos'
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: 70,
    paddingHorizontal: 20
  },
  image: {
    width: 40,
    height: 40,
  }, 
  text: {
    fontSize: 28,
    color: '#3ab37c'
  },
  generalText: {
    fontSize: 16,
    fontFamily: 'lemonada',
    textAlign: 'center',
  },
  container: {
    padding: 20,
  }
})