// // redux/store.js
// import { createStore } from 'redux';
// import rootReducer from './reducers'; // Import your root reducer

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Redux DevTools support
// );

// export default store;


// redux/store.js
import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk'; // Correctly import thunk
import { thunk } from 'redux-thunk';
import rootReducer from './reducers'; // Import your root reducer

// Enable Redux DevTools and apply thunk middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // Apply thunk middleware
);

export default store;
