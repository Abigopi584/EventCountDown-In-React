import Request from 'superagent';
import history from '../../history.js';

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


export const REGISTER_NEW_USER_SUCCESS = 'REGISTER_NEW_USER_SUCCESS';
export const REGISTER_NEW_USER_FAILED = 'REGISTER_NEW_USER_FAILED';
export const REGISTER_NEW_USER_REQUEST = 'REGISTER_NEW_REQUEST';
export const REGISTER_NEW_USER_IN_DB = 'REGISTER_NEW_USER_IN_DB';
