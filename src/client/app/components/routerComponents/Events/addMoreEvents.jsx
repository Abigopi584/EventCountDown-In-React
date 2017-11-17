import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {addMoreEvents} from '../../../../actions/indexAction.js'
import './eventsCountDown.css'
class AddMoreEvents extends React.Component{
    constructor(props){
        super(props);
        this.addMoreEvents = this.addMoreEvents.bind(this);
        this.state=({
            addMoreEvents: false
        })

    }

    addMoreEvents(){
        this.props.addMoreEvents(!this.state.addMoreEvents);
    }

    render(){
        return(
            <div>
                <Button bsClass="addMoreEvents" onClick={this.addMoreEvents}> Add More Events</Button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addMoreEvents : (addMoreEventsStatus) => dispatch(addMoreEvents(addMoreEventsStatus))
    }

}
export default connect(null,mapDispatchToProps)(AddMoreEvents);