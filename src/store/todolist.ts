
import { AnyAction } from 'redux';
import { Todo, TodoWithoutId } from '../interfaces';

const SET_TODOS_ALL = 'SET_TODOS_ALL';
const CHANGE_COMPLETED = 'CHANGE_COMPLETED';
const CHANGE_DEADLINE = 'CHANGE_DEADLINE';
const ADD_TODO = 'ADD_TODO';
const DELETE_TODO = 'DELETE_TODO';
const CHANGE_TITLE = 'CHANGE_TITLE';

export const setTodos = (todos: Todo[]) => ({ type: SET_TODOS_ALL, payload: todos });
export const addTodo = (todo: TodoWithoutId, id: string) => ({ type: ADD_TODO, payload: todo, id: id });
export const changeCompleted = (id: string) => ({ type: CHANGE_COMPLETED, payload: id });
export const changeDeadline = (id: string, date: number[]) => ({ type: CHANGE_DEADLINE, payload: id, date: date });
export const deleteTodo = (id: string) => ({ type: DELETE_TODO, payload: id });
export const changeTitle = (id: string, value: string) => ({ type: CHANGE_TITLE, payload: id, value: value });

const reducer = (todos: Todo[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_TODOS_ALL:
      return [...action.payload];
    case CHANGE_COMPLETED:
      const changedList = todos.map(todo => {
        if ( todo.id === action.payload) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
      return  changedList;
    case CHANGE_DEADLINE:
      return  (todos.map(todo => {
        if ( todo.id === action.payload) {
          return {
            ...todo,
            deadline: action.date
          }
        }
        return todo;
      }));
    case CHANGE_TITLE:
      const todoList = todos.map(todo => {
        if ( todo.id === action.payload) {
          return {
            ...todo,
            title: action.value
           
          }
        }
        return todo;
      })
      return  todoList;
    case ADD_TODO:
      return [...todos, {...action.payload, id: action.id }]
    case DELETE_TODO: 
    console.log('remove')
      return todos.filter(todo => todo.id !== action.payload)
    default:
      return todos;
  }
};

export default reducer;
