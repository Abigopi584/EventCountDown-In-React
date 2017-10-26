import React from 'react';
import {connect} from 'react-redux';
import {fetchEvents} from '../../../../actions/indexAction.js'
import {FormControl, Form, Col, ControlLabel, FormGroup} from 'react-bootstrap'
import '../../css/eventsCountDown.css';
import SetEventCountDown from './setEventCountDown.jsx';


class EventsCountDown extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userInfo:{
                username: this.props.username
            } ,
            eventsInfo:[],
            eventDate:'',
            currentDate: new Date()
        }
    }
    componentWillMount(){
        this.props.fetchEvent(this.state.userInfo)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.eventsInfo !== nextProps.eventsInfo){
            this.setState({
                eventsInfo: nextProps.eventsInfo.eventInfo
            })
        }
    }

    timeCountDown(eventDate){


        return eventCountDown

    }


    render(){
        const eventsInfo = this.state.eventsInfo;
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
                    <Form key={eventInfo.id}  bsClass="formGroupDisplay">
                        <FormGroup >
                            <Col md={2}>
                                <ControlLabel bsClass="displayFormLabel">{eventInfo.event} </ControlLabel>
                            </Col>
                            <Col md={2}>
                                <ControlLabel bsClass="displayFormLabel">{eventInfo.evtDesc}</ControlLabel>
                            </Col>
                            <Col md={2}>
                                <ControlLabel bsClass="displayFormLabel">{eventInfo.evtDate}</ControlLabel>
                            </Col>
                            <Col md={3}>

                                    <SetEventCountDown eventDate={eventInfo.evtDate} />

                            </Col>
                            <br/>
                        </FormGroup>

                    </Form>
                )}

            </div>
        )
    }
}
const mapStateToProps =(state) =>{
    return {
        eventsInfo: state.eventsFromDB.eventsInfo
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEvent: (username)=> dispatch(fetchEvents(username))
    }

}

export default connect (mapStateToProps, mapDispatchToProps) (EventsCountDown);



