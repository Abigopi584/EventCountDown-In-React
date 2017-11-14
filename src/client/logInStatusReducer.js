// reducer that sets the user login status to true

import { IS_USER_LOGGED_IN,UPDATE_LOGIN_STATE, RESET_STATE} from '../actions/indexAction.js';

const initialState = {
    isLoggedIn :false,
    userInfo: {
        username:'',
        password:''
    }
}

export default function logInStatus(state=initialState, action) {
    switch (action.type) {
        case IS_USER_LOGGED_IN:
            return Object.assign({}, state, {
                isLoggedIn: action.isLoggedIn
            });

        case UPDATE_LOGIN_STATE:
            return Object.assign({}, state, {
                userInfo: {
                    username: action.userLoginInfo.username,
                    password: action.userLoginInfo.password
                }
            })

        default:
            return state;

    }
}
