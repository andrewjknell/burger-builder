import * as actions from './actionTypes';

export const increment = () => {
    return {
        type: actions.INCREMENT,
        value: 1
    }
}

export const decrement = () => {
    return {
        type: actions.DECREMENT,
        value: 1
    }
}

export const add = () => {
    return {
        type: actions.ADD,
        value: 10
    }
}

export const sub = () => {
    return {
        type: actions.SUB,
        value: 10
    }
}