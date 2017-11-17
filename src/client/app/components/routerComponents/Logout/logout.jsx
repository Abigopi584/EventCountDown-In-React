import React from 'react';
import {connect} from 'react-redux';
import store from '../../configureStore.js';
import {logInStatus,resetState} from '../../../../actions/indexAction.js';



class Logout extends React.Component{
    constructor(props){
        super(props);
            this.state={
                isLoggedIn: this.props.isLoggedInStat
            }
    }

    componentDidMount(){
        const Store = store();
        const isLoggedOutStat = !this.state.isLoggedIn;
        this.props.updateLogInStat(isLoggedOutStat);
        this.props.history.push('/');

    }

    render(){
        return(
          <div>
          </div>
        )
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        updateLogInStat: (updateLogout) => dispatch(logInStatus(updateLogout))
    }
}

export default connect(null,mapDispatchToProps)(Logout);