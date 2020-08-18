import { AnyAction } from 'redux';
import { Category } from '../interfaces';

const ADD_CATEGORY = 'ADD_CATEGORY';
const REMOVE_CATEGORY = 'REMOVE_CATEGORY';
const SET_CATEGORIES = 'SET_CATEGORIES';

export const addCategory = (category: string, id: string) => ({ type: ADD_CATEGORY, payload: category, id: id });
export const removeCategory = (id: string) => ({ type: REMOVE_CATEGORY, payload: id });
export const setCategories = (categories: Category[]) => ({ type: SET_CATEGORIES, payload: categories})


const reducer = (categories: Category[] = [], action: AnyAction) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload
    case ADD_CATEGORY:
      return [
        ...categories,
        {
          title: action.payload,
          id: action.id
        }
      ]
    case REMOVE_CATEGORY: 
      return categories.filter(category => category.id !== action.payload)

    default:
      return categories;
  }
};

export default reducer;