import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import Entry from './components/entry.jsx';
import ConfigureStore from './components/configureStore.js';
import {PersistGate} from 'redux-persist/es/integration/react';
import {logInStatus} from '../actions/indexAction.js'
const Store = ConfigureStore().store;
const persistor = ConfigureStore().persistor;
const isLogIn = Store.getState().logInStatus.isLoggedIn;

ReactDOM.render(
        <Provider store={Store} >
            <PersistGate persistor = {persistor} loading={<Entry />}>
                     <Entry isLoggedIn ={isLogIn} />
            </PersistGate>
        </Provider>,
    document.getElementById('eventApp')
)
