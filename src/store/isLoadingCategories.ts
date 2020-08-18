import { AnyAction } from 'redux';

const SET_IS_LOADING = 'SET_IS_LOADING';
const TEST = 'TEST'
export const setIsLoadingCategories = (loading: boolean) => ({ type: SET_IS_LOADING, payload: loading });

const initialState: boolean = false;


const reducer = (screen: boolean = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_IS_LOADING:
      return action.payload;
    default:
      return screen;
  }
};

export default reducer;