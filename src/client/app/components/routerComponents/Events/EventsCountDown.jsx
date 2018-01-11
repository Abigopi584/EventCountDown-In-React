import React from 'react';
import {connect} from 'react-redux';
import {fetchEvents,addMoreEvents} from '../../../../actions/indexAction.js';
import {FormControl, Form, Col, ControlLabel, FormGroup, Button} from 'react-bootstrap';
import './eventsCountDown.css';
import CreateNewEvent from './createNewEvent.jsx';
import SetEventCountDown from './setEventCountDown.jsx';
import AddMoreEvents from './addMoreEvents.jsx';

class EventsCountDown extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:{
                username: this.props.username
            } ,
            eventsInfo:[],
            eventDate:'',
            currentDate: new Date(),
            addMoreEvents: false
        }
    }
    componentWillMount(){
        this.props.fetchEvent(this.state.userInfo)
    }


    componentWillReceiveProps(nextProps){
            this.setState({
                eventsInfo: nextProps.eventsInfo.eventsInfo,
                addMoreEvents: nextProps.addMoreEventsStatus
            })
    }


    render(){
        const eventsInfo = this.state.eventsInfo,
                eventDate = eventsInfo.
             addMoreEvents = this.state.addMoreEvents
        return(

            <div>
                <h2 className="h3Display"> {this.state.userInfo.username}, Here are your Events </h2>
                <br/>
                <Form bsClass="formGroupDisplay">
                    <FormGroup >
                        <Col md={2}>
                            <ControlLabel bsClass="displayLabel">Event </ControlLabel>
                        </Col>
                        <Col md={2}>
                            <ControlLabel bsClass="displayLabel">Event Description</ControlLabel>
                        </Col>
                        <Col md={2}>
                            <ControlLabel bsClass="displayLabel">Date of Event</ControlLabel>
                        </Col>
                        <Col md={2}>
                            <ControlLabel bsClass="displayLabel">Timer CountDown</ControlLabel>
                        </Col>
                    </FormGroup>
                </Form>

                <hr/>
                <br/>

                {eventsInfo.map((eventInfo) =>
                    <Form key={eventInfo._id}  bsClass="formGroupDisplay">
                        <FormGroup >
                            <Col md={2}>
                                <ControlLabel bsClass="displayFormLabel">{eventInfo.event} </ControlLabel>
                            </Col>
                            <Col md={2}>
                                <ControlLabel bsClass="displayFormLabel">{eventInfo.eventDescription}</ControlLabel>
                            </Col>
                            <Col md={2}>
                                <ControlLabel bsClass="displayFormLabel">{eventInfo.dateOfEvent}</ControlLabel>
                            </Col>
                            <Col md={2}>
                                <SetEventCountDown eventDate={eventInfo.evtDate} />
                            </Col>
                            <Col md={2}>
                                <Button> X </Button>
                            </Col>
                            <br/>
                        </FormGroup>

                    </Form>
                    )}
                    <br/>
                    <br/>
                <div>
                    {addMoreEvents ? (
                        <div>
                            <CreateNewEvent username={this.state.userInfo.username} />
                        </div>

                    ):(
                        <Col md={3}>
                            <AddMoreEvents />
                        </Col>
                    )}
                </div>
            </div>
        )
    }
}
const mapStateToProps =(state) =>{
    return {
        eventsInfo: state.eventsFromDB.eventsInfo,
        addMoreEventsStatus: state.eventsFromDB.addMoreEvents
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEvent: (username)=> dispatch(fetchEvents(username))
    }

}

export default connect (mapStateToProps, mapDispatchToProps) (EventsCountDown);



