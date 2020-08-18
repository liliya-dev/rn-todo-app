import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import todosReducer, { setTodos } from './todolist';
import categoriesReducer from './categories';
import loadingReducer, { setIsLoading } from './isLoadingTodos';
import errorReducer, { setIsError } from './isError';

const rootReducer = combineReducers({
  todos: todosReducer,
  categories: categoriesReducer,
  isLoading: loadingReducer,
  isError: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const getTodos = (state: RootState) => state.todos;
export const getCategories = (state: RootState) => state.categories;
export const getIsLoading = (state: RootState) => state.isLoading;
export const getIsError = (state: RootState) => state.isError;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
