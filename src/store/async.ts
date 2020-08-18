import { isLoading } from "expo-font";
import { DATA_BASE_URL } from "../constants";
import { addCategory, setCategories } from "./categories";
import { setIsError } from "./isError";
import { setIsLoading } from "./isLoadingTodos";
import { addTodo, setTodos } from "./todolist";

export const loadCategoriesFromDataBase = () => {
  return async function(dispatch: any) {
    dispatch(setIsLoading(true));
    dispatch(setIsError(false));
    try { 
      const response = await fetch(`https://todo-app-c689d.firebaseio.com/categories.json`, 
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        }
      );
      const data = await response.json();

      if (data) {
        const categories = await Object.keys(data).map(key => ({...data[key], id: key}));
        dispatch(setCategories([...categories]));
      }
    }
    catch(e) {
      dispatch(setIsError(true));
    }
    finally {
      dispatch(setIsLoading(false));
    }
  }
}


export const removeCategoryFromBase = (id: string) => {
  return async function(dispatch: any) {
    dispatch(setIsError(false));
    try { 
      await fetch(`https://todo-app-c689d.firebaseio.com/categories/${id}.json`, 
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
        }
      )
    }
    catch(e) {
      dispatch(setIsError(true));
    }
  }
}

export const addNewCategory = (category: string) => {

  return async function(dispatch: any) {
    const response = await fetch (`${DATA_BASE_URL}categories.json`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title: category, image: require(`../../assets/images/All.png`)  })
    })
    const data = await response.json();
    dispatch(addCategory(category, data.name));
  }
}

export const loadTodosFromDataBase = () => {
  return async function(dispatch: any) {
    dispatch(setIsLoading(true));
    dispatch(setIsError(false));
    try { 
      const response = await fetch(`https://todo-app-c689d.firebaseio.com/todosList.json`, 
        {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        }
      );
      const data = await response.json();

      if (data) {
        const todos = await Object.keys(data).map(key => ({...data[key], id: key}));
        dispatch(setTodos([...todos]));
      }
    }
    catch(e) {
      dispatch(setIsError(true));
    }
    finally {
      dispatch(setIsLoading(false));
    }
  }
}

export const updateTodo = (id: string, value: string | number[] | boolean, field: string) => {

  return async function(dispatch: any) {
      let fieldTitleToUpdate = field;
      dispatch(setIsError(false));
      try { 
        await fetch(`https://todo-app-c689d.firebaseio.com/todosList/${id}.json`, 
          {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ [fieldTitleToUpdate]: value })
          }
        )
      }
      catch(e) {
        dispatch(setIsError(true));
      }
  }
}

export const removeTodo = (id: string) => {
  return async function(dispatch: any) {
    dispatch(setIsError(false));
    try { 
      await fetch(`https://todo-app-c689d.firebaseio.com/todosList/${id}.json`, 
        {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
        }
      )
    }
    catch(e) {
      dispatch(setIsError(true));
    }
  }
}

export const addNewTodoToBase = (title: string, deadline: number[],currentPreparedDate: number[], selectedCategory: string ) => {

  return async function(dispatch: any) {
    const todoNew = {
      title: title,
      deadline: deadline.reverse(),
      startDate: currentPreparedDate.reverse(),
      category: selectedCategory,
      completed: false,
    };
    const response = await fetch (`${DATA_BASE_URL}todosList.json`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ ...todoNew })
    })
    const data = await response.json();
    dispatch(addTodo(todoNew, data.name));
  }
}