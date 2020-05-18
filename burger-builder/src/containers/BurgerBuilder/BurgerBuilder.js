import React, { Component } from "react";
import { connect } from 'react-redux';

import Auxilary from '../../hoc/Auxilary/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/action';


class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: null,
    }

    componentDidMount() {
        console.log('[Burger-Builder] componentDidMount')
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    pruchaseContinueHandler = () => {
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
        let burger = this.state.error ? <h3 style={{ textAlign: 'center' }}>ingredients cannot be loaded....</h3> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Auxilary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({ type: actions.ADD_INGREDIENTS, ingredientName: ingName }),
        onIngredientRemove: (ingName) => dispatch({ type: actions.REMOVE_INGREDIENTS, ingredientName: ingName })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));