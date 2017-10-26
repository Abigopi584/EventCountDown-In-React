

// action creator to set and get the login status

export function logInStatus(boolValue){
    return(dispatch) => {
        dispatch({
            type: IS_USER_LOGGED_IN,
            isLoggedIn:boolValue
        })
    }
}


export const IS_USER_LOGGED_IN = "IS_USER_LOGGED_IN";