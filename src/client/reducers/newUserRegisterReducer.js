import {
        REGISTER_NEW_USER_SUCCESS,
        REGISTER_NEW_USER_FAILED,
        REGISTER_NEW_USER_REQUEST,
        REGISTER_NEW_USER_IN_DB,
} from '../actions/indexAction.js'

// Initializing the state
const initialState = {
            userInfo:{},
            registerError: null,
            registerSuccess:null
           }

export default function RegisterUserInfo(state = initialState, action){

    switch (action.type){
        case REGISTER_NEW_USER_SUCCESS:
                return Object.assign({}, state,{
                    registerSuccess: action
                })


        case REGISTER_NEW_USER_FAILED:
            return Object.assign({}, state,{
                registerError: action.error
            })

        case REGISTER_NEW_USER_REQUEST:
            return Object.assign({}, state,{
                userInfo: action.userInfo
            })

        default:
            return state;
    }

}


