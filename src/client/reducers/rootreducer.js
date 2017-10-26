import {combineReducers} from 'redux';
import RegisterUserInfo from '../reducers/newUserRegisterReducer.js'
import logInStatus from '../reducers/logInStatusReducer.js';
import updateLogInState from '../reducers/loginStateUpdateReducer.js';
import eventsFromDB from '../reducers/eventsFromDBReducer.jsx'

export default combineReducers({
    logInStatus,
    RegisterUserInfo,
    updateLogInState,
    eventsFromDB

})

