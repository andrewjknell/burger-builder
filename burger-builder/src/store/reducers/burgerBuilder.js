import * as actions from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
};

const INGREDIENT_PRICES = {
    lettuce: .3,
    cheese: .75,
    meat: 1.8,
    bacon: 1.6,
}

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            }
        case actions.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actions.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    lettuce: action.ingredients.lettuce,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false
            };
        case actions.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
};

export default burgerReducer;