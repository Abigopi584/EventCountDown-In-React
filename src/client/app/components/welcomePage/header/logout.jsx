import React from 'react';
import {connect} from 'react-redux';
import {logInStatus} from '../../../../actions/indexAction.js';

class Logout extends React.Component{
    constructor(props){
        super(props);
            this.state={
                isLoggedIn: this.props.isLoggedInStat
            }
    }

    logoutSuccess(){
        console.log('this.state.isLoggedIn ' + this.state.isLoggedIn);
        const isLoggedOutStat = !this.state.isLoggedIn;
        console.log('isLoggedOutStat '+ isLoggedOutStat);
        this.props.updateLogInStat(isLoggedOutStat);
    }

    render(){
        return(
          <p>
              {this.logoutSuccess()}
          </p>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        updateLogInStat: (updateLogout) => dispatch(logInStatus(updateLogout))
    }
}

export default connect(null,mapDispatchToProps)(Logout);