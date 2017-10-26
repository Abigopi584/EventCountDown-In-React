import React from 'react';
import {connect} from 'react-redux';
import GeneralInfo from'./GeneralEventsInfo.jsx';
import DisplayEvents from './DisplayEvents.jsx';

class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            isLoggedIn: this.props.isloggedIn,
            username: ''
        })
    }
    componentWillReceiveProps(nextProps){
        if(this.props.isLoggedInStat !== nextProps.isLoggedInStat){
            this.setState({
                isLoggedIn: nextProps.isLoggedInStat,
                username: nextProps.username
            })
        }
    }
    render(){
        let isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
                { isLoggedIn ?
                    (
                        <div>
                             <DisplayEvents username={this.state.username} />
                        </div>

                    ):(
                        <GeneralInfo />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        isLoggedInStat :state.logInStatus.isLoggedIn,
        username: state.updateLogInState.username
    }
}


export default connect(mapStateToProps)(MainPage);