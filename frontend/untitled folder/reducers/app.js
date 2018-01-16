// Reducer
// Reducers only update the State
import * as actionType from '../actionTypes/actionTypes';
import {REHYDRATE} from 'redux-persist/src/constants'

const app = (state = {
		drawer: false,
		loginError: '',
		loginDialog: {selectedValue: '', open: false},
	}, action) => {
		switch (action.type) {
			case actionType.SET_APP_STATE:
				return {
					...state,
					...action.data,
				}
			case actionType.CLEAR_APP_STATE:
				return {
					loginDialog: {},
					loginError: '',
					drawer: false,
				}
			case REHYDRATE:
				return {
					...state,
					loginError: '',
					drawer: false,
					// loginDialog: {selectedValue: '', open: false},
				}
			default:
				return state;
		}
}
export default app;
