// reducer that updates the events state with the DB data

import {CHK_FOR_EVENTS} from '../actions/indexAction.js';

const initialState ={
    eventsInfo :{}
}

export default function eventInfo(state=initialState, action){
    switch(action.type){
        case CHK_FOR_EVENTS:
            return Object.assign({},state, {
                eventsInfo: action.eventsInfo
            })

        default:
           return  state
    }
}