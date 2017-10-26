import React from 'react';
import CreateEvent from './createNewEvent.jsx';
import EventCountDown from './EventsCountDown.jsx';
import  {fetchEvents} from '../../../../actions/indexAction.js';
import {connect} from 'react-redux';

class EventsApp extends React.Component{
    constructor(props){
        super(props);
        this.state=({
            areThereAnyEvents: '',
            username: this.props.username,
        })
    }
    componentWillReceiveProps(nextProps){
        if(this.props.areThereAnyEvents != nextProps.areThereAnyEvents){
            this.setState({
                areThereAnyEvents: nextProps.areThereAnyEvents.anyEvents
                })
        }
    }

    componentWillMount(){

        this.props.checkForEvents({username: this.state.username});
    }

    render(){
        const areThereAnyEvents = this.state.areThereAnyEvents;
        const eventsStyle = {
            padding: '20px',
            margin: '10px',
            width:'100%'
        }
        return(
            <div style={eventsStyle} >
                { areThereAnyEvents ?(
                    <div>

                        <EventCountDown username={this.state.username}  />
                    </div>

                ): (
                    <div>
                        <h4> Please enter the details below for your first event {this.state.username}</h4>
                        <br/>
                        <CreateEvent username={this.state.username} />
                    </div>
                    )}

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    console.log('The state from eventsCountDown ' + JSON.stringify(state))
    return {
        areThereAnyEvents: state.eventsFromDB.eventsInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkForEvents : (eventInfo) => dispatch(fetchEvents(eventInfo))
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (EventsApp);

