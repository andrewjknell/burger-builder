import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../store/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PUCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            console.log('here 2')
            return {
                ...state,
                orders: action.orders,
                loading:false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}

export default orderReducer;