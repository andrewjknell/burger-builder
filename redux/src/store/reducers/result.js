import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
const initialState = {
    results: [],
}

const deleteResult = (state, action) => {
    const updateArray = state.results.filter((res) => res.id !== action.id);
    return updateObject(state, { results: updateArray })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE: return updateObject(state, { results: state.results.concat({ id: Math.random(80), value: action.value }) })
        case actionTypes.DELET: return deleteResult(state, action)
    }
    return state;
};

export default reducer;