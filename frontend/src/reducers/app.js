// Reducer
import * as actionType from '../actionTypes/actionTypes';
import {REHYDRATE} from 'redux-persist/src/constants'

const app = (state = {
  test: '',
}, action) => {
  switch (action.type) {
    case actionType.SET_TEST:
      return {
        ...state,
        test: action.data.test,
      }
    case REHYDRATE:
      return {
        ...state,
        test: '',

      }
      
    default:
      return state;
  }
}

export default app;
