import * as actionTypes from '../actions';

const initialState = {
    results: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE:
            return {
                ...state,
                results: state.results.concat({ id: Math.random(80), value: action.value })
            }
        case actionTypes.DELETE:
            const updateArray = state.results.filter((res) => res.id !== action.id);
            return {
                ...state,
                results: updateArray,
            }
    }
    return state;
};

export default reducer;