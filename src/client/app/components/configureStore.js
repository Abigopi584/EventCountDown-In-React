import {createStore,compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import storage from 'redux-persist/es/storage';
import rootReducer from '../../reducers/rootreducer.js';
import {persistStore, persistReducer } from 'redux-persist'

const config ={
    key: 'root',
    storage
}

const reducer = persistReducer(config,rootReducer);
function configureStore(){
    let store= createStore(
        reducer,
                            undefined,
                            compose(
                                applyMiddleware(thunk),
                                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
                            )
                           )

    let persistor =  persistStore(store);

    return {store,persistor}
}


export default configureStore;
