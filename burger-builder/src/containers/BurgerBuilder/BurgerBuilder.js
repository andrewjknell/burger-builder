import React, { Component } from "react";
import Auxilary from '../../hoc/Auxilary';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .5,
    meat: 2,
    bacon: 1.5,
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
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
        alert('You continue!');
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
        return (
            <Auxilary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancel}
                >
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCancel={this.purchaseCancel}
                        purchaseContinue={this.pruchaseContinueHandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
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
        );
    }
}

export default BurgerBuilder;