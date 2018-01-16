//Actions
import * as actionType from '../actionTypes/actionTypes';

// APP Actions
export const setTest = (data) => {
  return {
    type: actionType.SET_TEST,
    data
  }
}