// reducer that sets the user login status to true

import { IS_USER_LOGGED_IN} from '../actions/indexAction.js';

const initialState = {
    isLoggedIn :false
}

export default function logInStatus(state=initialState, action) {
    switch (action.type) {
        case IS_USER_LOGGED_IN:
            return Object.assign({}, state, {
                isLoggedIn: action.isLoggedIn
            });
        default:
            return state;

    }
}
