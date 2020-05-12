import React, { Component } from "react";
import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: .3,
    cheese: .75,
    meat: 1.8,
    bacon: 1.6,
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: null,
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data });
            })
            .catch(err => {
                this.setState({ error: err });
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({
            purchasable: sum > 0
        })

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updateCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updateCount;
        const priceSub = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSub;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    pruchaseContinueHandler = () => {
        const params = [];
        for (let i in this.state.ingredients) {
            params.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        params.push('price=' + this.state.totalPrice)
        const paramString = params.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + paramString,
        })
    }

    purchaseCancel = () => {
        this.setState({ purchasing: false });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        let burger = this.state.error ? <h3 style={{ textAlign: 'center' }}>ingredients cannot be loaded....</h3> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Auxilary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        curPrice={this.state.totalPrice}
                        ingredAdded={this.addIngredientHandler}
                        ingredSub={this.removeIngredientHandler}
                        disabled={disableInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Auxilary>
            )
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancel={this.purchaseCancel}
                    purchaseContinue={this.pruchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            )
            if (this.state.loading) {
                orderSummary = <Spinner />
            }
        }
        return (
            <Auxilary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancel}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxilary>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);