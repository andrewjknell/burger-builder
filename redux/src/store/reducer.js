const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    if (action.type === 'INCREMENT') {
        return {
            counter: state.counter + 1
        }
    }

    if (action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1
        }
    }

    if (action.type === 'INC_5') {
        return {
            counter: state.counter + 5
        }
    }
    return state;
};

export default reducer;