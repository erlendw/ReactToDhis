import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import mainReducer from './reducers/combiner';

const store = createStore(mainReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));