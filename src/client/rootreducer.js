import {combineReducers} from 'redux';
import RegisterUserInfo from '../reducers/newUserRegisterReducer.js'
import logInStatus from '../reducers/logInStatusReducer.js';
import eventsFromDB from '../reducers/eventsFromDBReducer.jsx'

export default combineReducers({
    logInStatus,
    RegisterUserInfo,
    eventsFromDB

})
