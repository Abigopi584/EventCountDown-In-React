import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import Main from './components/welcomePage/main.jsx'
import ConfigureStore from './components/configureStore.js'
import {logInStatus} from '../actions/indexAction.js'
const Store = ConfigureStore();
let islogIn = Store.getState().logInStatus.isLoggedIn;
console.log('islogIn from app.jsx '+ islogIn);
/*let unsubscribe = Store.subscribe(() =>
    console.log(Store.getState())
)*/


ReactDOM.render(
        <Provider store={Store} >
          <Main />
        </Provider>,
    document.getElementById('eventApp')
)
