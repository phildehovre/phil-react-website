import ReactDOM from 'react-dom';
import React from 'react'
import App from './components/App'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware, compose } from 'redux'
// import thunk from 'redux-thunk'


// import reducers from './components/metronome/components/reducers'


// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, composeEnhancers(
//   applyMiddleware(thunk)
// ));

ReactDOM.render(
    <App/>,
    document.querySelector('#root'))