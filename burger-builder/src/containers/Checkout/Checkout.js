import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../../components/Order/ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

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
                    ingredients={this.props.ings} />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);