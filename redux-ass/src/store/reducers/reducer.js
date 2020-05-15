import * as actions from '../actions';

const initialState = {
    persons: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD:
            return {
                ...state,
                persons: state.persons.concat({
                    id: Math.random(),
                    name: action.name,
                    age: action.age
                })
            };
        case actions.DELETE:
            const updateArray = state.persons.filter((res) => res.id !== action.id);
            return {
                ...state,
                persons: updateArray,
            }
    }
    return state;
}

export default reducer