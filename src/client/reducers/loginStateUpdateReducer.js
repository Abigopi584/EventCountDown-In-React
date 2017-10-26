import {UPDATE_LOGIN_STATE} from '../actions/indexAction.js';

// Initializing the state

const initialState = {
   username:'',
    password:''
}
export default function updateLogInState(state=initialState, action){
    switch (action.type){
        case UPDATE_LOGIN_STATE:
            return Object.assign({}, state,{
                username: action.userLoginInfo.username,
                password: action.userLoginInfo.password
            })

        default:
           return  state
    }
}

