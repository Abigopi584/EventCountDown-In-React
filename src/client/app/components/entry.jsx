import React from 'react';
import {connect} from 'react-redux';
import Main from './mainPage.jsx';

 class Entry extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isLoggedIn: this.props.isLoggedIn,
            username:''
        }

    }
    componentWillReceiveProps(nextProps){
            this.setState({
                isLoggedIn: nextProps.isLoggedIn,
                username:nextProps.username
            })

    }

    render(){
        const h2style={
            padding: "10px",
            fontFamily:" Comic Sans MS",
            textAlign: "center"
        }
        return(
            <div>
                <div>
                    <h2 style={h2style}> Events To Remember</h2>
                </div>
                <div>
                    <Main isLoggedIn={this.state.isLoggedIn} username={this.state.username} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=> {
    return {
        isLoggedIn: state.logInStatus.isLoggedIn,
        username: state.logInStatus.userInfo.username
    }
}


export default connect(mapStateToProps)(Entry);