import * as actions from './actionTypes';

export const saveResult = (res) => {
    // const updateRes = res * 2
    return {
        type: actions.UPDATE,
        value: res
    }
}

export const update = (res) => {
    return function (dispatch) {
        setTimeout(() => {
            dispatch(saveResult(res))
        }, 1000);
    }
}

export const deleteResult = (id) => {
    return {
        type: actions.DELET,
        id: id,
    }
}

export const delet = (id) => {
    return function (dispatch) {
        setTimeout(() => {
            dispatch(deleteResult(id))
        }, 1000);
    }
}