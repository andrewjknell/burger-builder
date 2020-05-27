import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    console.log(email,password)
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUYVuUeu-z-Sx2obtdmneuJYiZVbvqIrc';
        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUYVuUeu-z-Sx2obtdmneuJYiZVbvqIrc';
        }
        axios.post(url, authData)
            .then(res => {
                console.log(res, 'success');
                dispatch(authSuccess(res.data))
            })
            .catch(err => {
                console.log(err, 'error');
                dispatch(authFail());
            })
    }
}