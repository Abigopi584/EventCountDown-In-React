//This new Events program is to display the form t create a new event in two scenarios
//1) when a user clicks add new event button
//2) When there are no events for new user
import React from 'react';
import {FormControl, Col, ControlLabel, ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import {connect} from 'react-redux';
import {updateEventsInDB,addMoreEvents} from '../../../../actions/indexAction.js'
import Toggle from 'react-toggle';

class CreateNewEvent extends React.Component{
    constructor(props){
        super(props);
        this.submitNewEvent = this.submitNewEvent.bind(this);
        this.state={
            username:this.props.username,
            addMoreEvents: true,
            eventInfo:{
                event: '',
                evtDesc:'',
                dateOfEvt:'',
                evtReminder:true
            },
            validLabel: ' '
        }

    }
    submitNewEvent(evt){
        let evtReminder = true;
        evt.preventDefault();
        if( this.event.value &&  this.evtDesc.value && this.dateOfEvt.value && evtReminder){
            this.setState({
                    validLabel: '',
                    eventInfo:{
                        event: this.event.value,
                        evtDesc:this.evtDesc.value,
                        dateOfEvt:this.dateOfEvt.value,
                        evtReminder:evtReminder
                    }
                }, this.eventUpdateDB
            )
        }
        else
        {
         this.setState({
             validLabel: 'Please fill the empty fields' + this.props.username
         })
        }
    }

    componentWillReceiveProps(nextProps){
        if((this.props.addMoreEventsStatus) !== (nextProps.addMoreEventsStatus)){
            this.setState({
                addMoreEvents : nextProps.addMoreEventsStatus
            })
        }
    }

    eventUpdateDB(){
        let eventInfo={
            username: this.state.username,
            eventInfo: this.state.eventInfo
        }
        this.props.addMoreEvents(!this.state.addMoreEvents)
        this.props.updateEvtDB(eventInfo);

    }

    render(){
            const formStyle= {
                width: "100%",
                height:"65%",
                display: "inline",
                border:"2px solid darkgrey",
                borderRadius: "3px",
                backgroundColor:"lavenderblush",
                paddingTop:"10px",
                paddingBottom: "10px",
                outline: "1px important",
            }
            const LabelStyle={
                position:"relative",
                left:"30px"
            }
            const submitButton={
                border: "1px solid darkgrey",
                position:"relative",
                width:'80px',
                height: '35px',
                left:"160px",
                fontSize:"16px",
                fontWeight:"400",
                color:'black',
                outline:"1px important",
                backgroundColor:'transparent'
            }
        return (
             <div>
                 <ControlLabel>{this.state.validLabel} </ControlLabel>
                 <form className="col-md-12"  style={formStyle}>
                     <Col md={1}>
                         <ControlLabel> Event </ControlLabel>
                     </Col>
                     <Col md={2}>
                         <FormControl componentClass="select" placeholder="Select one" inputRef={(select) => this.event = select } >
                             <option value="Birthday">Birthday</option>
                             <option value="Wedding">Wedding</option>
                             <option value="Graduation">Graduation</option>
                             <option value="Art_Shows">Art Shows</option>
                             <option value="other">... </option>
                         </FormControl>
                     </Col>
                     <Col md={1}>
                         <ControlLabel> Event Description </ControlLabel>
                     </Col>
                     <Col md={2}>
                         <FormControl type="text" inputRef={(input) => this.evtDesc = input } required />
                     </Col>


                     <Col md={1}>
                         <ControlLabel> Date Of Event </ControlLabel>
                     </Col>
                     <Col md={2}>
                         <FormControl type="date" inputRef={(input) => this.dateOfEvt = input } required />
                     </Col>

                     <Col md={1}>
                         <ControlLabel>Event Reminder </ControlLabel>
                     </Col>
                     {/*                <Col md={2}>
                      <Toggle
                      checkedDefault={this.state.evtReminder}
                      onChange={this.handleToggleChange}
                      />
                      </Col>
                      */}
                     <Col md={1}>
                         <Button type="submit" onClick={this.submitNewEvent} > Submit </Button>
                     </Col>
                 </form>
             </div>

            )

    }
}

const mapStateToProps = (state) => {
    return {
        addMoreEventsStatus: state.addMoreEvents.addMoreEvents
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        updateEvtDB: (event) => dispatch(updateEventsInDB(event)),
        addMoreEvents : (addMoreEventsStatus) => dispatch(addMoreEvents(addMoreEventsStatus))
    }
}

export default connect(null,mapDispatchToProps)(CreateNewEvent);