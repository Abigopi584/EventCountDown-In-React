import React from 'react';
import {connect} from 'react-redux';
import store from '../../configureStore.js';
import {resetState} from '../../../../actions/indexAction.js';



class Logout extends React.Component{
    constructor(props){
        super(props);
            this.state={
                isLoggedIn: this.props.isLoggedInStat
            }
    }

    componentDidMount(){
        this.props.resetState();
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
        resetState: () => dispatch(resetState())
    }
}

export default connect(null,mapDispatchToProps)(Logout);
