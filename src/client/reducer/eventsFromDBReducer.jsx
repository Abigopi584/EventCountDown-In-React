// reducer that updates the events state with the DB data

import {CHK_FOR_EVENTS, ADD_MORE_EVENTS,CHK_FOR_EVENT_IN_DB,RESET_STATE} from '../actions/indexAction.js';

const initialState ={
    areThereAnyEvents: '',
    eventsInfo :{},
    addMoreEvents: false
}

export default function eventInfo(state=initialState, action){
    switch(action.type){
        case CHK_FOR_EVENT_IN_DB:
            return Object.assign({},state, {
                areThereAnyEvents: action.areThereAnyEvents
            })
        case CHK_FOR_EVENTS:
            return Object.assign({},state, {
                eventsInfo: action.eventsInfo
            })
        case ADD_MORE_EVENTS:
            return Object.assign({},state,{
                addMoreEvents: action.newEventStatus
            })
        case RESET_STATE:
            return module.exports.default()
        default:
           return  state
    }
}
