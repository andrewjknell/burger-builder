import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Order/ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let i of params.entries()) {
            //['salad', '2']
            if (i[0] === 'price') {
                price = i[1];
            } else {
                ingredients[i[0]] = +i[1]
            }
        }
        this.setState({ ingredients: ingredients, totalPrice: price })
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    onCheckoutCancel={this.checkoutCancelHandler}
                    onCheckoutContinue={this.checkoutContinueHandler}
                    ingredients={this.state.ingredients} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    // component={ContactData}
                    render={(props) => (
                        <ContactData
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            {...props} />
                    )} />
            </div>
        )
    }
}

export default Checkout;