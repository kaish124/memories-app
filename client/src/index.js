import React from "react";
import reactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import './index.css';

import reducer from './reducers'

import App from "./App";

const store = createStore(reducer, compose(applyMiddleware(thunk)));
// console.log(store);

reactDOM.render(
    <Provider store={store}>
         <App />
    </Provider>, 
     document.getElementById('root')
     );