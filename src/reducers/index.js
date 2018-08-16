import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { user } from './authReducers'
const reducers = {
  form: formReducer,
  user
}
const allReducers = combineReducers(reducers);
export default allReducers;