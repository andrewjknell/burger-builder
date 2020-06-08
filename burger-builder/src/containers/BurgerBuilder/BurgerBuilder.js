import React, { Component } from "react";
import { connect } from 'react-redux';
import axios from '../../axios';

import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetRedirectPath('/checkout')
            this.props.history.push('/auth');
        }
    }

    pruchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout')
    }

    purchaseCancel = () => {
        this.setState({ purchasing: false });
    }

    render() {
        const disableInfo = {
            ...this.props.ings,
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        let burger = this.props.error ? <h3 style={{ textAlign: 'center' }}>ingredients cannot be loaded....</h3> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Auxilary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        isAuth={this.props.isAuthenticated}
                        curPrice={this.props.totalPrice}
                        ingredAdded={this.props.onIngredientAdded}
                        ingredSub={this.props.onIngredientRemove}
                        disabled={disableInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Auxilary>
            )
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancel={this.purchaseCancel}
                    purchaseContinue={this.pruchaseContinueHandler}
                    price={this.props.totalPrice}
                />
            )
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

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        totalPrice: state.burger.totalPrice,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.puchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));