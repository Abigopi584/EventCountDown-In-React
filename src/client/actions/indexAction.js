import Request from 'superagent';
import history from '../../history.js';

// action creator for login
export function logInStatus(boolValue){

    return(dispatch) => {
        dispatch({
            type: IS_USER_LOGGED_IN,
            isLoggedIn:boolValue
        })
    }
}

// action creator to update login info in DB
export function updateLoginState(userLoginInfo){
    return (dispatch) =>{
        dispatch({
            type: UPDATE_LOGIN_STATE,
            userLoginInfo
        })
    }
}

//action creator for login check in DB
export function logInCheckInDB(userLoginInfo){
    return (dispatch) =>{
        Request
            .post('/login')
            .set('Content-Type', 'application/json')
            .accept('application/json')
            .send(userLoginInfo)
            .end(function(err,res){
                if(res.status ===  200){
                    let loginSuccess = true;
                    return dispatch (logInStatus(loginSuccess))
                }
                else {
                    let loginError = false;
                    return dispatch(logInStatus(loginError))
                }
            })
    }
}

// action creator for userDetails
export function registerUserInfoReq(userInfo){
    return(dispatch) => {
        return dispatch({
            type: REGISTER_NEW_USER_REQUEST,
            userInfo
        });
    }
}

export function registerUserSuccess(response){
    return(dispatch) => {
       dispatch({
            type: REGISTER_NEW_USER_SUCCESS,
            response
        });
        history.push('/login');

    }
}

export function registerUserFailed(error){
    return{
        error, type: REGISTER_NEW_USER_FAILED
    }
}

export function updateNewUserInDB(userInfo){
    return (dispatch,getState) =>{
        Request
            .post('/registerUser')
            .set('Content-Type', 'application/json')
            .accept('application/json')
            .send(getState().RegisterUserInfo.userInfo)
            .end(function(err,res){

                let responseSuccess =JSON.parse(res.text)
                if(res.status ===  200){
                    let registerSuccess = true;
                    return dispatch (registerUserSuccess(registerSuccess))
                }
                else {
                    let registerError = "duplicate username";
                    return dispatch(registerUserFailed(registerError))
                }
            })
    }
}

//action creator to update the events state with data from DB
export function updateEventState(eventsInfo){
    return (dispatch) => {
        dispatch({
            type: CHK_FOR_EVENTS,
            eventsInfo
        })
    }
}
// action creator to chk if there are events in DB for the user
export function fetchEvents(username){
    return(dispatch)=> {
        Request
            .post('/checkForEvents')
            .set('Content-Type', 'application/json')
            .accept('application/json')
            .send(username)
            .end((err, response) => {
                if(response.status == 200){
                    return dispatch(updateEventState(response.body))
                }
                else{
                    return dispatch(updateEventState(response.body))
                }

            })
    }
}

// action creator to update events in the db
export function updateEventsInDB(event){
    return(dispatch) =>{
        Request
            .post('/UpdateEventDB')
            .set('Content-Type','application/json')
            .accept('application/json')
            .send(event)
            .end((err, response) => {
                if(response.status == 200){
                    return dispatch(updateEventState(response.body))
                }
            })
    }
}




export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const IS_USER_LOGGED_IN = "IS_USER_LOGGED_IN";
export const REGISTER_NEW_USER_SUCCESS = 'REGISTER_NEW_USER_SUCCESS';
export const REGISTER_NEW_USER_FAILED = 'REGISTER_NEW_USER_FAILED';
export const REGISTER_NEW_USER_REQUEST = 'REGISTER_NEW_REQUEST';
export const REGISTER_NEW_USER_IN_DB = 'REGISTER_NEW_USER_IN_DB';
export const UPDATE_LOGIN_STATE = 'UPDATE_LOGIN_STATE';
export const CHK_FOR_EVENTS = 'CHK_FOR_EVENTS';