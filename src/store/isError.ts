import { AnyAction } from 'redux';

const SET_IS_ERROR = 'SET_IS_ERROR';

export const setIsError = (error: boolean) => ({ type: SET_IS_ERROR, payload: error });

const initialState: boolean = false;


const reducer = (screen: boolean = initialState, action: AnyAction) => {
  switch (action.type) {
    case SET_IS_ERROR:
      return action.payload;

    default:
      return screen;
  }
};

export default reducer;