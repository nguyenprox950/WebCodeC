import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducer/rootReducer';

const composed = compose(applyMiddleware(thunk),)
const store = createStore(rootReducer, composed)

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App/>
        </HashRouter>
    </Provider>,
    document.getElementById('root')

);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
