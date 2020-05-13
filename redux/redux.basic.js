const redux = require('redux');
const createStore = redux.createStore;

// reducer
const rootReducer = (state, action) => {
    return state;
}

// store
const store = createStore(rootReducer);
console.log(store.getState())

// dispatching action 


// subscription

